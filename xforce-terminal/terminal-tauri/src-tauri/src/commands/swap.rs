use tauri::{command, State};
use crate::AppState;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::Mutex;

#[derive(Debug, Serialize, Deserialize)]
pub struct SwapQuoteRequest {
    pub input_mint: String,
    pub output_mint: String,
    pub amount: u64,
    pub slippage_bps: Option<u16>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SwapQuote {
    pub input_amount: u64,
    pub output_amount: u64,
    pub price_impact_pct: f64,
    pub route: Vec<String>,
    pub min_output_amount: u64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ExecuteSwapRequest {
    pub quote: SwapQuote,
    pub priority_fee: Option<u64>,
}

#[command]
pub async fn get_swap_quote(
    _state: State<'_, Arc<Mutex<AppState>>>,
    request: SwapQuoteRequest,
) -> Result<SwapQuote, String> {
    // Call Jupiter API for quote
    let client = reqwest::Client::new();
#[derive(Serialize)]
    #[serde(rename_all = "camelCase")]
    struct QuoteParams {
        input_mint: String,
        output_mint: String,
        amount: String,
        slippage_bps: String,
    }

    let params = QuoteParams {
        input_mint: request.input_mint.clone(),
        output_mint: request.output_mint.clone(),
        amount: request.amount.to_string(),
        slippage_bps: request.slippage_bps.unwrap_or(50).to_string(),
    };

    let response = client
        .get("https://quote-api.jup.ag/v6/quote")
        .query(&params)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let quote_data: serde_json::Value = response.json().await.map_err(|e| e.to_string())?;
    
    Ok(SwapQuote {
        input_amount: request.amount,
        output_amount: quote_data["outAmount"].as_str()
            .and_then(|s| s.parse().ok())
            .unwrap_or(0),
        price_impact_pct: quote_data["priceImpactPct"].as_str()
            .and_then(|s| s.parse().ok())
            .unwrap_or(0.0),
        route: vec!["Jupiter".to_string()],
        min_output_amount: quote_data["otherAmountThreshold"].as_str()
            .and_then(|s| s.parse().ok())
            .unwrap_or(0),
    })
}

#[command]
pub async fn execute_swap(
    _state: State<'_, Arc<Mutex<AppState>>>,
    _request: ExecuteSwapRequest,
) -> Result<String, String> {
    // In a real implementation, this would:
    // 1. Build the swap transaction using Jupiter API
    // 2. Sign with the wallet
    // 3. Send to Solana network
    
    // For now, return a mock signature
    Ok(format!("mock_signature_{}", uuid::Uuid::new_v4()))
}
