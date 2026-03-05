//! Application configuration

use std::env;
use std::sync::OnceLock;

#[derive(Clone, Debug)]
pub struct Config {
    pub database_url: String,
    pub jwt_secret: String,
    pub jwt_expiration_hours: i64,
}

impl Config {
    pub fn from_env() -> Result<Self, String> {
        let database_url = env::var("DATABASE_URL")
            .unwrap_or_else(|_| "sqlite:data/terminal.db".to_string());

        let jwt_secret = env::var("JWT_SECRET")
            .map_err(|_| "JWT_SECRET must be set".to_string())?;

        let jwt_expiration_hours = env::var("JWT_EXPIRATION_HOURS")
            .unwrap_or_else(|_| "24".to_string())
            .parse()
            .map_err(|_| "JWT_EXPIRATION_HOURS must be a number")?;

        Ok(Self { database_url, jwt_secret, jwt_expiration_hours })
    }

    pub fn validate(&self) -> Result<(), String> {
        if self.jwt_secret.len() < 32 {
            return Err("JWT_SECRET must be at least 32 chars".to_string());
        }
        if self.jwt_expiration_hours < 1 || self.jwt_expiration_hours > 720 {
            return Err("JWT_EXPIRATION_HOURS must be 1-720".to_string());
        }
        Ok(())
    }
}

static CONFIG: OnceLock<Config> = OnceLock::new();

pub fn init_config() -> Result<(), String> {
    let config = Config::from_env()?;
    config.validate()?;
    CONFIG.set(config).map_err(|_| "Config already initialized")?;
    Ok(())
}

pub fn core_config() -> &'static Config {
    CONFIG.get().expect("Config not initialized")
}
