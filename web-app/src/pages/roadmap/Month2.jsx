const milestones = [
    {
        id: '2.1',
        title: 'Pinocchio Batch Swap Router',
        detail: 'Convert the Anchor batch swap router to Pinocchio — zero-copy, no-std, direct SVM syscalls — achieving 30% compute unit reduction on every batch swap.',
        items: [
            'Zero-copy account deserialization using bytemuck',
            'Manual account discriminator validation and ownership checks',
            'Atomic execution across multiple DEXs in a single transaction',
            'Slippage protection at the instruction level',
            'Deploy to devnet — program address documented and verifiable',
            'CU benchmark: Anchor baseline vs Pinocchio, every swap type tested',
        ],
    },
    {
        id: '2.2',
        title: 'SocialFi Layer: Iroh P2P + Braid Protocol',
        detail: 'Replace centralised chat with a fully decentralised P2P messaging layer. Identity is an Ed25519 keypair — the same keypair as a Solana wallet. No server holds messages.',
        items: [
            'Iroh QUIC transport — NAT traversal, direct peer connections',
            'Gossip protocol for message propagation',
            'Braid CRDT-based conflict-free state sync',
            'Braid patches hashed (SHA256) and written to Solana PDA — local state anchored on-chain',
            'NodeID = Solana keypair — same Ed25519 key, no identity bridging required',
        ],
    },
    {
        id: '2.3',
        title: 'p2panda Encryption & Group Management',
        detail: null,
        items: [
            'p2panda-auth: cryptographic group management, decentralised RBAC',
            'p2panda-encryption: Double Ratchet E2EE for direct and group messaging',
            'Group creation, member addition/removal, key rotation — all on-chain verifiable',
        ],
    },
    {
        id: '2.4',
        title: 'Bags SDK Integration',
        detail: null,
        items: [
            'Token gating — earned tokens unlock advanced terminal features',
            'Tipping infrastructure — P2P value transfer between terminal users',
            'On-chain identity linked to social graph',
        ],
    },
];

const articles = [
    {
        num: 4,
        title: 'Pinocchio vs Anchor — A Complete Performance Comparison',
        desc: 'The definitive reference for understanding the performance difference between Anchor and Pinocchio. Zero-copy deserialization, direct syscall usage, Anchor discriminator overhead removal, manual account validation patterns. Full batch swap router implementation, CU benchmarks for every operation, and a migration guide.',
    },
    {
        num: 5,
        title: 'Building a Decentralised SocialFi Layer with Iroh and Braid',
        desc: 'How to replace centralised messaging with a P2P stack running in a Tauri desktop application. Iroh QUIC transport, gossip propagation, Braid CRDT sync, Ed25519 NodeIDs mapped to Solana keypairs, CRDT patches anchored on-chain via PDAs. Full Rust implementation.',
    },
    {
        num: 6,
        title: 'End-to-End Encryption in Rust — p2panda Double Ratchet Implementation',
        desc: 'Practical guide to implementing the Signal Double Ratchet protocol in Rust using p2panda. Key generation, ratchet advancement, group key management via RBAC, integration with Iroh transport. Full threat model explained.',
    },
];

export default function Month2() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <p className="text-red-400 font-mono text-sm mb-2">625 USDC</p>
                <h1 className="text-4xl font-bold text-white mb-4">Month 2 — Pinocchio Optimisation &amp; SocialFi Layer</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Pinocchio batch swap router on devnet, 30% CU reduction verified. SocialFi layer live in Beta v0.2.0. E2EE operational. 20+ developer signups. 3 articles published.
                </p>
            </div>

            <div className="space-y-6 mb-16">
                {milestones.map((m) => (
                    <div key={m.id} className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded font-mono">{m.id}</span>
                            <h2 className="text-xl font-bold text-white">{m.title}</h2>
                        </div>
                        {m.detail && <p className="text-gray-400 text-sm mb-4 border-l-2 border-red-600 pl-4">{m.detail}</p>}
                        <ul className="space-y-2">
                            {m.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                    <span className="text-red-500 mt-1 shrink-0">▸</span>{item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-800 pt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Articles</h2>
                <div className="space-y-4">
                    {articles.map((a) => (
                        <div key={a.num} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <p className="text-red-400 text-xs font-mono mb-1">Article {a.num}</p>
                            <h3 className="text-white font-bold mb-2">{a.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
