use tauri::{command, State};
use crate::AppState;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::Mutex;

#[derive(Debug, Serialize, Deserialize)]
pub struct WalletInfo {
    pub public_key: String,
    pub balance: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SignRequest {
    pub transaction_bytes: Vec<u8>,
}

#[command]
pub async fn connect_wallet(
    state: State<'_, Arc<Mutex<AppState>>>,
    keypair_path: Option<String>,
) -> Result<WalletInfo, String> {
    let mut app_state = state.lock().await;
    
    match keypair_path {
        Some(path) => {
            app_state.solana.load_keypair_from_file(&path)
                .map_err(|e| e.to_string())?;
        }
        None => {
            app_state.solana.generate_new_keypair();
        }
    }

    let public_key = app_state.solana.get_public_key()
        .ok_or("Failed to get public key")?;
    
    let balance = app_state.solana.get_balance().await
        .map_err(|e| e.to_string())?;

    Ok(WalletInfo {
        public_key,
        balance,
    })
}

#[command]
pub async fn disconnect_wallet(
    state: State<'_, Arc<Mutex<AppState>>>,
) -> Result<(), String> {
    let mut app_state = state.lock().await;
    app_state.solana.disconnect();
    Ok(())
}

#[command]
pub async fn get_wallet_balance(
    state: State<'_, Arc<Mutex<AppState>>>,
) -> Result<f64, String> {
    let mut app_state = state.lock().await;
    app_state.solana.get_balance().await.map_err(|e| e.to_string())
}

#[command]
pub async fn sign_transaction(
    state: State<'_, Arc<Mutex<AppState>>>,
    request: SignRequest,
) -> Result<String, String> {
    let mut app_state = state.lock().await;
    
    // Deserialize transaction
    let transaction: solana_sdk::transaction::Transaction = 
        bincode::deserialize(&request.transaction_bytes)
            .map_err(|e| format!("Failed to deserialize transaction: {}", e))?;
    
    // Sign and send
    let signature = app_state.solana.sign_and_send_transaction(transaction).await
        .map_err(|e| e.to_string())?;
    
    Ok(signature.to_string())
}
