import { useState } from 'react';

const tabs = ['Big Picture', 'Terminal', 'Contracts', 'Data Flows', 'Integrations', 'Tech Stack'];

const swapSteps = [
    { n: 1, title: 'You Click Swap', body: 'In the desktop app you select tokens, enter an amount, and click swap. The app immediately shows a loading indicator.' },
    { n: 2, title: 'App Asks Backend for Quote', body: 'The desktop app sends a request to the backend server to find the best price for the swap.' },
    { n: 3, title: 'Backend Asks Jupiter', body: 'The backend asks Jupiter for the best price. Jupiter checks all exchanges (Raydium, Orca, etc.) and responds with the optimal route.' },
    { n: 4, title: 'Backend Builds Transaction', body: 'The backend uses the contracts client library to build a transaction — Jupiter swap instructions combined with a call to the batch swap contract.' },
    { n: 5, title: 'Transaction Sent to You', body: 'The backend sends the unsigned transaction back to your desktop app — a form that needs your signature before it can be submitted.' },
    { n: 6, title: 'You Review and Approve', body: 'The app shows you the details: tokens, amounts, slippage. You review and confirm.' },
    { n: 7, title: 'Transaction Gets Signed', body: 'Your wallet signs the transaction using your private key. This happens 100% on your computer — your private key never leaves your device.' },
    { n: 8, title: 'Signed Transaction Sent to Backend', body: 'The signed transaction is sent back to the backend server, ready to be submitted to Solana.' },
    { n: 9, title: 'Backend Submits to Solana', body: 'The backend sends the transaction to a Solana RPC node. The node broadcasts it to the network and validators start processing it.' },
    { n: 10, title: 'Smart Contract Executes', body: 'Solana validators execute the transaction. The batch swap contract validates everything, Jupiter executes the swap on the best exchange, and tokens are swapped — all in under a second.' },
    { n: 11, title: 'Transaction Recorded', body: 'The backend saves your swap to the local database for transaction history. The app updates to show your new balances.' },
];

const newsSteps = [
    { n: 1, title: 'Scraper Wakes Up', body: 'Every 15 minutes the Python scraper automatically runs.' },
    { n: 2, title: 'Visits News Websites', body: 'The scraper visits CoinDesk, CoinTelegraph, RSS feeds, and news APIs — reading all the latest articles.' },
    { n: 3, title: 'Cleans and Processes', body: 'Using Polars, it removes duplicates, fixes formatting, and categorises articles.' },
    { n: 4, title: 'Analyses Sentiment', body: 'Each article gets analysed: positive (bullish), negative (bearish), or neutral — helping you understand market sentiment at a glance.' },
    { n: 5, title: 'Saves to Database', body: 'Everything gets stored in PostgreSQL — articles, sources, sentiment scores. Millions of articles, instant search.' },
    { n: 6, title: 'Terminal Requests News', body: 'When you open the terminal or refresh the news section, it sends a request for the latest articles.' },
    { n: 7, title: 'API Server Responds', body: 'The Rust API server finds the latest articles, formats them as JSON, and sends them back in milliseconds.' },
    { n: 8, title: 'You See Fresh News', body: 'Your terminal displays headlines, sentiment, and full articles — without leaving your trading interface.' },
];

const batchSteps = [
    { n: 1, title: 'You Plan Multiple Swaps', body: 'You want SOL → USDC → BONK → RAY. Instead of three separate transactions, you set up a batch swap.' },
    { n: 2, title: 'Terminal Uses Contracts Library', body: 'The terminal uses the contracts client library to build a special transaction that knows how to talk to the batch swap contract.' },
    { n: 3, title: 'Gets Quotes for Each Swap', body: 'For each swap in your batch, the terminal asks Jupiter for the best price and collects all quotes.' },
    { n: 4, title: 'Builds Batch Transaction', body: 'The library builds one transaction that includes all swaps plus a call to the batch swap contract — one transaction, multiple swaps.' },
    { n: 5, title: 'You Sign Once', body: 'You sign the single transaction instead of three separate ones. Saves time and fees.' },
    { n: 6, title: 'Submitted to Solana', body: 'The transaction goes to Solana. Validators see it is a batch swap and process all swaps together.' },
    { n: 7, title: 'Contract Validates Everything', body: 'The batch swap contract checks that all swaps are valid, amounts are correct, and slippage is acceptable. If anything is wrong, the whole transaction fails — protecting you.' },
    { n: 8, title: 'All Swaps Execute Atomically', body: 'If validation passes, all swaps execute together — they all succeed or all fail. No partial execution.' },
    { n: 9, title: 'You Saved Money', body: 'Instead of paying fees three times, you paid once — 66% fee reduction. All swaps happened instantly, eliminating price-change risk between swaps.' },
];

const integrationPoints = [
    {
        title: 'Terminal ↔ Contracts',
        label: 'Code Library',
        body: 'The terminal includes the contracts client library directly in its code. When you click "execute batch swap", it uses code from the contracts library to build the transaction. No network calls needed — compiled in, type-safe, instant.',
        items: ['Type: Code library compiled into the terminal', 'Timing: At build time', 'Why: Super fast, no network overhead, compiler catches errors before runtime'],
    },
    {
        title: 'Terminal ↔ News Service',
        label: 'HTTP REST API',
        body: 'The terminal makes HTTP requests to the news service. When you open the terminal it requests the latest articles. The news service responds with JSON and the terminal displays them. Both services can run on different machines.',
        items: ['Type: HTTP REST API', 'Timing: Runtime — when you use the terminal', 'Port: News service runs on port 3003'],
    },
    {
        title: 'Terminal ↔ Solana Blockchain',
        label: 'RPC / gRPC',
        body: 'The terminal talks directly to Solana via RPC endpoints for standard queries and Yellowstone Geyser gRPC for sub-100ms real-time account updates. Balance checks, transaction submission, and account queries all go through this layer.',
        items: ['Type: RPC calls + Geyser gRPC (Tonic)', 'Timing: Every blockchain interaction', 'What: Submits transactions, queries balances, streams account state'],
    },
    {
        title: 'Contracts ↔ Solana Blockchain',
        label: 'Deployed Program',
        body: 'The batch swap router program is deployed to Solana at a fixed address. Once on the blockchain it stays there. When you send a transaction calling this program, Solana validators execute it atomically.',
        items: ['Type: Deployed program living on-chain', 'Program ID: HS63bw1V1qTM5uWf92q3uaFdqogrc4SN9qUJSR8aqBMx', 'Why: Immutable, transparent, trustless'],
    },
    {
        title: 'Terminal ↔ Jupiter',
        label: 'HTTP API',
        body: 'The terminal asks Jupiter for the best swap prices across all Solana DEXs. Jupiter checks Raydium, Orca, and every other exchange and returns the optimal route — which may involve multiple exchanges to get the best deal.',
        items: ['Type: HTTP API calls to Jupiter V6', 'What: Optimal route finding across all DEXs', 'Why: Best price every time, automatically'],
    },
];

const techGroups = [
    {
        title: 'XForce Terminal',
        items: [
            'Rust — systems programming language (speed + safety)',
            'Tauri v2 — native desktop application framework',
            'Axum — async HTTP web server framework',
            'Leptos — web wallet (compiles to WebAssembly)',
            'SQLite / SQLx — local database with compile-time query checking',
            'Tokio — async runtime (handles concurrent operations)',
            'Solana SDK — blockchain communication layer',
            'JWT + Argon2 — secure session management',
            'Braid Protocol — CRDT-based P2P messaging',
            'Tonic — gRPC client for Yellowstone Geyser',
        ],
    },
    {
        title: 'Smart Contracts',
        items: [
            'Rust — same language as terminal (consistency across the stack)',
            'Pinocchio — zero-copy, no-std, direct SVM syscalls (30% CU reduction vs Anchor)',
            'Anchor — original framework, being migrated to Pinocchio',
            'anchor-client — library for interacting with deployed contracts',
            'bytemuck — zero-copy account deserialization',
        ],
    },
    {
        title: 'SocialFi Layer',
        items: [
            'Iroh — QUIC P2P transport with NAT traversal',
            'Braid CRDT — conflict-free replicated data type state sync',
            'p2panda-encryption — Double Ratchet E2EE',
            'p2panda-auth — decentralised RBAC group management',
            'Bags SDK — token gating and P2P tipping',
            'Ed25519 — Solana keypair as P2P node identity',
        ],
    },
    {
        title: 'External Integrations',
        items: [
            'Jupiter V6 — DEX aggregation and swap routing',
            'Astralane IRIS — optimised validator transaction landing',
            'Jito Bundles — MEV protection via atomic bundle submission',
            'Pyth Crosschain — high-fidelity price oracle (secondary fallback)',
            'Yellowstone Geyser — sub-100ms validator account streaming',
            'Phoenix CLOB — spot limit orders and order book',
            'Drift — perpetual futures and margin management',
        ],
    },
];

const fileTree = `xforce-terminal/
├── backend/              ← Axum API server
│   └── src/
│       ├── main.rs       ← Server entry point
│       └── data/         ← Data handlers
├── crates/libs/          ← Reusable Rust libraries
│   ├── lib-solana/       ← Blockchain: Jupiter, Pyth, Geyser, contracts
│   ├── lib-core/         ← Data models, user accounts, repository pattern
│   ├── lib-web/          ← API handlers, Braid CRDT, WebSocket layer
│   ├── lib-auth/         ← JWT, Argon2, session management
│   └── lib-utils/        ← Shared helpers
└── Cargo.toml

xforce-terminal-contracts/
├── programs/
│   └── batch-swap-router/
│       └── src/lib.rs    ← Pinocchio program entry point
├── client/
│   └── src/lib.rs        ← Client library for terminal use
└── Anchor.toml`;

function StepFlow({ steps }) {
    return (
        <div className="space-y-3">
            {steps.map((s) => (
                <div key={s.n} className="flex gap-4 items-start bg-gray-900 border border-gray-800 rounded-xl p-4">
                    <span className="w-8 h-8 bg-red-600 text-white text-sm font-black rounded-full flex items-center justify-center shrink-0">{s.n}</span>
                    <div>
                        <p className="text-white font-bold text-sm mb-1">{s.title}</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{s.body}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Architecture() {
    const [active, setActive] = useState('Big Picture');

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-10">
                <p className="text-red-400 font-mono text-sm mb-2">ARCHITECTURE</p>
                <h1 className="text-5xl font-bold text-white mb-3">
                    <span className="text-red-500">XF</span>Terminal Architecture
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    How everything works together — from validator to interface.
                </p>
            </div>

            {/* Tab bar */}
            <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-800 pb-4">
                {tabs.map((t) => (
                    <button
                        key={t}
                        onClick={() => setActive(t)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active === t ? 'bg-red-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* BIG PICTURE */}
            {active === 'Big Picture' && (
                <div className="space-y-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">The Three Projects</h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">XForce Terminal is three separate projects that compose into a complete trading platform. Each is modular, open-source, and ships as a forkable Rust library.</p>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                { name: 'XForce Terminal', tag: 'Native Desktop', desc: 'Tauri desktop app with Bloomberg-style interface, Axum backend, web wallet helper, and all Rust libraries. The main app you download and run.', color: 'border-red-600' },
                                { name: 'Batch Swap Router', tag: 'Solana Program', desc: 'Pinocchio program deployed on Solana. Zero-copy, no-std, direct SVM syscalls. Atomic multi-DEX execution with 30% CU reduction vs Anchor.', color: 'border-yellow-600' },
                                { name: 'SocialFi Layer', tag: 'P2P Infrastructure', desc: 'Iroh QUIC transport + Braid CRDT + p2panda Double Ratchet E2EE. Identity is your Solana keypair. No server holds messages.', color: 'border-purple-600' },
                            ].map((c) => (
                                <div key={c.name} className={`bg-black border-l-4 ${c.color} rounded-xl p-6`}>
                                    <p className="text-red-400 text-xs font-mono mb-1">{c.tag}</p>
                                    <h3 className="text-white font-bold text-lg mb-3">{c.name}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Data Flow Overview</h2>
                        <pre className="bg-black border border-gray-800 text-gray-400 p-4 rounded-lg text-xs overflow-x-auto leading-relaxed">
{`┌─────────────────────────────────────────────────────────┐
│                  XFTerminal Architecture                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   ┌──────────────┐     ┌──────────────┐                  │
│   │   Terminal   │────▶│  Axum API   │────▶  PostgreSQL  │
│   │   (Tauri)    │◀────│   (Rust)    │                   │
│   └──────────────┘     └──────┬───────┘                  │
│                               │                          │
│                               ▼                          │
│                    ┌──────────────────┐                  │
│                    │  Solana Program  │                  │
│                    │ (Pinocchio/Jito) │                  │
│                    └──────────────────┘                  │
│                               │                          │
│         ┌─────────────────────┼─────────────────┐        │
│         ▼                     ▼                 ▼        │
│   ┌──────────┐        ┌──────────┐       ┌──────────┐   │
│   │  Geyser  │        │ Jupiter  │       │   Pyth   │   │
│   │ (gRPC)   │        │(Routing) │       │(Oracles) │   │
│   └──────────┘        └──────────┘       └──────────┘   │
│                                                          │
│   ┌──────────────┐     ┌──────────────┐                  │
│   │  Iroh P2P    │────▶│  Braid CRDT  │────▶ Solana PDA │
│   │  (QUIC)      │     │  + p2panda   │                  │
│   └──────────────┘     └──────────────┘                  │
└─────────────────────────────────────────────────────────┘`}
                        </pre>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <h3 className="text-red-400 font-bold mb-2">Trading Data Flow</h3>
                            <p className="text-gray-400 text-sm">Terminal → Axum API → Solana via Jito bundles. Geyser primary, Pyth secondary, Jupiter tertiary for price data. Every swap routed through Astralane IRIS for optimal validator landing.</p>
                        </div>
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <h3 className="text-red-400 font-bold mb-2">Social Data Flow</h3>
                            <p className="text-gray-400 text-sm">Messages route via Iroh QUIC between peers with no central server. CRDT patches are hashed and written to Solana PDAs. Identity = Ed25519 keypair = your Solana wallet.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* TERMINAL */}
            {active === 'Terminal' && (
                <div className="space-y-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-2">The Trading Terminal</h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">The terminal has three main parts: the native desktop app you see, the backend server that does the heavy lifting, and a web wallet helper for connecting Solana wallets. All written in Rust.</p>
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                            {[
                                { title: 'Desktop App', sub: 'Tauri / egui', items: ['Bloomberg-style interface', 'Real-time price feeds', 'Charts and trading UI', 'Portfolio management', 'Updates in <50ms'] },
                                { title: 'Backend Server', sub: 'Axum — Port 3001', items: ['Handles all API requests', 'Talks to Solana RPC', 'Geyser gRPC streaming', 'Trade execution pipeline', 'JWT authentication'] },
                                { title: 'Web Wallet', sub: 'Leptos WebAssembly', items: ['Phantom connection', 'Solflare support', 'Backpack support', 'Transaction signing', 'Non-custodial by design'] },
                            ].map((c) => (
                                <div key={c.title} className="bg-black border border-gray-800 rounded-xl p-5">
                                    <h3 className="text-white font-bold mb-1">{c.title}</h3>
                                    <p className="text-red-400 text-xs font-mono mb-3">{c.sub}</p>
                                    <ul className="space-y-1">
                                        {c.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                                                <span className="text-red-500 shrink-0">▸</span>{item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Modular Rust Libraries</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { name: 'lib-solana', path: 'crates/libs/lib-solana', desc: 'All blockchain communication. Jupiter routing, Pyth oracle queries, Geyser gRPC subscriptions, contract CPI helpers, RPC connection pooling.' },
                                { name: 'lib-core', path: 'crates/libs/lib-core', desc: 'Data models and repository pattern. User accounts, trading history, message storage, database helpers via SQLx.' },
                                { name: 'lib-web', path: 'crates/libs/lib-web', desc: 'Web server handlers, WebSocket delivery layer, Braid CRDT protocol, API response formatting.' },
                                { name: 'lib-auth', path: 'crates/libs/lib-auth', desc: 'Login and session management. JWT tokens, Argon2 password hashing, session lifecycle, key derivation.' },
                            ].map((lib) => (
                                <div key={lib.name} className="bg-black border border-red-900/30 rounded-xl p-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <code className="text-red-400 font-bold">{lib.name}</code>
                                        <code className="text-gray-600 text-xs">{lib.path}</code>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">{lib.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* CONTRACTS */}
            {active === 'Contracts' && (
                <div className="space-y-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-2">Batch Swap Router</h2>
                        <p className="text-gray-400 mb-2 leading-relaxed">A Pinocchio program deployed on Solana — zero-copy, no-std, direct SVM syscalls. Normally swapping SOL → USDC → BONK → RAY requires three transactions and three fee payments. The batch swap router executes all swaps in one transaction, one fee.</p>
                        <div className="bg-black border border-red-900/30 rounded-xl p-4 mb-6">
                            <p className="text-gray-500 text-xs font-mono mb-1">Program ID (devnet)</p>
                            <p className="text-red-400 font-mono text-sm">HS63bw1V1qTM5uWf92q3uaFdqogrc4SN9qUJSR8aqBMx</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-800">
                                        <th className="text-left text-gray-400 font-medium py-3 pr-6">Feature</th>
                                        <th className="text-left text-gray-400 font-medium py-3 pr-6">What It Means</th>
                                        <th className="text-left text-gray-400 font-medium py-3">Why It Matters</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {[
                                        ['Batch Swaps', 'Up to 10 swaps in one transaction', '60–90% fee reduction vs individual transactions'],
                                        ['Atomic Execution', 'All swaps succeed or all fail together', 'No partial execution risk — you are always protected'],
                                        ['Slippage Protection', 'Instruction-level slippage guards', 'Transaction fails if market moves beyond your threshold'],
                                        ['30% CU Reduction', 'Pinocchio vs Anchor baseline', 'Zero-copy deserialization, no discriminator overhead, direct syscalls'],
                                        ['Jito Integration', 'Submitted via bundles by default', 'Front-running and sandwich attacks blocked on every trade'],
                                    ].map(([f, m, w]) => (
                                        <tr key={f}>
                                            <td className="py-3 pr-6 text-white font-medium">{f}</td>
                                            <td className="py-3 pr-6 text-gray-400">{m}</td>
                                            <td className="py-3 text-gray-400">{w}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Client Library</h2>
                        <p className="text-gray-400 mb-4 leading-relaxed">The client library is a Rust crate that ships alongside the program. It abstracts all the complexity of building transactions that call the batch swap router — developers call simple functions like <code className="text-red-400">execute_batch_swap()</code> and the library handles account validation, instruction building, and error handling.</p>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                { label: 'Location', val: 'xforce-terminal-contracts/client/' },
                                { label: 'Language', val: 'Rust — compiled into terminal' },
                                { label: 'Type Safety', val: 'Compiler catches errors before runtime' },
                            ].map((item) => (
                                <div key={item.label} className="bg-black border border-gray-800 rounded-xl p-4">
                                    <p className="text-gray-500 text-xs mb-1">{item.label}</p>
                                    <p className="text-white text-sm font-medium">{item.val}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* DATA FLOWS */}
            {active === 'Data Flows' && (
                <div className="space-y-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Token Swap — 11 Steps</h2>
                        <p className="text-gray-400 mb-5 text-sm">From clicking swap to confirmed on-chain — everything that happens in under a second.</p>
                        <StepFlow steps={swapSteps} />
                    </div>
                    <div className="border-t border-gray-800 pt-10">
                        <h2 className="text-2xl font-bold text-white mb-2">Batch Swap — 9 Steps</h2>
                        <p className="text-gray-400 mb-5 text-sm">Multiple swaps. One transaction. One fee. Atomic execution — all succeed or all fail.</p>
                        <StepFlow steps={batchSteps} />
                    </div>
                    <div className="border-t border-gray-800 pt-10">
                        <h2 className="text-2xl font-bold text-white mb-2">News Feed Update — 8 Steps</h2>
                        <p className="text-gray-400 mb-5 text-sm">How market intelligence reaches your terminal automatically every 15 minutes.</p>
                        <StepFlow steps={newsSteps} />
                    </div>
                </div>
            )}

            {/* INTEGRATIONS */}
            {active === 'Integrations' && (
                <div className="space-y-4">
                    {integrationPoints.map((p) => (
                        <div key={p.title} className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                            <div className="flex items-center gap-3 mb-3">
                                <h2 className="text-xl font-bold text-white">{p.title}</h2>
                                <span className="px-2 py-0.5 bg-red-600/20 border border-red-600/40 text-red-400 text-xs rounded font-mono">{p.label}</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-4">{p.body}</p>
                            <ul className="space-y-1">
                                {p.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-500 text-sm">
                                        <span className="text-red-600 shrink-0">▸</span>{item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* TECH STACK */}
            {active === 'Tech Stack' && (
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        {techGroups.map((g) => (
                            <div key={g.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                                <h3 className="text-white font-bold text-lg mb-4">{g.title}</h3>
                                <ul className="space-y-2">
                                    {g.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                                            <span className="text-red-500 shrink-0 mt-0.5">▸</span>{item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Repository Structure</h2>
                        <pre className="bg-black border border-gray-800 text-gray-400 p-5 rounded-lg text-xs leading-relaxed overflow-x-auto font-mono">
                            {fileTree}
                        </pre>
                    </div>

                    <div className="bg-gray-900 border border-red-900/30 rounded-xl p-6">
                        <h3 className="text-white font-bold mb-2">Why Rust Throughout</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">Almost everything is written in Rust because it is as fast as C++, memory-safe (catches bugs before they happen), and perfect for financial systems programming. When you are dealing with on-chain transactions, you want a language whose compiler is strict enough to prevent entire classes of errors before the code runs. The consistency across the stack — terminal, contracts, API, libraries — also means no context-switching between languages for contributors.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
