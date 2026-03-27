# XForce Platform
<img width="1919" height="1079" alt="Screenshot 2026-03-22 164125" src="https://github.com/user-attachments/assets/f17f72ef-6f10-4118-9087-8cc3aec6653e" />


<img width="961" height="1079" alt="Screenshot 2026-03-22 133632" src="https://github.com/user-attachments/assets/d23099f1-e5bb-4262-9af0-2bffcdc02938" />

A comprehensive Solana DeFi ecosystem consisting of a trading terminal, smart contracts, and crypto news aggregation service.
# XForce Terminal

Open-source native Rust trading terminal for Solana. Professional desktop execution infrastructure — Geyser, Pinocchio, Jito, Iroh — and the first SPL Compliance Identity Registry mapping mint addresses to verified LEI identifiers in a FIGI-compatible schema.

**Non-custodial. Fully open-source. Built to be forked.**

Repo: [github.com/trilltino/xforce-monorepo](https://github.com/trilltino/xforce-monorepo)

---

## What's in this repo

| Project | Description |
|---|---|
| `xforce-terminal` | Native Tauri desktop terminal — Geyser data pipeline, Pinocchio swap router, Jito MEV protection, Iroh P2P SocialFi layer |
| `xforce-terminal-contracts` | Production Solana smart contracts — atomic batch token swaps with Jupiter integration |
| `xforce-crypto-info` | Crypto news aggregation and sentiment analysis service |

---

## Architecture

```
xfterminal/
├── xforce-terminal/
│   ├── backend/                  # Axum REST API
│   ├── crates/                   # Modular Rust libraries (lib-solana, lib-core, lib-web)
│   ├── terminal-tauri/           # Tauri desktop application
│   ├── wallet-react/             # React web wallet
│   ├── docs/                     # Documentation
│   ├── idl/                      # Solana IDL files
│   └── migrations/               # Database migrations
├── xforce-terminal-contracts/
│   ├── programs/                 # Anchor programs
│   ├── client/                   # Rust client library
│   ├── examples/                 # Usage examples
│   └── tests/                    # Integration tests
└── xforce-crypto-info/
    ├── news-web/                 # React frontend
    ├── news-scraper/             # Python scraper
    └── ref/                      # Reference implementations
```

---

## XForce Terminal

Non-custodial Solana trading terminal. Replaces browser-based tools with a hardware-accelerated desktop stack.

**The Data Layer** — Yellowstone Geyser gRPC pipeline delivering sub-100ms market data directly from validator state. Three-tier fallback: Geyser primary, Pyth Crosschain secondary, Jupiter tertiary. No single points of failure.

**The Execution Layer** — Custom Pinocchio batch swap router. Zero-copy account deserialization, no-std execution, direct SVM syscalls. 30% compute unit reduction versus standard Anchor programs. Every swap submitted via Jito bundles by default — atomic, MEV-protected, requiring zero manual configuration.

**The Compliance Layer** — First open SPL Compliance Identity Registry. Verifies issuer LEI against GLEIF in real time, stores instrument metadata in a FIGI-compatible schema, writes the binding on-chain as a permanently queryable PDA.

**The Social Layer** — Fully decentralised P2P messaging on Iroh QUIC transport, Braid CRDT state sync, p2panda Double Ratchet E2EE. Trader identity cryptographically bound to a Solana wallet keypair. No platform accounts. No central intermediaries.

**Tech stack:** Rust (Axum, Tauri, Tonic), React, TypeScript, PostgreSQL

```bash
# Backend API
cd xforce-terminal/backend
cargo run
# → http://localhost:8080

# Desktop terminal
cd xforce-terminal/terminal-tauri/src-ui && npm install
cd .. && cargo tauri dev
```

---

## XForce Terminal Contracts

Production Solana smart contracts for atomic batch token swaps.

- Batch up to 10 swaps per transaction
- Jupiter integration for optimal routing
- Slippage protection at instruction level
- Atomic execution — all swaps succeed or none do

**Devnet program ID:** `HS63bw1V1qTM5uWf92q3uaFdqogrc4SN9qUJSR8aqBMx`

**Tech stack:** Rust, Anchor Framework

```bash
cd xforce-terminal-contracts
anchor build
anchor test
anchor deploy --provider.cluster devnet
```

---

## XForce Crypto Info

News aggregation and sentiment analysis for crypto markets.

- RSS aggregation from 10+ sources
- Sentiment scoring via NLTK/VADER
- PostgreSQL storage with real-time React dashboard

**Tech stack:** Python, React, TypeScript, PostgreSQL

```bash
cd xforce-crypto-info/news-scraper
pip install -r requirements.txt
python main.py

cd ../news-web && npm install && npm run dev
# → http://localhost:5173
```

---

## Developer API

A REST API exposes the full terminal stack — market data, routing logic, execution operations — with integrations in Python, JavaScript, and Rust. Documentation covers endpoints, authentication, rate limits, and bot examples.

Every component ships as a modular Rust library. Fork any part of the stack independently.

---

## Prerequisites

- Rust 1.70+
- Node.js 18+
- Python 3.9+
- PostgreSQL 14+
- Solana CLI (for contract deployment)

---

## Security

This platform handles cryptocurrency transactions.

- Always test on devnet before mainnet
- Review contract code before deploying
- Never commit private keys
- Use a hardware wallet for mainnet operations

To report a vulnerability, open a private security advisory on GitHub.

---

## License

Apache-2.0 / MIT — see individual project LICENSE files.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit with clear messages
4. Open a pull request

All components are documented, benchmarked, and production-ready. Built to be forked.
