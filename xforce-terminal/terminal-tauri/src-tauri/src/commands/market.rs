use tauri::{command, State};
use crate::AppState;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::Mutex;


#[derive(Debug, Serialize, Deserialize)]
pub struct TokenInfo {
    pub address: String,
    pub symbol: String,
    pub name: String,
    pub decimals: u8,
    pub logo_uri: Option<String>,
}


#[command]
pub async fn get_token_list(
    state: State<'_, Arc<Mutex<AppState>>>,
) -> Result<Vec<TokenInfo>, String> {
    let app_state = state.lock().await;
    app_state.market.get_token_list().await.map_err(|e| e.to_string())
}

