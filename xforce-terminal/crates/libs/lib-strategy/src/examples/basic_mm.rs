use crate::{Strategy, Tick, OrderbookUpdate, Trade, FillEvent, OrderStatusUpdate, Signal, Action, OrderParams, Side, OrderType, StrategyError};
use async_trait::async_trait;
use chrono::Utc;

/// A simple market maker strategy that stays a fixed percentage away from the mid-price.
pub struct BasicMarketMaker {
    id: String,
    symbol: String,
    spread_bps: u32,
    order_size: f64,
}

impl BasicMarketMaker {
    pub fn new(symbol: &str, spread_bps: u32, order_size: f64) -> Self {
        Self {
            id: format!("BMM-{}", symbol),
            symbol: symbol.to_string(),
            spread_bps,
            order_size,
        }
    }
}

#[async_trait]
impl Strategy for BasicMarketMaker {
    fn id(&self) -> &str {
        &self.id
    }

    fn name(&self) -> &str {
        "Basic Market Maker"
    }

    async fn on_tick(&mut self, tick: Tick) -> Result<Vec<Signal>, StrategyError> {
        if tick.symbol != self.symbol {
            return Ok(vec![]);
        }

        let half_spread = (tick.price * self.spread_bps as f64) / 20000.0;
        let bid_price = tick.price - half_spread;
        let ask_price = tick.price + half_spread;

        Ok(vec![
            Signal {
                strategy_id: self.id.clone(),
                symbol: self.symbol.clone(),
                action: Action::CreateOrder(OrderParams {
                    side: Side::Buy,
                    order_type: OrderType::Limit,
                    price: Some(bid_price),
                    size: self.order_size,
                }),
                timestamp: Utc::now(),
            },
            Signal {
                strategy_id: self.id.clone(),
                symbol: self.symbol.clone(),
                action: Action::CreateOrder(OrderParams {
                    side: Side::Sell,
                    order_type: OrderType::Limit,
                    price: Some(ask_price),
                    size: self.order_size,
                }),
                timestamp: Utc::now(),
            },
        ])
    }

    async fn on_orderbook_update(&mut self, _update: OrderbookUpdate) -> Result<Vec<Signal>, StrategyError> {
        // Simple MM only reacts to price for now
        Ok(vec![])
    }

    async fn on_trade(&mut self, _trade: Trade) -> Result<Vec<Signal>, StrategyError> {
        Ok(vec![])
    }

    async fn on_fill(&mut self, _fill: FillEvent) -> Result<(), StrategyError> {
        // Logic to update inventory would go here
        Ok(())
    }

    async fn on_order_status(&mut self, _status: OrderStatusUpdate) -> Result<(), StrategyError> {
        Ok(())
    }

    async fn on_order_cancel(&mut self, _order_id: String) -> Result<(), StrategyError> {
        // Handle order cancellation - could update inventory or strategy state
        Ok(())
    }

    async fn on_order_update(&mut self, _order_id: String) -> Result<(), StrategyError> {
        // Handle order updates - could adjust strategy based on order changes
        Ok(())
    }
}
