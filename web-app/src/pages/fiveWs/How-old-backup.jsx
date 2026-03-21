export default function How() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    How
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    Technology stack, architecture, and implementation details
                </p>
            </div>

            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Technical Implementation Details</h2>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Geyser Pipeline (Month 1)</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans mb-6">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>gRPC Client:</strong> Rust Tonic client connecting to Yellowstone Geyser for sub-100ms streaming
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Micro-Indexing:</strong> Account subscription filters for user-relevant accounts only
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Shadow Reconciliation:</strong> Geyser feed synced against RPC for consistency verification
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>WebSocket Layer:</strong> Real-time data delivery to terminal UI via tokio-tungstenite
                        </li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Pinocchio Optimization (Month 2)</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans mb-6">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Zero-Copy:</strong> bytemuck for account deserialization, no-std compilation
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Direct Syscalls:</strong> SVM syscalls without Anchor discriminator overhead
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Manual Validation:</strong> Account ownership checks and discriminator validation
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Atomic Execution:</strong> Multiple DEX swaps in single transaction with slippage protection
                        </li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">SocialFi Layer (Month 2)</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans mb-6">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Iroh Transport:</strong> QUIC with NAT traversal for direct peer connections
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Braid CRDT:</strong> Conflict-free state sync with gossip protocol propagation
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>On-Chain Anchoring:</strong> SHA256 hashed patches written to Solana PDA
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>p2panda E2EE:</strong> Double Ratchet encryption for direct and group messaging
                        </li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">MEV Protection (Month 3)</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Jito Searcher Client:</strong> Rust integration for bundle submission
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Atomic Bundles:</strong> Transactions executed atomically preventing front-running
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Dynamic Tipping:</strong> Tip estimation based on transaction urgency
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Baseline Behavior:</strong> Every trade protected by default, not optional
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Technology Stack</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Backend</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Rust with Axum framework, PostgreSQL with SQLx, JWT authentication with Argon2</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Desktop Terminal</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Tauri v2 with React 18 and TypeScript, Tailwind CSS, lightweight-charts</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Web Wallet</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">React 18 with TypeScript, Solana Wallet Adapter, Tailwind CSS</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Smart Contracts</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Anchor framework with Rust, Pinocchio for optimization</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">News Service</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Python scraper with NLTK/VADER sentiment analysis, React frontend</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">WebSocket</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">tokio-tungstenite for real-time price feeds</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Architecture Highlights</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Modular Library Crates:</strong> lib-auth, lib-core, lib-solana, lib-utils, lib-web for clean separation
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Yellowstone Geyser:</strong> gRPC streaming via Tonic in Rust, replacing RPC polling for sub-100ms delivery
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Multi-Source Price Feeds:</strong> Geyser primary → Pyth secondary → Jupiter tertiary with automatic failover
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Pinocchio Optimization:</strong> Zero-copy account deserialization via bytemuck, direct SVM syscalls, 30% CU reduction
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Iroh P2P:</strong> QUIC transport with NAT traversal, Braid CRDT for state sync, Ed25519 NodeIDs
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Jito MEV Protection:</strong> Searcher Client integration, bundle-based atomic execution
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Development Approach</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Test-Driven:</strong> Unit tests for every instruction, integration tests for full flows, property-based fuzz testing
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Security-First:</strong> Manual account validation, CPI safety checks, public audit report
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Performance-Benchmarked:</strong> CU comparisons, latency measurements, load testing to 38,000+ RPS
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Documentation-Driven:</strong> 12 technical articles documenting architecture decisions
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Devnet-First:</strong> All features tested on devnet before mainnet, 1,000+ test transactions logged
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Integration Architecture</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border-l-4 border-primary-500 pl-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Trading Terminal Flow</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Terminal → Geyser (market data) → Jupiter (quotes) → Pinocchio contracts (execution) → Jito (MEV protection) → Solana</p>
                        </div>
                        <div className="border-l-4 border-primary-500 pl-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">News Service Flow</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">RSS/APIs → Python scraper → PostgreSQL → Sentiment analysis → React frontend → Terminal display</p>
                        </div>
                        <div className="border-l-4 border-primary-500 pl-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">P2P Messaging Flow</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Iroh transport → Braid CRDT sync → SHA256 patch hashing → Solana PDA anchoring → E2EE via p2panda</p>
                        </div>
                        <div className="border-l-4 border-primary-500 pl-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">API Access</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">REST API with JWT auth → Rate limiting → Market data endpoints → Trading operation endpoints</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Build & Deploy</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Rust Build:</strong> cargo build --release with workspace configuration
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Database:</strong> SQLx migrate run for schema management
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Contract Deploy:</strong> anchor deploy --provider.cluster devnet/mainnet
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Frontend Deploy:</strong> Vite build, GitHub Pages hosting
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Desktop App:</strong> cargo tauri build for cross-platform binaries
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
