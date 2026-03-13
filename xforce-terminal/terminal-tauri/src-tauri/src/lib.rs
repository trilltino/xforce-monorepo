use tauri::Manager;
use std::sync::Arc;
use tokio::sync::Mutex;

mod commands;
mod services;

use commands::*;
use services::{SolanaService, MarketService};

pub struct AppState {
    pub solana: SolanaService,
    pub market: MarketService,
    pub social_node: Option<Arc<lib_social_fi::SocialFiNode>>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .setup(|app| {
            // Initialize app state with tokio::Mutex for async compatibility
            let state = AppState {
                solana: SolanaService::new(),
                market: MarketService::new(),
                social_node: None,
            };
            app.manage(Arc::new(Mutex::new(state)));

            // Open devtools in debug mode
            #[cfg(debug_assertions)]
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // Wallet commands
            wallet::connect_wallet,
            wallet::disconnect_wallet,
            wallet::get_wallet_balance,
            wallet::sign_transaction,
            
            // Market commands
            market::get_token_list,
            
            // Swap commands
            swap::get_swap_quote,
            swap::execute_swap,
            
            // Social commands
            social::start_social_node,
            social::connect_peer,
            social::send_p2p_message,
            social::share_file_p2p,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
