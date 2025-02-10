use anchor_lang::prelude::*;

#[error_code]
pub enum PredictionMarketError {
    #[msg("Market is frozen")]
    MarketFrozen,
    #[msg("Market is already resolved")]
    MarketResolved,
    #[msg("Invalid amount")]
    InvalidAmount,
    #[msg("Math overflow occurred")]
    MathOverflow,
}
