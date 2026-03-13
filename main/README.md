# XFTerminal Desktop Application

The native desktop trading terminal for Solana DeFi, built with Rust and egui.

## Overview

This is the main desktop application component of XFTerminal, providing a Bloomberg-style trading interface for Solana blockchain operations. The application is built entirely in Rust for maximum performance and safety.

## Features

- **Non-Custodial Wallet**: Private keys never leave the device
- **Real-Time Trading**: Live price feeds from Pyth Network
- **Swap Aggregation**: Best prices via Jupiter aggregator
- **Batch Swaps**: Execute multiple swaps atomically
- **Social Trading**: Braid Protocol messaging for copy-trading
- **AI Assistant**: Integrated market analysis using rust-genai
- **Portfolio Tracking**: P&L analysis and trade history
- **Candlestick Charts**: Technical analysis with multiple timeframes

## Architecture

The application follows a modular architecture:

```
src/
├── lib.rs          # Library exports
├── main.rs         # Application entry point
└── ...             # Additional modules
```

## Dependencies

- **egui/eframe** - GUI framework
- **solana-sdk** - Blockchain interaction
- **anchor-client** - Smart contract calls
- **tokio** - Async runtime
- **rust-genai** - AI integration

## Building

### Requirements

- Rust 1.70+
- Solana CLI tools

### Build Commands

```bash
# Development build
cargo build

# Release build
cargo build --release

# Run the application
cargo run
```

## Configuration

The application requires:

1. Solana wallet configuration
2. RPC endpoint (mainnet/devnet)
3. Optional: API keys for AI providers

## Security

- Non-custodial design - keys stay on device
- All transactions signed locally
- No sensitive data transmitted to servers

## License

MIT License
