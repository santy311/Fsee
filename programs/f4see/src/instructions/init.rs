use crate::states::Market;
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token, TokenAccount};

#[derive(Accounts)]
#[instruction(seed:u64)]
pub struct InitializeMarket<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(
        init,
        payer = creator,
        space = 8 + Market::TOTAL_SPACE,
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
        init,
        payer = creator,
        mint::decimals = 2,
        mint::authority = market,
        mint::freeze_authority = market,
        seeds = [b"yes_mint", market.key().as_ref()],
        bump
    )]
    pub yes_mint: Account<'info, Mint>,

    #[account(
        init,
        payer = creator,
        mint::decimals = 2,
        mint::authority = market,
        mint::freeze_authority = market,
        seeds = [b"no_mint", market.key().as_ref()],
        bump
    )]
    pub no_mint: Account<'info, Mint>,

    #[account(
        init,
        payer = creator,
        mint::decimals = 2,
        mint::authority = market,
        mint::freeze_authority = market,
        seeds = [b"lp_mint", market.key().as_ref()],
        bump
    )]
    pub lp_mint: Account<'info, Mint>,

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
        bumps: &InitializeMarketBumps,
    ) -> Result<()> {
        self.market.set_inner(Market {
            creator: self.creator.key(),
            seed,
            yes_mint: self.yes_mint.key(),
            no_mint: self.no_mint.key(),
            lp_mint: self.lp_mint.key(),
            description: description,
            frozen: false,
            resolved: false,
            outcome: None,
            total_liquidity_shares: 0,
            fee_percentage: 0,
            market_bump: bumps.market,
            yes_mint_bump: bumps.yes_mint,
            no_mint_bump: bumps.no_mint,
            lp_mint_bump: bumps.lp_mint,
        });

        Ok(())
    }
}
