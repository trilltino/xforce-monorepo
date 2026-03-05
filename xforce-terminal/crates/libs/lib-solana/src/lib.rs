//! # Solana Library
//!
//! Solana blockchain integration including RPC client, Jupiter, Pyth, and contract plugins.

pub mod cache;
pub mod candle_aggregator;
pub mod client;
pub mod contracts;
pub mod jupiter;
pub mod pyth;
pub mod price_stream;
pub mod spl_token;
pub mod types;

// Main state module
pub mod mod_rs;

// Re-export commonly used types from root for convenience
pub use client::{Network, SolanaClient, SolanaClientBuilder, EpochInfo};
pub use contracts::{ContractRegistry, PluginLoader};
pub use mod_rs::SolanaState;
pub use price_stream::PriceStreamServer;
