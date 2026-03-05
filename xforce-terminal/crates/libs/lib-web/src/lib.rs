//! # Web Library
//!
//! HTTP handlers, middleware, routes, and web services.

pub mod handlers;
pub mod middleware;
pub mod routes;
pub mod services;
pub mod chat;
pub mod server;
pub mod types;

pub use server::{start_server, ServerConfig, AppState};
pub use types::{ErrorResponse, SubmitTransactionRequest, SubmitTransactionResponse};

