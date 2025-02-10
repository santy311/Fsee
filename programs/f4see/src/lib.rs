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

    pub fn add_liquidity(ctx: Context<AddLiquidity>, amount: u64) -> Result<()> {
        ctx.accounts.add_liquidity(amount)
    }

    pub fn buy(ctx: Context<Swap>, option: bool, amount: u64) -> Result<()> {
        ctx.accounts.buy(option, amount)
    }
}
