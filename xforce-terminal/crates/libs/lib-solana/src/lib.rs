//! # Solana Library
//!
//! Solana blockchain integration including RPC client, Jupiter, Pyth, and contract plugins.

pub mod cache;
pub mod candle_aggregator;
pub mod client;
pub mod contracts;
pub mod jupiter;
pub mod pyth;
pub mod pyth_tokens;
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

// Re-export Pyth token types
pub use pyth_tokens::{
    get_all_categories, get_all_tokens, get_token_by_symbol, get_tokens_by_category,
    get_tokens_with_price_feeds, search_tokens, TokenCategory, TokenInfo,
};
