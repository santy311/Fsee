use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod states;
pub mod utils;

pub use errors::*;
pub use instructions::*;
pub use states::*;

declare_id!("6FFcK3e2KnkEe1bJF9NEY5QdY2cSP5yRifH8Rwz2mExE");

pub const USDC_MINT: Pubkey = pubkey!("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

#[program]
pub mod fsee {
    use super::*;

    pub fn initialize_market(
        ctx: Context<InitializeMarket>,
        seed: u64,
        description: String,
        initial_liquidity: u64,
    ) -> Result<()> {
        ctx.accounts
            .initialize_market(seed, description, initial_liquidity, &ctx.bumps)?;
        Ok(())
    }

    pub fn add_liquidity(ctx: Context<Liquidity>, amount: u64) -> Result<()> {
        ctx.accounts.add_liquidity(amount)
    }

    pub fn remove_liquidity(ctx: Context<Liquidity>, amount: u64) -> Result<()> {
        ctx.accounts.remove_liquidity(amount)
    }

    pub fn buy(ctx: Context<Swap>, option: bool, amount: u64) -> Result<()> {
        ctx.accounts.buy(option, amount)
    }

    pub fn resolve_market(ctx: Context<ResolveMarket>, outcome: bool) -> Result<()> {
        ctx.accounts.resolve_market(outcome)
    }

    pub fn redeem_tokens(ctx: Context<Swap>, yes_tokens: u64, no_tokens: u64) -> Result<()> {
        ctx.accounts.redeem_tokens(yes_tokens, no_tokens)
    }
}
