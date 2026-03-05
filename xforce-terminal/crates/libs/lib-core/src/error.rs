//! Application error types

use axum::{http::StatusCode, response::{IntoResponse, Response}, Json};
use serde_json::json;
use thiserror::Error;

pub type Result<T> = std::result::Result<T, AppError>;

#[derive(Debug, Error)]
pub enum AppError {
    #[error("Config error: {0}")]
    Config(String),
    #[error("RPC error: {0}")]
    Rpc(String),
    #[error("Account error: {0}")]
    Account(String),
    #[error("Transaction error: {0}")]
    Transaction(String),
    #[error("Encoding error: {0}")]
    Encoding(String),
    #[error("Decoding error: {0}")]
    Decoding(String),
    #[error("Invalid input: {0}")]
    InvalidInput(String),
    #[error("Internal error: {0}")]
    Internal(String),
    #[error("Not found: {0}")]
    NotFound(String),
}

impl AppError {
    pub fn status_code(&self) -> StatusCode {
        match self {
            AppError::InvalidInput(_) | AppError::Transaction(_) => StatusCode::BAD_REQUEST,
            AppError::NotFound(_) | AppError::Account(_) => StatusCode::NOT_FOUND,
            AppError::Rpc(_) => StatusCode::BAD_GATEWAY,
            _ => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    pub fn user_message(&self) -> String {
        match self {
            AppError::InvalidInput(msg) | AppError::NotFound(msg) | 
            AppError::Account(msg) | AppError::Transaction(msg) => msg.clone(),
            AppError::Rpc(_) => "Service temporarily unavailable".to_string(),
            _ => "An internal error occurred".to_string(),
        }
    }
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let status = self.status_code();
        let error_code = match &self {
            AppError::Config(_) => "Config",
            AppError::Rpc(_) => "Rpc",
            AppError::Account(_) => "Account",
            AppError::Transaction(_) => "Transaction",
            AppError::Encoding(_) => "Encoding",
            AppError::Decoding(_) => "Decoding",
            AppError::InvalidInput(_) => "InvalidInput",
            AppError::Internal(_) => "Internal",
            AppError::NotFound(_) => "NotFound",
        };
        
        let body = Json(json!({
            "error": self.user_message(),
            "code": error_code,
        }));

        (status, body).into_response()
    }
}

impl From<anyhow::Error> for AppError {
    fn from(err: anyhow::Error) -> Self {
        AppError::Internal(err.to_string())
    }
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        match err {
            sqlx::Error::RowNotFound => AppError::NotFound("Record not found".to_string()),
            _ => AppError::Internal(err.to_string()),
        }
    }
}

impl From<serde_json::Error> for AppError {
    fn from(err: serde_json::Error) -> Self {
        AppError::Decoding(err.to_string())
    }
}
