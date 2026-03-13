//! # XForce Strategy Library
//!
//! This crate provides the core abstractions for building and running trading strategies
//! within the XForce ecosystem. It defines a unified interface for market data consumption
//! and signal generation.

pub mod models;
pub mod error;
pub mod examples;

pub use models::*;
pub use error::StrategyError;

use async_trait::async_trait;

/// The core trait that all trading strategies must implement.
#[async_trait]
pub trait Strategy: Send + Sync {
    /// Unique identifier for the strategy instance.
    fn id(&self) -> &str;

    /// Human-readable name of the strategy.
    fn name(&self) -> &str;

    /// Called when a new tick (price update) is received.
    async fn on_tick(&mut self, tick: Tick) -> Result<Vec<Signal>, StrategyError>;

    /// Called when an orderbook update is received.
    async fn on_orderbook_update(&mut self, update: OrderbookUpdate) -> Result<Vec<Signal>, StrategyError>;

    /// Called when a trade is executed (local or global depending on feed).
    async fn on_trade(&mut self, trade: Trade) -> Result<Vec<Signal>, StrategyError>;

    /// Called when one of our own orders is filled or partially filled.
    async fn on_fill(&mut self, fill: FillEvent) -> Result<(), StrategyError>;

    /// Called when an order status changes.
    async fn on_order_status(&mut self, status: OrderStatusUpdate) -> Result<(), StrategyError>;

    async fn on_order_cancel(&mut self, order_id: String) -> Result<(), StrategyError>;

    async fn on_order_update(&mut self, order_id: String) -> Result<(), StrategyError>;

    
}
