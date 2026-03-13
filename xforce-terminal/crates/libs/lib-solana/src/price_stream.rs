//! # Real-Time Price Stream Server
//!
//! WebSocket server that streams real-time price updates for all tokens from Jupiter API.
//!
//! ## Features
//! - Sub-second price updates (500ms-1s polling)
//! - Supports all tokens from Jupiter token list
//! - Broadcasts updates to all connected WebSocket clients
//! - Automatic reconnection handling
//! - Rate limiting to respect Jupiter API limits

use crate::pyth::PythClient;
use crate::candle_aggregator::CandleAggregator;
use std::sync::Arc;
use tokio::sync::{broadcast, RwLock};
use tokio::time::Duration;
use tracing::{debug, info, warn};
use serde::{Deserialize, Serialize};

/// Price update message sent to WebSocket clients
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PriceUpdateMessage {
    #[serde(rename = "type")]
    pub message_type: String,
    pub data: PriceUpdateData,
}

/// Price update data payload
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PriceUpdateData {
    pub symbol: String,
    pub mint: String,
    pub price: f64,
    pub source: String,
    pub timestamp: u64,
}

/// Price stream server that polls Pyth Network and broadcasts updates
pub struct PriceStreamServer {
    /// Pyth client for fetching prices
    pyth: Arc<PythClient>,
    /// Broadcast channel for price updates
    price_tx: broadcast::Sender<PriceUpdateMessage>,
    /// Tracked token symbols (filtered for Pyth support)
    tracked_symbols: Arc<RwLock<Vec<String>>>,
    /// Update interval in milliseconds
    update_interval_ms: u64,
    /// Candle aggregator for OHLC data
    candle_aggregator: Arc<CandleAggregator>,
}

impl PriceStreamServer {
    /// Create a new price stream server.
    pub fn new(pyth: Arc<PythClient>, update_interval_ms: u64) -> Self {
        let (price_tx, _) = broadcast::channel(1000); 
        let candle_aggregator = Arc::new(CandleAggregator::new(500));
        
        Self {
            pyth,
            price_tx,
            tracked_symbols: Arc::new(RwLock::new(Vec::new())),
            update_interval_ms,
            candle_aggregator,
        }
    }

    /// Get reference to candle aggregator
    pub fn candle_aggregator(&self) -> Arc<CandleAggregator> {
        Arc::clone(&self.candle_aggregator)
    }

    /// Get a receiver for price updates
    pub fn subscribe(&self) -> broadcast::Receiver<PriceUpdateMessage> {
        self.price_tx.subscribe()
    }

    /// Start the price streaming service.
    pub async fn start(self: Arc<Self>) -> anyhow::Result<()> {
        info!("Starting Pyth-only price streaming service...");
        
        // Initial set of tokens to track (core tokens supported by Pyth)
        let core_tokens = vec![
            "SOL", "BTC", "ETH", "USDC", "USDT", "JUP", "RAY", "ORCA", 
            "DRIFT", "JTO", "BONK", "WIF", "PYTH", "LINK", "MOODENG", "PNUT", "GOAT"
        ];
        
        *self.tracked_symbols.write().await = core_tokens.iter().map(|s| s.to_string()).collect();
        info!("Tracking {} core tokens from Pyth Network", core_tokens.len());
        
        // Spawn background polling task
        let server = Arc::clone(&self);
        tokio::spawn(async move {
            let mut interval = tokio::time::interval(Duration::from_millis(server.update_interval_ms));
            interval.set_missed_tick_behavior(tokio::time::MissedTickBehavior::Skip);
            
            loop {
                interval.tick().await;
                
                let symbols = server.tracked_symbols.read().await.clone();
                let symbol_refs: Vec<&str> = symbols.iter().map(|s| s.as_str()).collect();
                
                // Fetch prices exclusively from Pyth
                let prices = server.pyth.get_prices(&symbol_refs).await;
                
                let timestamp = std::time::SystemTime::now()
                    .duration_since(std::time::UNIX_EPOCH)
                    .unwrap_or_default()
                    .as_secs();

                for (symbol, price) in prices {
                    // Update candle aggregator (non-blocking)
                    let candle_agg = Arc::clone(&server.candle_aggregator);
                    let symbol_clone = symbol.clone();
                    tokio::spawn(async move {
                        candle_agg.add_price_update(&symbol_clone, price, timestamp).await;
                    });
                    
                    let update = PriceUpdateMessage {
                        message_type: "price_update".to_string(),
                        data: PriceUpdateData {
                            symbol: symbol.clone(),
                            mint: "".to_string(), // In Pyth-only mode, we use symbols as primary identifiers
                            price,
                            source: "pyth".to_string(),
                            timestamp,
                        },
                    };
                    
                    if server.price_tx.send(update).is_err() {
                        debug!("No active WebSocket subscribers for price updates");
                    }
                }
                
                debug!("Pyth price update cycle completed");
            }
        });
        
        info!("Price stream server started ({}ms interval, Pyth-only)", self.update_interval_ms);
        Ok(())
    }

    /// Add tokens to track (dynamically add new tokens)
    pub async fn add_tokens(&self, symbols: &[&str]) {
        let mut tracked = self.tracked_symbols.write().await;
        for symbol in symbols {
            let symbol_upper = symbol.to_uppercase();
            if !tracked.contains(&symbol_upper) {
                tracked.push(symbol_upper);
            }
        }
        info!("Now tracking {} tokens", tracked.len());
    }

    /// Remove tokens from tracking
    pub async fn remove_tokens(&self, symbols: &[&str]) {
        let mut tracked = self.tracked_symbols.write().await;
        for symbol in symbols {
            let symbol_upper = symbol.to_uppercase();
            tracked.retain(|s| s != &symbol_upper);
        }
        info!("Now tracking {} tokens", tracked.len());
    }
}


