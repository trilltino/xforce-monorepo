//! # Pyth Network Price Oracle Client
//!
//! This module provides integration with Pyth Network, a high-fidelity oracle network
//! that provides real-time, on-chain price data for cryptocurrencies and other assets.
//!
//! ## Features
//! - Real-time price feeds from Pyth Hermes API
//! - Confidence intervals for price data quality
//! - Sub-second price updates
//! - Support for major crypto assets
//!
//! ## Price Feed Architecture
//! Pyth aggregates prices from multiple data providers (exchanges, market makers)
//! and publishes them on-chain. This client fetches the latest prices via the
//! Hermes HTTP API, which provides historical and latest price feed data.
//!
//! ## Example
//! ```no_run
//! let client = PythClient::new()?;
//! let sol_price = client.get_price("SOL").await?;
//! println!("SOL price from Pyth: ${:.2}", sol_price);
//! ```
//!
//! ## Documentation
//! - Pyth Network: https://pyth.network/
//! - Hermes API: https://docs.pyth.network/price-feeds/api-instances-and-providers/hermes

use anyhow::Result;
use reqwest::Client;
use serde::Deserialize;
use std::collections::HashMap;
use tracing::{debug, warn};

/// Client for Pyth Network price oracle via Hermes HTTP API.
///
/// Pyth provides high-fidelity, real-time price feeds for cryptocurrencies
/// and other assets. Prices are aggregated from multiple institutional sources
/// and published on-chain.
pub struct PythClient {
    http: Client,
    hermes_url: String,
    api_key: Option<String>,
}

/// Pyth Hermes API response containing price feed data.
#[derive(Debug, Deserialize)]
struct ParsedPrice {
    /// Unique price feed identifier
    #[allow(dead_code)] // Deserialized but not used (only price.price is needed)
    id: String,
    /// Current spot price
    price: PythPriceData,
    /// Exponential moving average price (smoothed)
    #[serde(rename = "ema_price")]
    #[allow(dead_code)] // Deserialized but not used (only price.price is needed)
    ema_price: PythPriceData,
}

/// Individual price data point from Pyth.
///
/// Prices are encoded as strings to preserve precision, with separate
/// exponent field for scale.
#[derive(Debug, Deserialize)]
struct PythPriceData {
    /// Raw price as string (e.g., "14550")
    price: String,
    /// Confidence interval as string
    #[allow(dead_code)] // Deserialized but not currently used (may be used in future)
    conf: String,
    /// Price exponent (e.g., -2 means divide by 100)
    expo: i32,
    /// Unix timestamp of price publication
    #[allow(dead_code)] // Deserialized but not currently used (may be used in future)
    publish_time: i64,
}

impl PythClient {
    /// Create a new Pyth Network API client.
    ///
    /// # Arguments
    /// * `api_key` - Optional Pyth API key (for hackathon/development)
    ///
    /// # Returns
    /// * `Ok(PythClient)` - Successfully initialized client
    /// * `Err(_)` - Failed to build HTTP client (rare, only on system issues)
    ///
    /// # Example
    /// ```no_run
    /// let client = PythClient::new(Some("your-api-key"))?;
    /// ```
    pub fn new(api_key: Option<String>) -> Result<Self> {
        let http = Client::builder()
            .timeout(std::time::Duration::from_secs(10))
            .build()
            .map_err(|e| anyhow::anyhow!("Failed to build HTTP client: {}", e))?;

        Ok(Self {
            http,
            hermes_url: "https://hermes.pyth.network/v2/updates/price/latest".to_string(),
            api_key,
        })
    }

    /// Validate that a Pyth feed ID has the correct format.
    ///
    /// Pyth feed IDs must be 64-character hex strings (32 bytes).
    fn is_valid_feed_id(feed_id: &str) -> bool {
        let clean_id = feed_id.strip_prefix("0x").unwrap_or(feed_id);
        clean_id.len() == 64 && clean_id.chars().all(|c| c.is_ascii_hexdigit())
    }

    /// Convert token symbol to Pyth Network price feed ID.
    fn symbol_to_price_feed_id(&self, symbol: &str) -> Option<&str> {
        match symbol.to_uppercase().as_str() {
            // Layer 1 / Native
            "SOL" => Some("0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d"),
            "BTC" | "WBTC" => Some("0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43"),
            "ETH" | "WETH" => Some("0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace"),
            
            // DEX Core
            "JUP" => Some("0x0a0408d619e9380abad35060f9192039ed5042fa6f82301d0e48bb52be830996"),
            "RAY" => Some("0x91568baa8beb53db23eb3fb7f22c6e8bd303d103919e19733f2bb642d3e7987a"),
            "ORCA" => Some("0x37505261e557e251290b8c8899453064e8d760ed5c65a779726f2490980da74c"),
            "DRIFT" => Some("0x5c1690b27bb02446db17cdda13ccc2c1d609ad6d2ef5bf4983a85ea8b6f19d07"),
            
            // Liquid Staking
            "JTO" => Some("0xb43660a5f790c69354b0729a5ef9d50d68f1df92107540210b9cccba1f947cc2"),

            // Meme Coins
            "BONK" => Some("0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419"),
            "WIF" => Some("0x4ca4beeca86f0d164160323817a4e42b10010a724c2217c6ee41b54cd4cc61fc"),
            "MOODENG" => Some("0xffff73128917a90950cd0473fd2551d7cd274fd5a6cc45641881bbcc6ee73417"),
            "PNUT" => Some("0x116da895807f81f6b5c5f01b109376e7f6834dc8b51365ab7cdfa66634340e54"),
            "GOAT" => Some("0xf7731dc812590214d3eb4343bfb13d1b4cfa9b1d4e020644b5d5d8e07d60c66c"),

            // Infrastructure / Stable
            "PYTH" => Some("0x0bbf28e9a841a1cc788f6a361b17ca072d0ea3098a1e5df1c3922d06719579ff"),
            "LINK" => Some("0x8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221"),
            "USDC" => Some("0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a"),
            "USDT" => Some("0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b"),
            _ => None,
        }
    }

    /// Fetch the latest price for a token from Pyth Network Hermes V2.
    pub async fn get_price(&self, symbol: &str) -> Result<f64> {
        let feed_id = self
            .symbol_to_price_feed_id(symbol)
            .ok_or_else(|| anyhow::anyhow!("No Pyth feed for symbol: {}", symbol))?;

        let clean_id = feed_id.strip_prefix("0x").unwrap_or(feed_id);
        let mut url = format!("{}?ids[]={}", self.hermes_url, clean_id);
        
        if let Some(ref key) = self.api_key {
            url.push_str(&format!("&api_key={}", key));
        }

        #[derive(Debug, Deserialize)]
        struct HermesV2Response {
            parsed: Vec<ParsedPrice>,
        }

        debug!("Fetching Pyth V2 price for {} (feed: {})", symbol, &clean_id[..8]);

        let response: HermesV2Response = self
            .http
            .get(&url)
            .send()
            .await?
            .json()
            .await?;

        let parsed = response.parsed
            .first()
            .ok_or_else(|| anyhow::anyhow!("No price data in Pyth Hermes V2 response"))?;

        let price_raw: i64 = parsed.price.price.parse()?;
        let expo = parsed.price.expo;
        let price = (price_raw as f64) * 10_f64.powi(expo);

        debug!("Pyth V2 LIVE: {} = ${:.4}", symbol, price);
        Ok(price)
    }

    /// Fetch prices for multiple tokens.
    pub async fn get_prices(&self, symbols: &[&str]) -> HashMap<String, f64> {
        let mut prices = HashMap::new();
        for symbol in symbols {
            if let Ok(price) = self.get_price(symbol).await {
                prices.insert(symbol.to_string(), price);
            }
        }
        prices
    }
}

impl Default for PythClient {
    fn default() -> Self {
        Self::new(None).expect("Failed to create default PythClient")
    }
}
