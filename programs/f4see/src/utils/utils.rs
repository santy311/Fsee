use crate::errors::PredictionMarketError;
use crate::state::Market;
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Burn, MintTo};

pub fn check_market_state(market: &Account<Market>, amount: u64) -> Result<()> {
    // Validate market state
    require!(!market.frozen, PredictionMarketError::MarketFrozen);
    require!(!market.resolved, PredictionMarketError::MarketResolved);
    require!(amount > 0, PredictionMarketError::InvalidAmount);
    Ok(())
}

pub fn calculate_liquidity_shares(
    yes_pool_balance: u64,
    no_pool_balance: u64,
    amount: u64,
) -> Result<(u64, u64, u64)> {
    // Validate inputs
    require!(amount > 0, PredictionMarketError::InvalidAmount);

    // If first liquidity provision, create equal shares in both pools
    if (yes_pool_balance == 0 && no_pool_balance == 0) || (yes_pool_balance == no_pool_balance) {
        // For initial liquidity, give liquidity shares equal to amount
        // and equal outcome shares
        return Ok((amount, amount, amount));
    }

    // For subsequent liquidity provisions:
    // 1. Calculate liquidity shares proportional to contribution
    let current_k = (yes_pool_balance as f64 * no_pool_balance as f64).sqrt();
    let liquidity_share = ((amount as f64 / current_k) * yes_pool_balance as f64) as u64;

    // 2. Determine which outcome has higher price (lower share count)
    if yes_pool_balance <= no_pool_balance {
        // YES is more expensive (or equal)
        // Provider gets shares of all outcomes except YES
        let no_shares =
            (amount as f64 * no_pool_balance as f64 / yes_pool_balance as f64).sqrt() as u64;
        Ok((liquidity_share, 0, no_shares))
    } else {
        // NO is more expensive
        // Provider gets shares of all outcomes except NO
        let yes_shares =
            (amount as f64 * yes_pool_balance as f64 / no_pool_balance as f64).sqrt() as u64;
        Ok((liquidity_share, yes_shares, 0))
    }
}

pub fn mint_outcome_tokens<'a>(
    yes_mint: &AccountInfo<'a>,
    no_mint: &AccountInfo<'a>,
    yes_pool: &AccountInfo<'a>,
    no_pool: &AccountInfo<'a>,
    market: &AccountInfo<'a>,
    token_program: &AccountInfo<'a>,
    yes_amount: u64,
    no_amount: u64,
    signer_seeds: &[&[&[u8]]],
) -> Result<()> {
    msg!("Minting outcome tokens");

    msg!("Minting YES tokens");
    // Mint YES tokens
    let yes_mint_accounts = MintTo {
        mint: yes_mint.to_account_info(),
        to: yes_pool.to_account_info(),
        authority: market.to_account_info(),
    };

    let cpi_program = token_program.to_account_info();
    let cpi_yes_ctx =
        CpiContext::new_with_signer(cpi_program.clone(), yes_mint_accounts, signer_seeds);

    token::mint_to(cpi_yes_ctx, yes_amount)?;

    msg!("Minting NO tokens");
    // Mint NO tokens
    let no_mint_accounts = MintTo {
        mint: no_mint.to_account_info(),
        to: no_pool.to_account_info(),
        authority: market.to_account_info(),
    };

    let cpi_no_ctx = CpiContext::new_with_signer(cpi_program, no_mint_accounts, signer_seeds);

    token::mint_to(cpi_no_ctx, no_amount)?;

    Ok(())
}

pub fn update_market_state(market: &mut Account<Market>, liquidity_shares: u64) -> Result<()> {
    msg!("Updating market state");
    market.total_liquidity_shares = market
        .total_liquidity_shares
        .checked_add(liquidity_shares)
        .ok_or(PredictionMarketError::MathOverflow)?;

    Ok(())
}

pub fn calculate_price_at_trade(
    yes_pool_balance: u64,
    no_pool_balance: u64,
    liquidity_shares: u64,
    amount: u64,
    option: bool,
    _fee_percentage: u64,
) -> Result<(u64, u64, u64, u64, u64)> {
    // TODO: Implement Fee Calculation

    let input_after_fee = amount;

    let new_shares_a: u64;
    let new_shares_b: u64;

    if option {
        // When buying YES outcome:
        // 1. Add input_after_fee to NO pool (user provides tokens)
        new_shares_b = no_pool_balance + input_after_fee;

        // 2. Calculate new YES pool size maintaining constant product
        new_shares_a = liquidity_shares
            .checked_mul(liquidity_shares)
            .ok_or(PredictionMarketError::MathOverflow)?
            .checked_div(new_shares_b)
            .ok_or(PredictionMarketError::MathOverflow)?;

        // 3. Calculate tokens user receives (reduction in YES pool)
        let output_tokens = yes_pool_balance
            .checked_add(amount)
            .ok_or(PredictionMarketError::MathOverflow)?
            .checked_sub(new_shares_a)
            .ok_or(PredictionMarketError::InsufficientLiquidityShares)?;

        // Calculate new prices
        let (price_a, price_b) = calculate_outcome_shares(new_shares_a, new_shares_b)?;

        Ok((output_tokens, price_a, price_b, new_shares_a, new_shares_b))
    } else {
        // When buying NO outcome:
        // 1. Add input_after_fee to YES pool (user provides tokens)
        new_shares_a = yes_pool_balance
            .checked_add(input_after_fee)
            .ok_or(PredictionMarketError::MathOverflow)?;

        // 2. Calculate new NO pool size maintaining constant product
        new_shares_b = liquidity_shares
            .checked_mul(liquidity_shares)
            .ok_or(PredictionMarketError::MathOverflow)?
            .checked_div(new_shares_a)
            .ok_or(PredictionMarketError::MathOverflow)?;

        msg!("New shares A: {}", new_shares_a);
        msg!("New shares B: {}", new_shares_b);
        msg!("Liquidity shares: {}", liquidity_shares);
        msg!("Yes pool balance: {}", yes_pool_balance);
        msg!("No pool balance: {}", no_pool_balance);
        msg!("Amount: {}", amount);

        // 3. Calculate tokens user receives (reduction in NO pool)
        let output_tokens = no_pool_balance + amount - new_shares_b;

        let (price_a, price_b) = calculate_outcome_shares(new_shares_a, new_shares_b)?;
        Ok((output_tokens, price_a, price_b, new_shares_a, new_shares_b))
    }
}

pub fn calculate_outcome_shares(yes_pool_balance: u64, no_pool_balance: u64) -> Result<(u64, u64)> {
    let total_shares = yes_pool_balance + no_pool_balance;

    let price_a = (no_pool_balance as f64 * 10000.0 / total_shares as f64) as u64;
    let price_b = (yes_pool_balance as f64 * 10000.0 / total_shares as f64) as u64;

    Ok((price_a, price_b))
}

pub fn mint_lp_tokens<'a>(
    lp_mint: &AccountInfo<'a>,
    lp_pool: &AccountInfo<'a>,
    amount: u64,
    market: &AccountInfo<'a>,
    token_program: &AccountInfo<'a>,
    signer_seeds: &[&[&[u8]]],
) -> Result<()> {
    let lp_mint_accounts = MintTo {
        mint: lp_mint.to_account_info(),
        to: lp_pool.to_account_info(),
        authority: market.to_account_info(),
    };

    let cpi_program = token_program.to_account_info();
    let cpi_ctx = CpiContext::new_with_signer(cpi_program.clone(), lp_mint_accounts, signer_seeds);

    token::mint_to(cpi_ctx, amount)?;

    Ok(())
}

pub fn burn_tokens<'a>(
    mint: &AccountInfo<'a>,
    from: &AccountInfo<'a>,
    amount: u64,
    owner: &AccountInfo<'a>,
    token_program: &AccountInfo<'a>,
    signer_seeds: &[&[&[u8]]],
) -> Result<()> {
    let burn_accounts = Burn {
        mint: mint.to_account_info(),
        from: from.to_account_info(),
        authority: owner.to_account_info(),
    };

    let cpi_program = token_program.to_account_info();
    let cpi_ctx = CpiContext::new_with_signer(cpi_program.clone(), burn_accounts, signer_seeds);

    token::burn(cpi_ctx, amount)?;

    Ok(())
}
