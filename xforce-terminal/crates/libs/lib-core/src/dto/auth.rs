//! Authentication DTOs

use serde::{Deserialize, Serialize};

/// Login request
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct LoginRequest {
    pub email_or_username: String,
    pub password: String,
}

/// Signup request
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct SignupRequest {
    pub username: String,
    pub email: String,
    pub password: String,
}

/// Auth response with JWT token
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct AuthResponse {
    pub user: UserInfo,
    pub token: String,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub wallet_setup_required: Option<bool>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub wallet_setup_token: Option<String>,
}

/// Public user info (safe to send to client)
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct UserInfo {
    pub id: String,
    pub username: String,
    pub email: String,
    pub created_at: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub wallet_address: Option<String>,
}

/// Error response
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct ErrorResponse {
    pub error: String,
}

/// Wallet setup validation request
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct WalletSetupValidateRequest {
    pub token: String,
}

/// Wallet setup validation response
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct WalletSetupValidateResponse {
    pub valid: bool,
    pub username: String,
    pub challenge: String,
}

/// Wallet setup completion request
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct WalletSetupCompleteRequest {
    pub setup_token: String,
    pub wallet_address: String,
    pub signature: String,
    pub challenge: String,
}

/// Wallet setup completion response
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct WalletSetupCompleteResponse {
    pub success: bool,
    pub message: String,
}

/// Wallet login request
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct WalletLoginRequest {
    pub wallet_address: String,
    pub signature: String,
    pub challenge: String,
}

/// Transaction submission request
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct SubmitTransactionRequest {
    pub transaction: String,
    pub wallet_address: String,
    pub transaction_type: String,
}

/// Transaction submission response
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct SubmitTransactionResponse {
    pub success: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub signature: Option<String>,
    pub message: String,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_login_request_roundtrip() {
        let request = LoginRequest {
            email_or_username: "test@example.com".to_string(),
            password: "password123".to_string(),
        };
        let json = serde_json::to_string(&request).unwrap();
        let deserialized: LoginRequest = serde_json::from_str(&json).unwrap();
        assert_eq!(request, deserialized);
    }

    #[test]
    fn test_auth_response_roundtrip() {
        let response = AuthResponse {
            user: UserInfo {
                id: "1".to_string(),
                username: "test".to_string(),
                email: "test@example.com".to_string(),
                created_at: "2024-01-01".to_string(),
                wallet_address: None,
            },
            token: "jwt_token".to_string(),
            message: "Success".to_string(),
            wallet_setup_required: None,
            wallet_setup_token: None,
        };
        let json = serde_json::to_string(&response).unwrap();
        assert!(!json.contains("wallet_setup_required"));
    }
}
