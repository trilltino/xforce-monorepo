export default function How() {
    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <p className="text-red-400 font-mono text-sm mb-2">HOW</p>
                <h1 className="text-5xl font-bold text-white mb-4">How does it work?</h1>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                    Four interconnected layers — data, execution, social, and developer infrastructure — built in Rust and designed to compose.
                </p>
            </div>

            <div className="space-y-6 mb-16">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded font-mono">LAYER 1</span>
                        <h2 className="text-xl font-bold text-white">Data Layer — Geyser Pipeline</h2>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        The data layer replaces RPC polling with a Yellowstone Geyser gRPC pipeline delivering sub-100ms market data directly from validator state. A multi-source fallback chain — Geyser primary, Pyth secondary, Jupiter tertiary — eliminates single points of failure on price data. Staleness detection triggers automatic failover with zero user-visible disruption.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {['Yellowstone Geyser gRPC', 'Tonic (Rust)', 'Pyth Crosschain', 'Jupiter Aggregator', 'WebSocket Streaming'].map(t => (
                            <span key={t} className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">{t}</span>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded font-mono">LAYER 2</span>
                        <h2 className="text-xl font-bold text-white">Execution Layer — Pinocchio + Jito</h2>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        The execution layer uses a Pinocchio batch swap router — zero-copy, no-std, direct SVM syscalls — achieving 30% compute unit reduction versus Anchor on complex trades, with atomic multi-DEX execution in a single transaction. Every trade is submitted via Jito bundles by default, protecting users from front-running and sandwich attacks without requiring any configuration. Phoenix CLOB integration adds spot limit orders and full order book visibility. Drift integration adds perpetual futures with margin management.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {['Pinocchio', 'Jito Bundles', 'Jupiter CPI', 'Phoenix CLOB', 'Drift Perps', 'bytemuck zero-copy'].map(t => (
                            <span key={t} className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">{t}</span>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded font-mono">LAYER 3</span>
                        <h2 className="text-xl font-bold text-white">Social Layer — Iroh + p2panda</h2>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        The social layer replaces centralised messaging with a fully decentralised P2P stack built on Iroh QUIC transport and Braid CRDT protocol for conflict-free state sync. p2panda Double Ratchet provides end-to-end encryption for direct and group messaging. Trader identity is a cryptographic Ed25519 keypair tied directly to a Solana wallet — no platform accounts, no centralised intermediary. CRDT state patches are hashed and written to Solana PDAs, anchoring local state on-chain. Bags SDK integration adds token-gating and P2P tipping.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {['Iroh QUIC', 'Braid CRDT', 'p2panda Double Ratchet', 'Ed25519 Identity', 'Solana PDAs', 'Bags SDK'].map(t => (
                            <span key={t} className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">{t}</span>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded font-mono">LAYER 4</span>
                        <h2 className="text-xl font-bold text-white">Developer Infrastructure — REST API + Rust Libs</h2>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        A comprehensive REST API exposes the full terminal stack — market data, routing logic, transaction execution — so developers can build automated strategies and bots in Python, JavaScript, or Rust without rebuilding the infrastructure underneath. Every component is packaged as a modular Rust library: lib-solana, lib-core, lib-web — documented, benchmarked, and forkable. XForce-Guide ships alongside as a Tauri companion app combining a Bloomberg-style layout with a Solana Market Concepts curriculum.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {['Axum REST API', 'lib-solana', 'lib-core', 'lib-web', 'Tauri', 'XForce-Guide'].map(t => (
                            <span key={t} className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">{t}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Full Integration Stack</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { name: 'Jupiter', role: 'Liquidity aggregation — swap routing across all Solana DEXs' },
                        { name: 'Astralane', role: 'Fast transaction landing — optimised validator submission' },
                        { name: 'Jito', role: 'MEV protection — every swap submitted as a bundle by default' },
                        { name: 'Pyth Network', role: 'Crosschain price oracle — secondary fallback on the data layer' },
                        { name: 'Phoenix', role: 'Central limit order book — spot limit orders and fill tracking' },
                        { name: 'Drift', role: 'Perpetual futures — margin management and perp execution' },
                        { name: 'Bags', role: 'Token gating + P2P tipping — social graph monetisation' },
                        { name: 'Iroh', role: 'QUIC P2P transport — NAT traversal and direct peer connections' },
                    ].map((i) => (
                        <div key={i.name} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                            <p className="text-red-400 font-bold mb-1">{i.name}</p>
                            <p className="text-gray-400 text-sm">{i.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
