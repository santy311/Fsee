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
        mint::decimals = 0,
        mint::authority = market,
        mint::freeze_authority = market,
        seeds = [b"lp", market.key().as_ref()],
        bump
    )]
    pub lp_mint: Box<Account<'info, Mint>>,

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
        // Validate market state
        require!(!self.market.frozen, PredictionMarketError::MarketFrozen);
        require!(!self.market.resolved, PredictionMarketError::MarketResolved);
        require!(
            self.market.total_liquidity_shares >= amount,
            PredictionMarketError::InsufficientLiquidityShares
        );

        // Get current pool balances
        let yes_pool_balance = self.yes_mint.supply;
        let no_pool_balance = self.no_mint.supply;

        // Calculate value of liquidity shares being removed
        let liquidity_share_value = (std::cmp::min(yes_pool_balance, no_pool_balance) * amount)
            / self.market.total_liquidity_shares;

        // Calculate temporary pool state after removal
        let temp_yes_balance = yes_pool_balance
            .checked_sub(liquidity_share_value)
            .ok_or(PredictionMarketError::ArithmeticError)?;
        let temp_no_balance = no_pool_balance
            .checked_sub(liquidity_share_value)
            .ok_or(PredictionMarketError::ArithmeticError)?;

        // Determine which outcome is more expensive (has fewer shares)
        let (shares_to_receive, most_expensive_pool) = if yes_pool_balance <= no_pool_balance {
            (no_pool_balance - temp_no_balance, false) // Receive NO shares
        } else {
            (yes_pool_balance - temp_yes_balance, true) // Receive YES shares
        };

        // Get market signer seeds
        let creator_key = self.market.creator.key();
        let seed_bytes = self.market.seed.to_le_bytes();
        let market_seeds = &[
            b"market",
            creator_key.as_ref(),
            &seed_bytes,
            &[self.market.market_bump],
        ];
        let signer_seeds = &[&market_seeds[..]];

        // Transfer outcome tokens based on which pool is more expensive
        if most_expensive_pool {
            // Transfer NO tokens
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
            token::transfer_checked(cpi_ctx, shares_to_receive, self.no_mint.decimals)?;
        } else {
            // Transfer YES tokens
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
            token::transfer_checked(cpi_ctx, shares_to_receive, self.yes_mint.decimals)?;
        }

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
