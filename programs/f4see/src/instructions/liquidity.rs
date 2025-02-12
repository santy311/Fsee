use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Mint, Token, TokenAccount, TransferChecked};

use crate::errors::PredictionMarketError;
use crate::states::Market;
use crate::utils::utils::*;

#[derive(Accounts)]
pub struct Liquidity<'info> {
    #[account(mut)]
    pub liquidity_provider: Signer<'info>,

    #[account(
        mut,
        seeds = [b"market", market.creator.key().as_ref(), market.seed.to_le_bytes().as_ref()],
        bump = market.market_bump
    )]
    pub market: Box<Account<'info, Market>>,

    pub usdc_mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        associated_token::mint = usdc_mint,
        associated_token::authority = market
    )]
    pub usdc_vault: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        associated_token::mint = usdc_mint,
        associated_token::authority = liquidity_provider
    )]
    pub liquidity_provider_usdc: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        seeds = [b"yes_mint", market.key().as_ref()],
        bump = market.yes_mint_bump
    )]
    pub yes_mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        seeds = [b"no_mint", market.key().as_ref()],
        bump = market.no_mint_bump
    )]
    pub no_mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        seeds = [b"lp_mint", market.key().as_ref()],
        bump = market.lp_mint_bump
    )]
    pub lp_mint: Box<Account<'info, Mint>>,

    // LP token position accounts
    #[account(
        init_if_needed,
        payer = liquidity_provider,
        associated_token::mint = yes_mint,
        associated_token::authority = liquidity_provider
    )]
    pub lp_yes_position: Box<Account<'info, TokenAccount>>,

    #[account(
        init_if_needed,
        payer = liquidity_provider,
        associated_token::mint = no_mint,
        associated_token::authority = liquidity_provider
    )]
    pub lp_no_position: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        associated_token::mint = yes_mint,
        associated_token::authority = market
    )]
    pub yes_pool: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        associated_token::mint = no_mint,
        associated_token::authority = market
    )]
    pub no_pool: Box<Account<'info, TokenAccount>>,

    #[account(
        init_if_needed,
        payer = liquidity_provider,
        associated_token::mint = lp_mint,
        associated_token::authority = liquidity_provider
    )]
    pub liquidity_provider_lp_ata: Box<Account<'info, TokenAccount>>,

    // System programs
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

impl<'info> Liquidity<'info> {
    pub fn add_liquidity(&mut self, amount: u64) -> Result<()> {
        msg!("Market frozen: {}", self.market.frozen);
        msg!("Market resolved: {}", self.market.resolved);
        msg!("Market outcome: {:?}", self.market.outcome);
        msg!("Market description: {:?}", self.market.description);
        msg!(
            "Market total_liquidity_shares: {}",
            self.market.total_liquidity_shares
        );
        msg!("Market fee_percentage: {}", self.market.fee_percentage);
        msg!("Market market_bump: {}", self.market.market_bump);
        msg!("Market yes_mint_bump: {}", self.market.yes_mint_bump);
        msg!("Market no_mint_bump: {}", self.market.no_mint_bump);

        // Validate market state
        check_market_state(&self.market, amount)?;

        // Calculate shares to mint
        let yes_pool_balance = self.yes_mint.supply;
        let no_pool_balance = self.no_mint.supply;
        msg!("yes_pool_balance: {}", yes_pool_balance);
        msg!("no_pool_balance: {}", no_pool_balance);
        let (liquidity_shares, yes_shares, no_shares) =
            calculate_liquidity_shares(yes_pool_balance, no_pool_balance, amount)?;
        msg!(
            "Minting shares {:?}",
            (liquidity_shares, yes_shares, no_shares)
        );

        // Transfer USDC from liquidity provider to market vault
        self.transfer_usdc_to_vault(amount)?;
        msg!("Successfully transferred usdc to vault: {}", amount);

        // Store temporary values
        let creator_key = self.market.creator.key();
        let seed_bytes = self.market.seed.to_le_bytes();

        // Get market signer seeds
        let market_seeds = &[
            b"market",
            creator_key.as_ref(),
            &seed_bytes,
            &[self.market.market_bump],
        ];
        let signer_seeds = &[&market_seeds[..]];

        // Mint outcome tokens to LP's position
        mint_outcome_tokens(
            &self.yes_mint.to_account_info(),
            &self.no_mint.to_account_info(),
            &self.yes_pool.to_account_info(),
            &self.no_pool.to_account_info(),
            &self.market.to_account_info(),
            &self.token_program.to_account_info(),
            yes_shares,
            no_shares,
            signer_seeds,
        )?;
        msg!("mint_outcome_tokens: {}", amount);

        // Mint LP tokens to liquidity provider
        mint_lp_tokens(
            &self.lp_mint.to_account_info(),
            &self.liquidity_provider_lp_ata.to_account_info(),
            amount,
            &self.market.to_account_info(),
            &self.token_program.to_account_info(),
            signer_seeds,
        )?;

        // Update market state
        update_market_state(&mut self.market, liquidity_shares)?;

        msg!("update_market_state: {}", amount);

        Ok(())
    }

    pub fn remove_liquidity(&mut self, amount: u64) -> Result<()> {
        // Get current pool balances
        let yes_pool_balance = self.yes_pool.amount;
        let no_pool_balance = self.no_pool.amount;
        let market_liquidity = self.usdc_vault.amount;
        let (price_yes, price_no) = calculate_outcome_shares(yes_pool_balance, no_pool_balance)?;

        const SCALE: u64 = 1_000_000;

        // Calculate the proportion of liquidity being removed, scaled by SCALE
        let liquidity_proportion = (amount * SCALE) / self.market.total_liquidity_shares;
        let yes_shares_to_remove = (yes_pool_balance * liquidity_proportion) / SCALE;
        let no_shares_to_remove = (no_pool_balance * liquidity_proportion) / SCALE;

        msg!("yes_shares_to_remove: {:?}", yes_shares_to_remove);
        msg!("no_shares_to_remove: {:?}", no_shares_to_remove);

        msg!("yes_pool_balance: {:?}", yes_pool_balance);
        msg!("no_pool_balance: {:?}", no_pool_balance);
        msg!("market_liquidity: {:?}", market_liquidity);
        msg!("amount: {:?}", amount);
        // Calculate temporary pool state after removal
        let temp_yes_balance = yes_pool_balance
            .checked_sub(yes_shares_to_remove)
            .ok_or(PredictionMarketError::ArithmeticError)?;
        let temp_no_balance = no_pool_balance
            .checked_sub(no_shares_to_remove)
            .ok_or(PredictionMarketError::ArithmeticError)?;

        msg!("temp_yes_balance: {:?}", temp_yes_balance);
        msg!("temp_no_balance: {:?}", temp_no_balance);

        // Get market signer seeds
        let creator_key = self.market.creator.key();
        let seed = self.market.seed.to_le_bytes();
        let market_bump = self.market.market_bump;

        // Store temporary values
        let signer_seeds: &[&[&[u8]]] = &[&[
            b"market",
            creator_key.as_ref(),
            seed.as_ref(),
            &[market_bump],
        ]];

        burn_tokens(
            &self.yes_mint.to_account_info(),
            &self.yes_pool.to_account_info(),
            yes_shares_to_remove,
            &self.market.to_account_info(),
            &self.token_program.to_account_info(),
            signer_seeds,
        )?;

        burn_tokens(
            &self.no_mint.to_account_info(),
            &self.no_pool.to_account_info(),
            no_shares_to_remove,
            &self.market.to_account_info(),
            &self.token_program.to_account_info(),
            signer_seeds,
        )?;

        msg!("amount: {}", amount);
        msg!("yes_shares_to_remove: {:?}", yes_shares_to_remove);
        msg!("no_shares_to_remove: {:?}", no_shares_to_remove);
        msg!("market_liquidity: {}", market_liquidity);
        msg!("yes_pool_balance: {}", yes_pool_balance);
        msg!("no_pool_balance: {}", no_pool_balance);
        msg!("temp_yes_balance: {:?}", temp_yes_balance);
        msg!("temp_no_balance: {:?}", temp_no_balance);
        // msg!("price_yes: {}", price_yes);
        // msg!("price_no: {}", price_no);

        // Determine which outcome is more expensive (has fewer shares)
        if yes_pool_balance <= no_pool_balance {
            let shares_outcome_no = temp_yes_balance
                .checked_mul(price_yes)
                .ok_or(PredictionMarketError::ArithmeticError)?
                .checked_div(price_no)
                .ok_or(PredictionMarketError::ArithmeticError)?;
            // Transfer diff of NO shares to liquidity provider
            let diff_no = temp_no_balance
                .checked_sub(shares_outcome_no)
                .ok_or(PredictionMarketError::ArithmeticError)?;
            msg!("diff_no: {}", diff_no);
            let cpi_accounts = TransferChecked {
                from: self.no_pool.to_account_info(),
                to: self.lp_no_position.to_account_info(),
                authority: self.market.to_account_info(),
                mint: self.no_mint.to_account_info(),
            };
            let cpi_ctx = CpiContext::new_with_signer(
                self.token_program.to_account_info(),
                cpi_accounts,
                signer_seeds,
            );
            token::transfer_checked(cpi_ctx, diff_no, self.no_mint.decimals)?;
        } else {
            let shares_outcome_yes = temp_no_balance
                .checked_mul(price_no)
                .ok_or(PredictionMarketError::ArithmeticError)?
                .checked_div(price_yes)
                .ok_or(PredictionMarketError::ArithmeticError)?;
            let diff_yes = temp_yes_balance
                .checked_sub(shares_outcome_yes)
                .ok_or(PredictionMarketError::ArithmeticError)?;
            msg!("diff_yes: {}", diff_yes);
            let cpi_accounts = TransferChecked {
                from: self.yes_pool.to_account_info(),
                to: self.lp_yes_position.to_account_info(),
                authority: self.market.to_account_info(),
                mint: self.yes_mint.to_account_info(),
            };
            let cpi_ctx = CpiContext::new_with_signer(
                self.token_program.to_account_info(),
                cpi_accounts,
                signer_seeds,
            );
            token::transfer_checked(cpi_ctx, diff_yes, self.yes_mint.decimals)?;
        }

        // Burn LP tokens from liquidity provider
        burn_tokens(
            &self.lp_mint.to_account_info(),
            &self.liquidity_provider_lp_ata.to_account_info(),
            amount,
            &self.liquidity_provider.to_account_info(),
            &self.token_program.to_account_info(),
            signer_seeds,
        )?;

        msg!("burn_lp_tokens: {}", amount);

        // Transfer USDC back to liquidity provider
        let cpi_accounts = TransferChecked {
            from: self.usdc_vault.to_account_info(),
            to: self.liquidity_provider_usdc.to_account_info(),
            authority: self.market.to_account_info(),
            mint: self.usdc_mint.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            cpi_accounts,
            signer_seeds,
        );
        let liquidity_share_value =
            (std::cmp::min(yes_pool_balance, no_pool_balance) * liquidity_proportion) / SCALE;

        token::transfer_checked(cpi_ctx, liquidity_share_value, self.usdc_mint.decimals)?;

        // Update market state
        self.market.total_liquidity_shares = self
            .market
            .total_liquidity_shares
            .checked_sub(amount)
            .ok_or(PredictionMarketError::ArithmeticError)?;

        Ok(())
    }

    fn transfer_usdc_to_vault(&self, amount: u64) -> Result<()> {
        let cpi_program = self.token_program.to_account_info();
        let cpi_account = TransferChecked {
            from: self.liquidity_provider_usdc.to_account_info(),
            mint: self.usdc_mint.to_account_info(),
            to: self.usdc_vault.to_account_info(),
            authority: self.liquidity_provider.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(cpi_program, cpi_account);
        token::transfer_checked(cpi_ctx, amount, self.usdc_mint.decimals)?;
        Ok(())
    }
}
