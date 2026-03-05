//! JWT token management

use chrono::{Duration, Utc};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub username: String,
    pub exp: i64,
    pub iat: i64,
}

pub fn encode_jwt(user_id: i64, username: String, secret: &str, expiration_hours: i64) -> Result<String, String> {
    let now = Utc::now();
    let claims = Claims {
        sub: user_id.to_string(),
        username,
        exp: (now + Duration::hours(expiration_hours)).timestamp(),
        iat: now.timestamp(),
    };

    encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_bytes()))
        .map_err(|e| format!("Failed to encode: {}", e))
}

pub fn decode_jwt(token: &str, secret: &str) -> Result<Claims, String> {
    decode::<Claims>(token, &DecodingKey::from_secret(secret.as_bytes()), &Validation::default())
        .map(|data| data.claims)
        .map_err(|e| format!("Failed to decode: {}", e))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_jwt_roundtrip() {
        let secret = "test-secret-key-must-be-at-least-32-chars-long!";
        let token = encode_jwt(1, "test".to_string(), secret, 24).unwrap();
        let claims = decode_jwt(&token, secret).unwrap();
        assert_eq!(claims.sub, "1");
        assert_eq!(claims.username, "test");
    }
}
