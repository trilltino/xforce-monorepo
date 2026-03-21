import { Link } from 'react-router-dom';

export default function Month2() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <Link to="/roadmap" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-500 mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Roadmap
                </Link>
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    Month 2
                </h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2 font-sans">625 USDC</p>
                <p className="text-xl text-gray-500 dark:text-gray-500 font-sans">
                    Pinocchio Optimisation & SocialFi Layer
                </p>
            </div>

            {/* Success Criteria */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200">Success Criteria</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Pinocchio batch swap router on devnet, 30% CU reduction verified</li>
                    <li>SocialFi layer live in Beta v0.2.0</li>
                    <li>E2EE operational</li>
                    <li>20+ developer signups</li>
                    <li>3 articles published</li>
                </ul>
            </div>

            {/* Milestones */}
            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 2.1 — Pinocchio Batch Swap Router</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Convert the Anchor batch swap router to Pinocchio — zero-copy, no-std, direct SVM syscalls — achieving 30% compute unit reduction on every batch swap.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Zero-copy account deserialization using bytemuck</li>
                        <li>Manual account discriminator validation and ownership checks</li>
                        <li>Atomic execution across multiple DEXs in a single transaction</li>
                        <li>Slippage protection at the instruction level</li>
                        <li>Deploy to devnet — program address documented and verifiable</li>
                        <li>CU benchmark: Anchor baseline vs Pinocchio, every swap type tested</li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 2.2 — SocialFi Layer: Iroh P2P + Braid Protocol</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Replace centralised chat with a fully decentralised P2P messaging layer. Identity is an Ed25519 keypair — the same keypair as a Solana wallet. No server holds messages.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Iroh QUIC transport — NAT traversal, direct peer connections</li>
                        <li>Gossip protocol for message propagation</li>
                        <li>Braid CRDT-based conflict-free state sync</li>
                        <li>Braid patches hashed (SHA256) and written to Solana PDA — local state anchored on-chain</li>
                        <li>NodeID = Solana keypair — same Ed25519 key, no identity bridging required</li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 2.3 — p2panda Encryption & Group Management</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>p2panda-auth: cryptographic group management, decentralised RBAC</li>
                        <li>p2panda-encryption: Double Ratchet E2EE for direct and group messaging</li>
                        <li>Group creation, member addition/removal, key rotation — all on-chain verifiable</li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 2.4 — Bags SDK Integration</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Token gating — earned tokens unlock advanced terminal features</li>
                        <li>Tipping infrastructure — P2P value transfer between terminal users</li>
                        <li>On-chain identity linked to social graph</li>
                    </ul>
                </div>
            </div>

            {/* Articles */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Month 2 Articles</h2>
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Article 4: Pinocchio vs Anchor — A Complete Performance Comparison</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            The definitive reference for understanding the performance difference between Anchor and Pinocchio. Zero-copy deserialization, direct syscall usage, Anchor discriminator overhead removal, manual account validation patterns. Full batch swap router implementation, CU benchmarks for every operation, and a migration guide.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Article 5: Building a Decentralised SocialFi Layer with Iroh and Braid</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            How to replace centralised messaging with a P2P stack running in a Tauri desktop application. Iroh QUIC transport, gossip propagation, Braid CRDT sync, Ed25519 NodeIDs mapped to Solana keypairs, CRDT patches anchored on-chain via PDAs. Full Rust implementation.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Article 6: End-to-End Encryption in Rust — p2panda Double Ratchet Implementation</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Practical guide to implementing the Signal Double Ratchet protocol in Rust using p2panda. Key generation, ratchet advancement, group key management via RBAC, integration with Iroh transport. Full threat model explained.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
