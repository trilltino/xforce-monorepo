# XForce Terminal Contracts

Solana smart contracts for the XForce Terminal platform. Provides batch token swap functionality with security and efficiency optimizations.

## Challenge Submission: Rebuild Backend Systems as On-Chain Rust Programs

This submission demonstrates a **Batch Swap Router** - a traditional DEX/aggregator backend pattern rebuilt as a Solana on-chain program.

## Overview

The XForce Terminal Contracts enable atomic batch execution of token swaps on Solana. By bundling multiple swaps into a single transaction, users save on fees and ensure all operations succeed or fail together.

## Web2 vs Solana Architecture

### How This Works in Web2

In a traditional Web2 backend system (like Jupiter Aggregator, 0x, or 1inch):

1. **Centralized Server**: A backend server receives swap requests from users
2. **Order Management**: The server maintains an order book or routes to multiple DEXs
3. **Transaction Construction**: Server constructs transactions and returns them to the client
4. **Execution**: Client signs and submits transactions to blockchain
5. **State Management**: Server maintains database of all orders, trades, and user balances
6. **Fees**: Server charges fees, stored in their database
7. **Single Point of Failure**: Server downtime means no trading

```
Web2 Architecture:
┌─────────┐     ┌─────────────┐     ┌─────────────┐
│  Client │────▶│  Backend    │────▶│  Database  │
└─────────┘     │  Server     │     └─────────────┘
                │  (中心化)    │
                └──────┬──────┘
                       │
                       ▼
                ┌─────────────┐
                │  Blockchain │
                │  (Execution)│
                └─────────────┘
```

### How This Works on Solana

This program implements the same functionality **entirely on-chain**:

1. **No Central Server**: All logic runs on Solana validators
2. **Account Model**: Program state stored in Solana accounts (PDA - Program Derived Addresses)
3. **Client-Side Quote**: Client gets quote from any source (or program integrates via CPI)
4. **On-Chain Validation**: Program validates swap parameters before execution
5. **Atomic Execution**: All swaps in a batch succeed or fail together
6. **Fee Distribution**: Protocol fees distributed via on-chain logic
7. **Censorship Resistant**: No single point of failure, no server downtime

```
Solana Architecture:
┌─────────┐     ┌─────────────┐
│  Client │────▶│  Solana     │
└─────────┘     │  Validator  │
                │  Network    │
                └──────┬──────┘
                       │
                       ▼
┌─────────┐     ┌─────────────┐
│  State  │◀───▶│  Program    │
│ (Accounts)     │  (On-chain) │
└─────────┘     └─────────────┘
```

### Key Architectural Differences

| Aspect | Web2 Backend | Solana On-Chain |
|--------|--------------|------------------|
| **State Storage** | Database (SQL/NoSQL) | Solana Accounts (PDAs) |
| **Logic Execution** | Server code | BPF program |
| **Transaction** | Server constructs | Client signs |
| **Fees** | Database records | Native SOL transfers |
| **Uptime** | Server dependent | 99.9%+ validator network |
| **Censorship** | Possible | Impossible |
| **Transparency** | Private | Public (all on-chain) |
| **Latency** | Database queries | ~400ms block time |

## Tradeoffs & Constraints

### Advantages of On-Chain Implementation

1. **Censorship Resistance**: No single entity can stop trading
2. **Transparency**: All swap logic visible on-chain
3. **Composability**: Other programs can integrate directly
4. **Reduced Trust**: No need to trust a backend server
5. **Atomic Batching**: Multiple swaps execute atomically

### Constraints & Limitations

1. **Compute Limits**: Solana has ~1.4M compute units per transaction; complex routing requires client-side pre-computation
2. **Account Rent**: State accounts require rent SOL (or be rent-exempt)
3. **No Private State**: All data on-chain is public; sensitive data requires off-chain storage with zero-knowledge proofs
4. **Transaction Size**: Max 1232 bytes; limits batch size
5. **Atomicity Scope**: Only swaps in single transaction are atomic, not across multiple transactions
6. **Price Feeds**: Program doesn't include price oracles; relies on client-provided quotes

### Why Not Fully On-Chain?

- **Price Aggregation**: Complex DEX routing requires significant compute; typically done client-side or via separate aggregator
- **Gas Optimization**: Finding best routes is computationally expensive; done off-chain
- **Oracle Costs**: On-chain price feeds cost money per update; client-fetched prices are free
- **User Experience**: Sub-second response times require off-chain quote fetching

## Program

### Batch Swap Router

Execute multiple swaps atomically in one transaction.

**Key Features:**
- Batch up to 10 swaps per transaction
- Jupiter aggregator integration for optimal routing
- Slippage protection with configurable minimums
- Protocol fee management
- Atomic execution guarantees

**Devnet Deployment:**
- Program ID: `HS63bw1V1qTM5uWf92q3uaFdqogrc4SN9qUJSR8aqBMx`
- Explorer: https://explorer.solana.com/address/HS63bw1V1qTM5uWf92q3uaFdqogrc4SN9qUJSR8aqBMx?cluster=devnet
- Example Batch Swap TX: https://explorer.solana.com/tx/{signature}?cluster=devnet
- Example Execute Swap TX: https://explorer.solana.com/tx/{signature}?cluster=devnet

## Challenge Submission Checklist

- [x] Rust (Anchor) program implemented
- [x] Deployed to Devnet (Program ID above)
- [x] Public GitHub repository (this repo)
- [x] Architecture explanation (Web2 vs Solana above)
- [x] Tradeoffs & constraints documented
- [x] Tests included (see `tests/`)
- [x] Client library (see `client/`)
- [ ] CLI client for testing (in progress)

## Quick Test Commands

```bash
# Test on devnet
anchor test --provider.cluster devnet

# Deploy update
anchor deploy --provider.cluster devnet
```

## Project Structure

```
xforce-terminal-contracts/
├── programs/
│   └── batch-swap-router/    # Anchor program
├── client/                     # Rust client library
├── examples/                   # Usage examples
├── tests/                      # Integration tests
└── docs/                       # Documentation
```

## Quick Start

### Prerequisites
- Rust 1.70+
- Solana CLI 1.17+
- Anchor 0.30+

### Build

```bash
anchor build
```

### Test

```bash
anchor test
```

### Deploy

```bash
# Devnet
anchor deploy --provider.cluster devnet

# Mainnet (requires keypair with SOL)
anchor deploy --provider.cluster mainnet
```

## Usage

### Rust Client

```rust
use xforce_terminal_contracts_client::BatchSwapRouterClient;

let client = BatchSwapRouterClient::new(
    program_id,
    payer,
    rpc_client,
);

let swaps = vec![SwapParams {
    input_mint: sol_mint,
    output_mint: usdc_mint,
    amount: 1_000_000_000,      // 1 SOL
    min_output_amount: 90_000_000,  // Min 90 USDC
}];

let signature = client.batch_swap(swaps).await?;
```

### TypeScript Client

```typescript
import { BatchSwapRouter } from './client';

const router = new BatchSwapRouter(program, provider);

const swaps = [{
    inputMint: SOL_MINT,
    outputMint: USDC_MINT,
    amount: new BN(1_000_000_000),
    minOutputAmount: new BN(90_000_000),
}];

const tx = await router.batchSwap(swaps);
await provider.sendAndConfirm(tx);
```

## Architecture

### Instructions

1. **`batch_swap`** - Execute multiple swaps in one transaction
   - Maximum 10 swaps per batch
   - Atomic execution
   - Fee calculation per swap

2. **`execute_swap`** - Execute single swap
   - Token swap execution
   - Slippage protection
   - Fee distribution

### Security

- Input validation on all parameters
- Account ownership verification
- Amount limits prevent dust attacks
- Batch size limits prevent DoS
- Slippage protection
- Atomic execution

## Documentation

- [Program README](programs/batch-swap-router/README.md) - Detailed program documentation
- [Client README](client/README.md) - Client library documentation
- [Security](docs/SECURITY.md) - Security considerations
- [MVP Summary](docs/MVP_SUMMARY.md) - Project overview

## License

MIT - See [LICENSE](LICENSE) for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit a pull request
