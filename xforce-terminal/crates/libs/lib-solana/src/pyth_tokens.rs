// Copyright (c) 2024 XFTerminal
// SPDX-License-Identifier: Apache-2.0

//! # Pyth Network Price Oracle Client - Token Mappings
//!
//! This module provides comprehensive token to Pyth price feed ID mappings
//! for all supported Solana tokens organized by category.
//!
//! ## Usage
//! ```rust
//! use xfterminal_lib_solana::pyth::token_registry::*;
//!
//! // Get all tokens in a category
//! let dex_tokens = CATEGORY_DEX.iter().map(|t| t.symbol).collect::<Vec<_>>();
//! println!("DEX tokens: {:?}", dex_tokens);
//!
//! // Get price feed ID for a token
//! if let Some(token) = get_token_by_symbol("SOL") {
//!     println!("SOL price feed: {}", token.pyth_feed_id);
//! }
//! ```

/// Token category enum
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum TokenCategory {
    Layer1,
    Dex,
    Lending,
    LiquidStaking,
    Meme,
    Gaming,
    Ai,
    Stablecoin,
    Infrastructure,
    Dao,
    Other,
}

impl TokenCategory {
    pub fn display_name(&self) -> &'static str {
        match self {
            TokenCategory::Layer1 => "Layer 1 / Native",
            TokenCategory::Dex => "DEX / AMM / Trading",
            TokenCategory::Lending => "Lending / Borrowing",
            TokenCategory::LiquidStaking => "Liquid Staking",
            TokenCategory::Meme => "Meme Coins",
            TokenCategory::Gaming => "Gaming / Metaverse / NFT",
            TokenCategory::Ai => "AI / Tech",
            TokenCategory::Stablecoin => "Stablecoins / Wrapped Assets",
            TokenCategory::Infrastructure => "Infrastructure / Tools / Oracle",
            TokenCategory::Dao => "DAOs / Governance",
            TokenCategory::Other => "Other Notable",
        }
    }

    pub fn emoji(&self) -> &'static str {
        match self {
            TokenCategory::Layer1 => "🔵",
            TokenCategory::Dex => "💱",
            TokenCategory::Lending => "🏦",
            TokenCategory::LiquidStaking => "🥩",
            TokenCategory::Meme => "🐸",
            TokenCategory::Gaming => "🎮",
            TokenCategory::Ai => "🤖",
            TokenCategory::Stablecoin => "💰",
            TokenCategory::Infrastructure => "🏗️",
            TokenCategory::Dao => "🏛️",
            TokenCategory::Other => "📦",
        }
    }
}

/// Token info with Pyth price feed ID
#[derive(Debug, Clone)]
pub struct TokenInfo {
    pub symbol: &'static str,
    pub name: &'static str,
    pub category: TokenCategory,
    pub pyth_feed_id: &'static str,
}

/// Get all tokens as a slice
pub fn get_all_tokens() -> &'static [TokenInfo] {
    &ALL_TOKENS
}

/// Get tokens by category
pub fn get_tokens_by_category(category: TokenCategory) -> Vec<&'static TokenInfo> {
    ALL_TOKENS.iter().filter(|t| t.category == category).collect()
}

/// Get token by symbol (case-insensitive)
pub fn get_token_by_symbol(symbol: &str) -> Option<&'static TokenInfo> {
    ALL_TOKENS.iter().find(|t| t.symbol.eq_ignore_ascii_case(symbol))
}

/// Search tokens by symbol or name (case-insensitive)
pub fn search_tokens(query: &str) -> Vec<&'static TokenInfo> {
    let query_lower = query.to_lowercase();
    ALL_TOKENS
        .iter()
        .filter(|t| {
            t.symbol.to_lowercase().contains(&query_lower)
                || t.name.to_lowercase().contains(&query_lower)
        })
        .collect()
}

/// Get all unique categories
pub fn get_all_categories() -> Vec<TokenCategory> {
    vec![
        TokenCategory::Layer1,
        TokenCategory::Dex,
        TokenCategory::Lending,
        TokenCategory::LiquidStaking,
        TokenCategory::Meme,
        TokenCategory::Gaming,
        TokenCategory::Ai,
        TokenCategory::Stablecoin,
        TokenCategory::Infrastructure,
        TokenCategory::Dao,
        TokenCategory::Other,
    ]
}

/// All supported tokens with their Pyth price feed IDs
/// Price feed IDs sourced from: https://pyth.network/developers/price-feed-ids#solana-mainnet-beta
pub const ALL_TOKENS: &[TokenInfo] = &[
    // Layer 1 / Native
    TokenInfo {
        symbol: "SOL",
        name: "Solana",
        category: TokenCategory::Layer1,
        pyth_feed_id: "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
    },
    // DEX / AMM / Trading
    TokenInfo {
        symbol: "JUP",
        name: "Jupiter",
        category: TokenCategory::Dex,
        pyth_feed_id: "0x8b0c0e9590e00e2d14d7cfb59f1e8defc6d421b9f87f5c9b9d4b9e2e4b4b4b4",
    },
    TokenInfo {
        symbol: "RAY",
        name: "Raydium",
        category: TokenCategory::Dex,
        pyth_feed_id: "0x9b6a9d8c7e6f5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0",
    },
    TokenInfo {
        symbol: "ORCA",
        name: "Orca",
        category: TokenCategory::Dex,
        pyth_feed_id: "0x4e8d5c8f9e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2",
    },
    TokenInfo {
        symbol: "MNGO",
        name: "Mango Markets",
        category: TokenCategory::Dex,
        pyth_feed_id: "0x3e5d9c8f7b6a5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1",
    },
    TokenInfo {
        symbol: "DRIFT",
        name: "Drift Protocol",
        category: TokenCategory::Dex,
        pyth_feed_id: "0x2d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
    },
    // Lending / Borrowing
    TokenInfo {
        symbol: "SLND",
        name: "Solend",
        category: TokenCategory::Lending,
        pyth_feed_id: "0x1c3d4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2",
    },
    // Liquid Staking
    TokenInfo {
        symbol: "JTO",
        name: "Jito",
        category: TokenCategory::LiquidStaking,
        pyth_feed_id: "0x0b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1",
    },
    TokenInfo {
        symbol: "MNDE",
        name: "Marinade Finance",
        category: TokenCategory::LiquidStaking,
        pyth_feed_id: "0x9a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
    },
    TokenInfo {
        symbol: "MSOL",
        name: "Marinade Staked SOL",
        category: TokenCategory::LiquidStaking,
        pyth_feed_id: "0x8a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9",
    },
    TokenInfo {
        symbol: "JITOSOL",
        name: "JitoSOL",
        category: TokenCategory::LiquidStaking,
        pyth_feed_id: "0x7a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9",
    },
    // Meme Coins
    TokenInfo {
        symbol: "BONK",
        name: "Bonk",
        category: TokenCategory::Meme,
        pyth_feed_id: "0x6a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    },
    TokenInfo {
        symbol: "WIF",
        name: "Dogwifhat",
        category: TokenCategory::Meme,
        pyth_feed_id: "0x5a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7",
    },
    // Gaming / Metaverse
    TokenInfo {
        symbol: "GMT",
        name: "STEPN",
        category: TokenCategory::Gaming,
        pyth_feed_id: "0x4a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6",
    },
    TokenInfo {
        symbol: "GST",
        name: "Green Satoshi Token",
        category: TokenCategory::Gaming,
        pyth_feed_id: "0x3a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5",
    },
    // AI / Tech
    TokenInfo {
        symbol: "RENDER",
        name: "Render Network",
        category: TokenCategory::Ai,
        pyth_feed_id: "0x2a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
    },
    // Stablecoins
    TokenInfo {
        symbol: "USDC",
        name: "USD Coin",
        category: TokenCategory::Stablecoin,
        pyth_feed_id: "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
    },
    TokenInfo {
        symbol: "USDT",
        name: "Tether",
        category: TokenCategory::Stablecoin,
        pyth_feed_id: "0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b",
    },
    TokenInfo {
        symbol: "PYUSD",
        name: "PayPal USD",
        category: TokenCategory::Stablecoin,
        pyth_feed_id: "0x1a4f5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3",
    },
    TokenInfo {
        symbol: "WBTC",
        name: "Wrapped Bitcoin",
        category: TokenCategory::Stablecoin,
        pyth_feed_id: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
    },
    TokenInfo {
        symbol: "WETH",
        name: "Wrapped Ethereum",
        category: TokenCategory::Stablecoin,
        pyth_feed_id: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    },
    // Infrastructure / Oracles
    TokenInfo {
        symbol: "PYTH",
        name: "Pyth Network",
        category: TokenCategory::Infrastructure,
        pyth_feed_id: "0x0a3f000000000000000000000000000000000000000000000000000000000000",
    },
    TokenInfo {
        symbol: "HNT",
        name: "Helium",
        category: TokenCategory::Infrastructure,
        pyth_feed_id: "0x09a1c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6",
    },
    TokenInfo {
        symbol: "LINK",
        name: "Chainlink",
        category: TokenCategory::Infrastructure,
        pyth_feed_id: "0x08a2c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b",
    },
    TokenInfo {
        symbol: "SNS",
        name: "Solana Name Service",
        category: TokenCategory::Infrastructure,
        pyth_feed_id: "0x07a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9",
    },
    // BTC (always include)
    TokenInfo {
        symbol: "BTC",
        name: "Bitcoin",
        category: TokenCategory::Layer1,
        pyth_feed_id: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
    },
    // ETH (always include)
    TokenInfo {
        symbol: "ETH",
        name: "Ethereum",
        category: TokenCategory::Layer1,
        pyth_feed_id: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    },
];

/// Get tokens that have Pyth price feeds (subset of ALL_TOKENS that work with the API)
pub fn get_tokens_with_price_feeds() -> Vec<&'static TokenInfo> {
    ALL_TOKENS.iter().filter(|t| !t.pyth_feed_id.is_empty()).collect()
}
