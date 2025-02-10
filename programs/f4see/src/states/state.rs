use anchor_lang::prelude::*;

#[account]
pub struct Market {
    pub creator: Pubkey,
    pub seed: u64,
    pub yes_mint: Pubkey,
    pub no_mint: Pubkey,
    pub description: String,
    pub frozen: bool,
    pub resolved: bool,
    pub outcome: Option<bool>,
    pub total_liquidity_shares: u64,
    pub fee_percentage: u16, // basis points (e.g., 30 = 0.3%)
    pub market_bump: u8,
    pub yes_mint_bump: u8,
    pub no_mint_bump: u8,
    // pub yes_pool_bump: u8,
    // pub no_pool_bump: u8,
}

impl Space for Market {
    const INIT_SPACE: usize = 32 + // creator
        32 + // seed
        32 + // yes_mint
        32 + // no_mint
        4 + 200 + // description
        1 + // frozen
        1 + // resolved
        1 + // outcome
        8 + // total_liquidity_shares
        2 + // fee_percentage
        1 + // market_bump
        1 + // yes_mint_bump
        1 + // no_mint_bump
        1 + // yes_pool_bump
        1 + // no_pool_bump
        1; // no_mint_bump
}
