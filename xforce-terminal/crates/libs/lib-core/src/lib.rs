//! Core library - models, database, config

pub mod config;
pub mod dto;
pub mod error;
pub mod model;

pub use config::{Config, core_config, init_config};
pub use error::{AppError, Result};
pub use model::store::{DbPool, create_pool};
