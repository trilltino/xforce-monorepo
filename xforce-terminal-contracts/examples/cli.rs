//! XForce Terminal - Batch Swap Router CLI
//!
//! A simple CLI client to interact with the Batch Swap Router program on Solana devnet.
//! This demonstrates how to use the on-chain program for testing.
//!
//! Usage:
//!   cargo run --example cli -- --help
//!
//! Devnet Program: HS63bw1V1qTM5uWf92q3uaFdqogrc4SN9qUJSR8aqBMx

use anchor_lang::solana_program::pubkey::Pubkey;
use anchor_lang::AnchorDeserialize;
use clap::{Parser, Subcommand};
use serde::{Deserialize, Serialize};
use solana_client::rpc_client::RpcClient;
use solana_sdk::signature::{Keypair, Signer};
use solana_sdk::transaction::Transaction;
use std::str::FromStr;

/// Batch Swap Router CLI
#[derive(Parser)]
#[command(name = "batch-swap-cli")]
#[command(about = "Interact with Batch Swap Router on Solana Devnet", long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,

    /// RPC URL (default: devnet)
    #[arg(short, long, default_value = "https://api.devnet.solana.com")]
    rpc_url: String,

    /// Program ID (default: devnet program)
    #[arg(short, long, default_value = "HS63bw1V1qTM5uWf92q3uaFdqogrc4SN9qUJSR8aqBMx")]
    program_id: String,
}

#[derive(Subcommand)]
enum Commands {
    /// Get program info and status
    Info,

    /// Execute a batch swap (requires wallet)
    BatchSwap {
        /// Input mint address (e.g., SOL mint)
        #[arg(long)]
        input_mint: String,

        /// Output mint address (e.g., USDC mint)
        #[arg(long)]
        output_mint: String,

        /// Amount to swap (in lamports/smallest unit)
        #[arg(long)]
        amount: u64,

        /// Minimum output amount (slippage protection)
        #[arg(long)]
        min_output: u64,
    },

    /// Get transaction details
    Tx {
        /// Transaction signature
        signature: String,
    },

    /// Airdrop SOL (devnet only)
    Airdrop {
        /// Amount in SOL
        #[arg(long)]
        amount: f64,
    },
}

/// Program instruction data (simplified for CLI)
#[derive(Debug, Clone, Serialize, Deserialize)]
struct SwapParams {
    input_mint: Pubkey,
    output_mint: Pubkey,
    amount: u64,
    min_output_amount: u64,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cli = Cli::parse();

    println!("═══════════════════════════════════════════════════════════");
    println!("     XForce Terminal - Batch Swap Router CLI");
    println!("═══════════════════════════════════════════════════════════");
    println!();

    match cli.command {
        Commands::Info => {
            println!("📋 Program Information:");
            println!("───────────────────────────────────────────────────────────");
            println!("  Program ID: {}", cli.program_id);
            println!("  RPC URL:    {}", cli.rpc_url);
            println!("  Network:    Devnet");
            println!();
            println!("  This program enables batch token swaps on Solana.");
            println!("  - Batch up to 10 swaps in a single transaction");
            println!("  - Atomic execution (all succeed or all fail)");
            println!("  - Slippage protection for each swap");
            println!();
            println!("  Instructions:");
            println!("    1. batch-swap - Execute a batch swap");
            println!("    2. tx         - View transaction details");
            println!("    3. airdrop    - Get devnet SOL for testing");
        }

        Commands::BatchSwap {
            input_mint,
            output_mint,
            amount,
            min_output,
        } => {
            println!("🔄 Batch Swap Request:");
            println!("───────────────────────────────────────────────────────────");
            println!("  Input Mint:    {}", input_mint);
            println!("  Output Mint:   {}", output_mint);
            println!("  Amount:        {} lamports", amount);
            println!("  Min Output:    {} lamports", min_output);
            println!();

            // Validate mints
            let input_mint_pubkey = Pubkey::from_str(&input_mint)
                .map_err(|e| format!("Invalid input mint: {}", e))?;
            let output_mint_pubkey = Pubkey::from_str(&output_mint)
                .map_err(|e| format!("Invalid output mint: {}", e))?;

            println!("✅ Input mint valid:  {}", input_mint_pubkey);
            println!("✅ Output mint valid: {}", output_mint_pubkey);
            println!();

            // For actual execution, you would:
            // 1. Load or create wallet (wallet adapter or keypair)
            // 2. Get quote from Jupiter or other aggregator
            // 3. Build and sign transaction
            // 4. Send to network

            println!("⚠️  To execute this swap, you need:");
            println!("    1. A funded wallet (run 'airdrop' first)");
            println!("    2. Token accounts for input/output mints");
            println!();
            println!("💡 Use the TypeScript client in tests/ or Rust client in client/");
            println!("   for full integration with wallet adapters.");
        }

        Commands::Tx { signature } => {
            println!("🔍 Transaction Lookup:");
            println!("───────────────────────────────────────────────────────────");
            println!("  Signature: {}", signature);
            println!();

            let rpc_client = RpcClient::new(&cli.rpc_url);

            match rpc_client.get_transaction(
                &signature.parse().map_err(|e: solana_sdk::signature::ParseError| 
                    format!("Invalid signature: {}", e))?,
                solana_transaction_status::TransactionDetails::Parsed,
            ) {
                Ok(tx) => {
                    println!("✅ Transaction found:");
                    println!("  Block:       {}", tx.block_time.unwrap_or(0));
                    println!("  Slot:        {}", tx.slot);
                    println!("  Status:      {:?}", tx.meta.status);
                }
                Err(e) => {
                    println!("❌ Error: {}", e);
                }
            }
        }

        Commands::Airdrop { amount } => {
            println!("💧 Devnet Airdrop:");
            println!("───────────────────────────────────────────────────────────");
            println!("  Amount: {} SOL", amount);
            println!();

            // Note: For actual airdrop, you'd need a funded keypair
            // This is a placeholder for the CLI workflow

            println!("⚠️  Note: Direct CLI airdrop requires wallet keypair.");
            println!();
            println!("💡 Use solana-cli or Phantom wallet:");
            println!("    solana airdrop 2 --url devnet");
            println!();
            println!("💡 Or use the test suite which handles airdrop automatically:");
            println!("    anchor test");
        }
    }

    println!();
    println!("═══════════════════════════════════════════════════════════");

    Ok(())
}
