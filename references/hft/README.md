# HFT References

This folder contains high-frequency trading (HFT) and market-making reference materials, SDKs, and infrastructure tools for Solana.

## [hftbacktest](https://github.com/nkaz001/hftbacktest)
A high-frequency trading and market-making backtesting tool in Python and Rust.
- **Role**: High-fidelity strategy validation including latency and queue position simulation.

## [Phoenix SDK](https://github.com/Ellipsis-Labs/phoenix-v1)
The gold standard for CLOB (Limit Order Book) trading on Solana.
- **Role**: Built for ultra-low latency; the primary destination for HFT market making.

## [Drift SDK](https://github.com/drift-labs/drift-rs)
Professional Rust SDK for Drift Protocol.
- **Role**: Best for Perpetual Futures strategies, liquidations, and delta-neutral market making.

## [Jito Searcher Client](https://github.com/jito-foundation/jito-searcher-client)
Client for interacting with Jito's MEV infrastructure.
- **Role**: Critical for HFT to avoid being "sandwiched" and to send optimized transaction bundles.

## [Yellowstone gRPC](https://github.com/rpcpool/yellowstone-grpc)
Ultra-low latency Geyser-based market data stream.
- **Role**: High-speed alternative to standard WebSockets for real-time market data.

## [crossbeam](https://github.com/crossbeam-rs/crossbeam)
The industry standard for lock-free concurrency in Rust.
- **Role**: High-performance channels and atomic data structures to move market data between threads with microsecond latency.

## [fixed](https://github.com/paholg/fixed)
Fixed-point decimal math.
- **Role**: Replaces `f64` for all price and size calculations to eliminate rounding errors and speed up execution logic.

## [orderbook_rs](https://github.com/aserebryakov/orderbook_rs)
A high-performance, thread-safe limit order book.
- **Role**: Reference implementation for local L2/L3 order book tracking and price-impact simulation.

---

### Local Strategy Development
Use the `lib-strategy` crate in `xforce-terminal/crates/libs/lib-strategy` to implement your logic using the standardized `Strategy` trait.
- Always prefer `crossbeam` channels over `std::sync::mpsc`.
- Always use `fixed` or `rust-decimal` for price calculations.
