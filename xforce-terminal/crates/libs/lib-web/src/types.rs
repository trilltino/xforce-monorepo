//! # Common API Types
//!
//! Shared request/response types for API endpoints.

use serde::{Deserialize, Serialize};

/// Standard error response format
#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorResponse {
    pub error: String,
}

impl ErrorResponse {
    pub fn new(msg: impl Into<String>) -> Self {
        Self {
            error: msg.into(),
        }
    }
}

/// Submit transaction request
#[derive(Debug, Deserialize)]
pub struct SubmitTransactionRequest {
    pub transaction_type: String,
    pub wallet_address: String,
    pub transaction: String,
}

/// Submit transaction response
#[derive(Debug, Serialize)]
pub struct SubmitTransactionResponse {
    pub success: bool,
    pub signature: Option<String>,
    pub message: String,
}
