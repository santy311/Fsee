use anchor_lang::prelude::*;

use crate::states::Market;

#[derive(Accounts)]
pub struct ResolveMarket<'info> {
    #[account(mut)]
    pub predictor: Signer<'info>,

    #[account(
        mut,
        seeds = [b"market", market.creator.key().as_ref(), market.seed.to_le_bytes().as_ref()],
        bump = market.market_bump
    )]
    pub market: Box<Account<'info, Market>>,
}

impl<'info> ResolveMarket<'info> {
    pub fn resolve_market(&mut self, outcome: bool) -> Result<()> {
        self.market.resolved = true;
        self.market.frozen = true;
        self.market.outcome = Some(outcome);
        Ok(())
    }
}
