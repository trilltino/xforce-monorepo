use serde::{Deserialize, Serialize};
use crate::commands::market::{PriceData, TokenInfo, CandleData};

pub struct MarketService {
    jupiter_api_url: String,
    client: reqwest::Client,
}

#[derive(Debug, Deserialize)]
struct JupiterPriceResponse {
    data: std::collections::HashMap<String, JupiterPrice>,
}

#[derive(Debug, Deserialize)]
struct JupiterPrice {
    price: String,
}

#[derive(Debug, Deserialize)]
struct JupiterToken {
    address: String,
    symbol: String,
    name: String,
    decimals: u8,
    logo_uri: Option<String>,
}

impl MarketService {
    pub fn new() -> Self {
        Self {
            jupiter_api_url: "https://token.jup.ag/all".to_string(),
            client: reqwest::Client::new(),
        }
    }

    pub async fn get_prices(&self) -> Result<Vec<PriceData>, Box<dyn std::error::Error>> {
        // For demo, return mock data
        // In production, fetch from Jupiter or Pyth
        let mock_prices = vec![
            PriceData {
                symbol: "SOL".to_string(),
                price: 145.32,
                change_24h: 5.2,
                volume_24h: 1_500_000_000.0,
            },
            PriceData {
                symbol: "USDC".to_string(),
                price: 1.0,
                change_24h: 0.0,
                volume_24h: 5_000_000_000.0,
            },
            PriceData {
                symbol: "BTC".to_string(),
                price: 64250.0,
                change_24h: 3.1,
                volume_24h: 30_000_000_000.0,
            },
            PriceData {
                symbol: "ETH".to_string(),
                price: 3100.5,
                change_24h: -1.5,
                volume_24h: 15_000_000_000.0,
            },
            PriceData {
                symbol: "JUP".to_string(),
                price: 1.25,
                change_24h: 12.5,
                volume_24h: 500_000_000.0,
            },
        ];

        Ok(mock_prices)
    }

    pub async fn get_token_list(&self) -> Result<Vec<TokenInfo>, Box<dyn std::error::Error>> {
        let response = self.client
            .get(&self.jupiter_api_url)
            .send()
            .await?;

        let tokens: Vec<JupiterToken> = response.json().await?;
        
        Ok(tokens.into_iter()
            .take(100) // Limit to top 100
            .map(|t| TokenInfo {
                address: t.address,
                symbol: t.symbol,
                name: t.name,
                decimals: t.decimals,
                logo_uri: t.logo_uri,
            })
            .collect())
    }

    pub async fn get_candles(
        &self,
        symbol: &str,
        timeframe: &str,
        limit: u32,
    ) -> Result<Vec<CandleData>, Box<dyn std::error::Error>> {
        // Generate mock OHLC data
        let mut candles = Vec::new();
        let base_price = match symbol {
            "SOL" => 145.0,
            "BTC" => 64000.0,
            "ETH" => 3100.0,
            _ => 100.0,
        };

        let now = chrono::Utc::now().timestamp();
        let interval_seconds = match timeframe {
            "1m" => 60,
            "5m" => 300,
            "15m" => 900,
            "1h" => 3600,
            "4h" => 14400,
            "1d" => 86400,
            _ => 3600,
        };

        for i in (0..limit as i64).rev() {
            let timestamp = now - (i * interval_seconds);
            let volatility = base_price * 0.02;
            let open = base_price + (rand::random::<f64>() - 0.5) * volatility;
            let close = open + (rand::random::<f64>() - 0.5) * volatility;
            let high = open.max(close) + rand::random::<f64>() * volatility * 0.5;
            let low = open.min(close) - rand::random::<f64>() * volatility * 0.5;
            
            candles.push(CandleData {
                timestamp,
                open,
                high,
                low,
                close,
                volume: rand::random::<f64>() * 1_000_000.0,
            });
        }

        Ok(candles)
    }
}

impl Default for MarketService {
    fn default() -> Self {
        Self::new()
    }
}
