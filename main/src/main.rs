use clap::{Parser, Subcommand};
use tracing::info;

#[derive(Parser)]
#[command(name = "xfterminal")]
#[command(about = "XForce Terminal - Solana DeFi Trading Platform")]
#[command(version)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Start the Tauri Terminal (desktop app)
    Terminal,
    /// Start the backend API server
    Backend,
    /// Start the Wallet web interface (React)
    Wallet,
    /// Start the Crypto News web interface (React)
    News,
    /// Check system status
    Status,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter("info")
        .init();

    let cli = Cli::parse();
    let version = env!("CARGO_PKG_VERSION");

    info!("XForce Terminal v{}", version);

    match cli.command {
        Commands::Terminal => {
            println!("Starting XForce Terminal (Tauri)...");
            println!("");
            println!("Run manually with:");
            println!("  cd xforce-terminal/terminal-tauri");
            println!("  cargo tauri dev");
            println!("");
            println!("Prerequisites:");
            println!("  - npm/pnpm installed");
            println!("  - Run 'npm install' in xforce-terminal/terminal-tauri/src-ui/");
        }
        Commands::Backend => {
            println!("Starting Backend API Server...");
            println!("");
            println!("Run manually with:");
            println!("  cd xforce-terminal/backend");
            println!("  cargo run");
        }
        Commands::Wallet => {
            println!("Starting Wallet Web Interface (React)...");
            println!("");
            println!("Run manually with:");
            println!("  cd xforce-terminal/wallet-react");
            println!("  npm install");
            println!("  npm run dev");
            println!("");
            println!("Then open http://localhost:5173");
        }
        Commands::News => {
            println!("Starting Crypto News Service (React)...");
            println!("");
            println!("Run manually with:");
            println!("  cd xforce-crypto-info/news-web");
            println!("  npm install");
            println!("  npm run dev");
            println!("");
            println!("Then open http://localhost:5173");
        }
        Commands::Status => {
            println!("XForce Terminal v{}", version);
            println!("========================");
            println!("");
            println!("Components:");
            println!("  ✓ Terminal (Tauri)   - xforce-terminal/terminal-tauri/");
            println!("  ✓ Backend            - xforce-terminal/backend/");
            println!("  ✓ Wallet (React)     - xforce-terminal/wallet-react/");
            println!("  ✓ News (React)       - xforce-crypto-info/news-web/");
            println!("");
            println!("Quick Start:");
            println!("  xfterminal terminal  - Desktop trading terminal");
            println!("  xfterminal backend   - API server");
            println!("  xfterminal wallet    - Web wallet interface");
            println!("  xfterminal news      - Crypto news dashboard");
        }
    }

    Ok(())
}
