use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Mint, Token, TokenAccount, TransferChecked};

use crate::errors::PredictionMarketError;
use crate::states::Market;
use crate::utils::utils::*;
#[derive(Accounts)]
pub struct Swap<'info> {
    #[account(mut)]
    pub predictor: Signer<'info>,

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
        associated_token::authority = predictor
    )]
    pub predictor_usdc: Box<Account<'info, TokenAccount>>,

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
        payer = predictor,
        associated_token::mint = yes_mint,
        associated_token::authority = predictor
    )]
    pub predictor_yes_ata: Box<Account<'info, TokenAccount>>,

    #[account(
        init_if_needed,
        payer = predictor,
        associated_token::mint = no_mint,
        associated_token::authority = predictor
    )]
    pub predictor_no_ata: Box<Account<'info, TokenAccount>>,

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

    // System programs
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

impl<'info> Swap<'info> {
    pub fn buy(&self, option: bool, amount: u64) -> Result<()> {
        let yes_pool_balance = self.yes_pool.amount;
        let no_pool_balance = self.no_pool.amount;
        let liquidity_shares = self.usdc_vault.amount;

        msg!("!Yes pool balance: {}", yes_pool_balance);
        msg!("!No pool balance: {}", no_pool_balance);
        msg!("!Liquidity shares: {}", liquidity_shares);

        let (output_tokens, price_a, price_b, shares_a, shares_b) = calculate_price_at_trade(
            yes_pool_balance,
            no_pool_balance,
            liquidity_shares,
            amount,
            option,
            self.market.fee_percentage as u64,
        )?;

        msg!("Output tokens: {}", output_tokens);
        msg!("Price A: {}", price_a);
        msg!("Price B: {}", price_b);
        msg!("Shares A: {}", shares_a);
        msg!("Shares B: {}", shares_b);

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
        msg!("Minting outcome tokens");
        mint_outcome_tokens(
            &self.yes_mint.to_account_info(),
            &self.no_mint.to_account_info(),
            &self.yes_pool.to_account_info(),
            &self.no_pool.to_account_info(),
            &self.market.to_account_info(),
            &self.token_program.to_account_info(),
            amount,
            amount,
            signer_seeds,
        )?;

        // Transfer USDC to vault
        self.transfer_usdc_to_vault(amount)?;

        // Transfer outcome tokens to predictor
        self.transfer_outcome_tokens_to_predictor(output_tokens, option)?;

        Ok(())
    }

    pub fn sell(&self, _amount: u64) -> Result<()> {
        let yes_pool_balance = self.yes_pool.amount;
        let no_pool_balance = self.no_pool.amount;

        msg!("!Yes pool balance: {}", yes_pool_balance);
        msg!("!No pool balance: {}", no_pool_balance);

        Ok(())
    }

    pub fn redeem_tokens(&self, yes_tokens: u64, no_tokens: u64) -> Result<()> {
        // TODO: Implement redeem tokens
        // 1. Send tokens to yes if yes_tokens > 0
        // 2. Send tokens to no if no_tokens > 0
        // 3. Send USDC to user usdc ata
        // 4. Burn tokens Yes
        // 5. Burn tokens No

        if !self.market.resolved {
            return Err(PredictionMarketError::MarketNotResolved.into());
        }

        if self.market.outcome.is_none() {
            return Err(PredictionMarketError::MarketNotResolved.into());
        }

        let outcome = self.market.outcome.unwrap();

        if yes_tokens > 0 {
            msg!("Transferring yes tokens to yes pool");
            let cpi_program = self.token_program.to_account_info();
            let cpi_account = TransferChecked {
                from: self.predictor_yes_ata.to_account_info(),
                mint: self.yes_mint.to_account_info(),
                to: self.yes_pool.to_account_info(),
                authority: self.predictor.to_account_info(),
            };
            let cpi_ctx = CpiContext::new(cpi_program, cpi_account);
            token::transfer_checked(cpi_ctx, yes_tokens, self.yes_mint.decimals)?;
            msg!("Yes tokens transferred to yes pool");
        }

        if no_tokens > 0 {
            msg!("Transferring no tokens to no pool");
            let cpi_program = self.token_program.to_account_info();
            let cpi_account = TransferChecked {
                from: self.predictor_no_ata.to_account_info(),
                mint: self.no_mint.to_account_info(),
                to: self.no_pool.to_account_info(),
                authority: self.predictor.to_account_info(),
            };
            let cpi_ctx = CpiContext::new(cpi_program, cpi_account);
            token::transfer_checked(cpi_ctx, no_tokens, self.no_mint.decimals)?;
            msg!("No tokens transferred to no pool");
        }

        if outcome {
            msg!("Transferring USDC to predictor");
            self.transfer_usdc_to_predictor(yes_tokens)?;
        } else {
            msg!("Transferring USDC to predictor");
            self.transfer_usdc_to_predictor(no_tokens)?;
        }

        Ok(())
    }

    fn transfer_usdc_to_vault(&self, amount: u64) -> Result<()> {
        let cpi_program = self.token_program.to_account_info();
        let cpi_account = TransferChecked {
            from: self.predictor_usdc.to_account_info(),
            mint: self.usdc_mint.to_account_info(),
            to: self.usdc_vault.to_account_info(),
            authority: self.predictor.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(cpi_program, cpi_account);
        token::transfer_checked(cpi_ctx, amount, self.usdc_mint.decimals)?;
        Ok(())
    }

    fn transfer_usdc_to_predictor(&self, amount: u64) -> Result<()> {
        let cpi_program = self.token_program.to_account_info();
        let cpi_account = TransferChecked {
            from: self.usdc_vault.to_account_info(),
            mint: self.usdc_mint.to_account_info(),
            to: self.predictor_usdc.to_account_info(),
            authority: self.market.to_account_info(),
        };

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
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_account, signer_seeds);
        token::transfer_checked(cpi_ctx, amount, self.usdc_mint.decimals)?;
        Ok(())
    }

    fn transfer_outcome_tokens_to_predictor(&self, amount: u64, option: bool) -> Result<()> {
        msg!("Transferring outcome tokens to predictor");
        let mut cpi_account = TransferChecked {
            from: self.yes_pool.to_account_info(),
            mint: self.yes_mint.to_account_info(),
            to: self.predictor_yes_ata.to_account_info(),
            authority: self.market.to_account_info(),
        };

        if !option {
            cpi_account = TransferChecked {
                from: self.no_pool.to_account_info(),
                mint: self.no_mint.to_account_info(),
                to: self.predictor_no_ata.to_account_info(),
                authority: self.market.to_account_info(),
            };
        }

        let cpi_program = self.token_program.to_account_info();

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
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_account, signer_seeds);
        // NOTE: This is a hack as Yes and No have the same token decimals
        token::transfer_checked(cpi_ctx, amount, self.yes_mint.decimals)?;
        Ok(())
    }
}
