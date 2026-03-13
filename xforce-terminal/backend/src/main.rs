//! Backend API server entry point

use lib_web::{start_server, ServerConfig};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();

    // Robust migrations path resolution for monorepo
    let migrations_path = std::env::var("MIGRATIONS_PATH").unwrap_or_else(|_| {
        if std::path::Path::new("migrations").exists() {
            "migrations".to_string()
        } else if std::path::Path::new("../migrations").exists() {
            "../migrations".to_string()
        } else if std::path::Path::new("xforce-terminal/migrations").exists() {
            "xforce-terminal/migrations".to_string()
        } else {
            "migrations".to_string() // Fallback
        }
    });

    start_server(ServerConfig {
        bind_address: "127.0.0.1:3001".to_string(),
        migrations_path: Box::leak(migrations_path.into_boxed_str()), // Leak for 'static string
        ..Default::default()
    }).await
}
