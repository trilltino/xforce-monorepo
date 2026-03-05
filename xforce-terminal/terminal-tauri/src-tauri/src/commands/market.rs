use tauri::{command, State};
use crate::AppState;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::Mutex;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PriceData {
    pub symbol: String,
    pub price: f64,
    pub change_24h: f64,
    pub volume_24h: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CandleData {
    pub timestamp: i64,
    pub open: f64,
    pub high: f64,
    pub low: f64,
    pub close: f64,
    pub volume: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TokenInfo {
    pub address: String,
    pub symbol: String,
    pub name: String,
    pub decimals: u8,
    pub logo_uri: Option<String>,
}

#[command]
pub async fn get_prices(
    state: State<'_, Arc<Mutex<AppState>>>,
) -> Result<Vec<PriceData>, String> {
    let app_state = state.lock().await;
    app_state.market.get_prices().await.map_err(|e| e.to_string())
}

#[command]
pub async fn get_token_list(
    state: State<'_, Arc<Mutex<AppState>>>,
) -> Result<Vec<TokenInfo>, String> {
    let app_state = state.lock().await;
    app_state.market.get_token_list().await.map_err(|e| e.to_string())
}

#[command]
pub async fn get_candles(
    state: State<'_, Arc<Mutex<AppState>>>,
    symbol: String,
    timeframe: String,
    limit: Option<u32>,
) -> Result<Vec<CandleData>, String> {
    let app_state = state.lock().await;
    app_state.market.get_candles(&symbol, &timeframe, limit.unwrap_or(100))
        .await
        .map_err(|e| e.to_string())
}
