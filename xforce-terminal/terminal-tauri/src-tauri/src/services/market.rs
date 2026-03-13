use serde::Deserialize;
use crate::commands::market::TokenInfo;

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
            jupiter_api_url: "https://token.jup.ag/strict".to_string(),
            client: reqwest::Client::builder()
                .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
                .timeout(std::time::Duration::from_secs(30))
                .build()
                .unwrap_or_default(),
        }
    }

    pub async fn get_token_list(&self) -> Result<Vec<TokenInfo>, Box<dyn std::error::Error>> {
        let response = self.client
            .get(&self.jupiter_api_url)
            .send()
            .await
            .map_err(|e| {
                eprintln!("[MarketService] Failed to fetch token list from {}: {}", self.jupiter_api_url, e);
                e
            })?;

        if !response.status().is_success() {
            let status = response.status();
            let body = response.text().await.unwrap_or_default();
            eprintln!("[MarketService] Jupiter API returned error {}: {}", status, body);
            return Err(format!("Jupiter API error: {}", status).into());
        }

        let tokens: Vec<JupiterToken> = response.json().await.map_err(|e| {
            eprintln!("[MarketService] Failed to parse Jupiter token list JSON: {}", e);
            e
        })?;
        
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

}

impl Default for MarketService {
    fn default() -> Self {
        Self::new()
    }
}
