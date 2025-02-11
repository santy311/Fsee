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
    #[msg("Market is not resolved")]
    MarketNotResolved,
    #[msg("Market is not frozen")]
    MarketNotFrozen,
    #[msg("Market is not active")]
    MarketNotActive,
    #[msg("Insufficient liquidity shares")]
    InsufficientLiquidityShares,
    #[msg("Arithmetic error")]
    ArithmeticError,
}
