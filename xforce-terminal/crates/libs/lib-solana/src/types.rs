//! Solana types

use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PriceData {
    pub price: f64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub confidence: Option<f64>,
    pub source: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub change_24h: Option<f64>,
    pub last_updated: u64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PriceResponse {
    pub prices: HashMap<String, PriceData>,
}

#[derive(Debug, Deserialize)]
pub struct PriceQuery {
    pub symbols: String,
}
