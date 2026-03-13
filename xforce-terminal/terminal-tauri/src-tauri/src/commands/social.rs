use crate::AppState;
use lib_social_fi::SocialFiNode;
use solana_sdk::pubkey::Pubkey;
use solana_sdk::signature::{Keypair, Signer};
use std::path::PathBuf;
use std::sync::Arc;
use tauri::{command, Runtime, State};
use tokio::sync::Mutex;

#[command]
pub async fn start_social_node<R: Runtime>(
    _app_handle: tauri::AppHandle<R>,
    state: State<'_, Arc<Mutex<AppState>>>,
) -> Result<String, String> {
    let mut state_guard = state.lock().await;

    // In a real app, we'd get the keypair from the connected wallet service
    // For now, we'll use a temporary keypair for the demo, or load from a local file
    let keypair = Keypair::new();
    let pubkey = keypair.pubkey();

    // Use the app's local data directory for the social database
    let db_path = PathBuf::from("./social-fi.db");

    let node = SocialFiNode::spawn(keypair, None, db_path)
        .await
        .map_err(|e| format!("Failed to start social node: {}", e))?;

    let node_id = node.inner.node_id().to_string();
    state_guard.social_node = Some(Arc::new(node));

    Ok(format!(
        "Node started. Peer ID: {}, Solana: {}",
        node_id, pubkey
    ))
}

#[command]
pub async fn connect_peer(
    peer_pubkey: String,
    state: State<'_, Arc<Mutex<AppState>>>,
) -> Result<String, String> {
    let state_guard = state.lock().await;
    let node = state_guard
        .social_node
        .as_ref()
        .ok_or("Social node not started")?;

    let pubkey = peer_pubkey
        .parse::<Pubkey>()
        .map_err(|_| "Invalid Solana pubkey")?;

    node.join_chat(&pubkey)
        .await
        .map_err(|e| format!("Failed to join chat: {}", e))?;

    Ok(format!("Connected and joined chat for: {}", peer_pubkey))
}

#[command]
pub async fn send_p2p_message(
    chat_url: String, // e.g. /chat/user_id
    message: String,
    state: State<'_, Arc<Mutex<AppState>>>,
) -> Result<String, String> {
    let state_guard = state.lock().await;
    let node = state_guard
        .social_node
        .as_ref()
        .ok_or("Social node not started")?;

    node.share_strategy(&chat_url, message.as_bytes())
        .await
        .map_err(|e| format!("Failed to send message: {}", e))?;

    Ok("Message sent via P2P".to_string())
}

#[command]
pub async fn share_file_p2p(
    chat_url: String,
    file_path: String,
    state: State<'_, Arc<Mutex<AppState>>>,
) -> Result<String, String> {
    let state_guard = state.lock().await;
    let node = state_guard
        .social_node
        .as_ref()
        .ok_or("Social node not started")?;

    let path = PathBuf::from(file_path);
    let metadata = node
        .share_file(path, &chat_url)
        .await
        .map_err(|e| format!("Failed to share file: {}", e))?;

    Ok(format!(
        "File '{}' shared. Hash: {}",
        metadata.name, metadata.hash
    ))
}
