use crate::states::Market;
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Mint, Token, TokenAccount, TransferChecked};

use crate::utils::utils::*;

#[derive(Accounts)]
#[instruction(seed:u64)]
pub struct InitializeMarket<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(
        init,
        payer = creator,
        space = 8 + Market::INIT_SPACE,
        seeds = [b"market", creator.key().as_ref(), seed.to_le_bytes().as_ref()],
        bump
    )]
    pub market: Account<'info, Market>,

    // USDC vault account
    #[account(
        init,
        payer = creator,
        associated_token::mint = usdc_mint,
        associated_token::authority = market,
    )]
    pub usdc_vault: Account<'info, TokenAccount>,

    // TODO: Hardcode USDC mint as constraint
    pub usdc_mint: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = usdc_mint,
        associated_token::authority = creator,
    )]
    pub creator_usdc_ata: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = creator,
        mint::decimals = 0,
        mint::authority = market,
        mint::freeze_authority = market,
        seeds = [b"yes_mint", market.key().as_ref()],
        bump
    )]
    pub yes_mint: Account<'info, Mint>,

    #[account(
        init,
        payer = creator,
        mint::decimals = 0,
        mint::authority = market,
        mint::freeze_authority = market,
        seeds = [b"no_mint", market.key().as_ref()],
        bump
    )]
    pub no_mint: Account<'info, Mint>,

    #[account(
        init,
        payer = creator,
        associated_token::mint = yes_mint,
        associated_token::authority = market,
    )]
    pub yes_pool: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = creator,
        associated_token::mint = no_mint,
        associated_token::authority = market,
    )]
    pub no_pool: Account<'info, TokenAccount>,

    // System programs
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

impl<'info> InitializeMarket<'info> {
    pub fn initialize_market(
        &mut self,
        seed: u64,
        description: String,
        initial_liquidity: u64,
        bumps: &InitializeMarketBumps,
    ) -> Result<()> {
        self.market.set_inner(Market {
            creator: self.creator.key(),
            seed,
            yes_mint: self.yes_mint.key(),
            no_mint: self.no_mint.key(),
            description: description,
            frozen: false,
            resolved: false,
            outcome: None,
            total_liquidity_shares: 0,
            fee_percentage: 0,
            market_bump: bumps.market,
            yes_mint_bump: bumps.yes_mint,
            no_mint_bump: bumps.no_mint,
        });

        // Add initial liquidity if provided
        if initial_liquidity > 0 {
            self.add_liquidity(initial_liquidity)?;
        }

        Ok(())
    }

    pub fn add_liquidity(&mut self, amount: u64) -> Result<()> {
        check_market_state(&self.market, amount)?;

        // Calculate shares to mint
        let yes_pool_balance = self.yes_mint.supply;
        let no_pool_balance = self.no_mint.supply;
        msg!("Yes pool balance {:?}", yes_pool_balance);
        msg!("No pool balance {:?}", no_pool_balance);
        let (liquidity_shares, yes_shares, no_shares) =
            calculate_liquidity_shares(yes_pool_balance, no_pool_balance, amount)?;
        msg!("Minting shares {:?}", (yes_shares, no_shares));
        let creator_key = self.creator.key();
        let seed = self.market.seed.to_le_bytes();
        let market_bump = self.market.market_bump;

        // Store temporary values
        let signer_seeds: &[&[&[u8]]] = &[&[
            b"market",
            creator_key.as_ref(),
            seed.as_ref(),
            &[market_bump],
        ]];

        msg!("Transferring USDC to vault");
        // Transfer USDC from liquidity provider to market vault
        self.transfer_usdc_to_vault(amount)?;

        msg!("Minting outcome tokens");
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

        update_market_state(&mut self.market, amount)?;

        Ok(())
    }

    fn transfer_usdc_to_vault(&self, amount: u64) -> Result<()> {
        let cpi_program = self.token_program.to_account_info();
        let cpi_account = TransferChecked {
            from: self.creator_usdc_ata.to_account_info(),
            mint: self.usdc_mint.to_account_info(),
            to: self.usdc_vault.to_account_info(),
            authority: self.creator.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(cpi_program, cpi_account);
        token::transfer_checked(cpi_ctx, amount, self.usdc_mint.decimals)?;
        Ok(())
    }
}
