//! Backend API server entry point

use lib_web::{start_server, ServerConfig};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();

    start_server(ServerConfig {
        bind_address: "127.0.0.1:3001".to_string(),
        migrations_path: "migrations",
        ..Default::default()
    }).await
}
