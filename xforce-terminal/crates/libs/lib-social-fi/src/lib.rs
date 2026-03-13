//! # XForce Social-Fi Library
//!
//! This crate provides P2P messaging and resource sharing capabilities using Braid and Iroh.
//! It allows users to communicate directly without a central server and share trading
//! strategies and code snippets.

use serde::{Deserialize, Serialize};

pub mod db;
pub mod error;
pub mod identity;
pub mod node;

pub use db::*;
pub use error::*;
pub use identity::*;
pub use node::*;

/// Represents the type of data being shared over the P2P network.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum P2PPayload {
    /// A standard text chat message.
    Chat { text: String },
    /// A shared file, such as a trading strategy or configuration.
    File {
        filename: String,
        file_type: String, // e.g., "application/json", "text/rust"
        content: Vec<u8>,
    },
}

/// The outer wrapper for any data sent over the Social-Fi network.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SocialMessage {
    pub sender_id: String,
    pub timestamp: u64,
    pub payload: P2PPayload,
}

use iroh::EndpointId;
use solana_sdk::pubkey::Pubkey;

/// Derives an Iroh EndpointId (PeerId) from a Solana Pubkey.
/// Since both use Ed25519, we can map them directly.
pub fn pubkey_to_nodeid(pubkey: &Pubkey) -> EndpointId {
    EndpointId::from_bytes(&pubkey.to_bytes()).expect("Invalid pubkey bytes for EndpointId")
}

/// Derives a Solana Pubkey from an Iroh EndpointId.
pub fn nodeid_to_pubkey(nodeid: &EndpointId) -> Pubkey {
    Pubkey::new_from_array(*nodeid.as_bytes())
}
