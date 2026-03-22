import { Link } from 'react-router-dom';

const components = [
    { title: 'Geyser Data Pipeline', body: 'Yellowstone Geyser gRPC pipeline replacing RPC polling — sub-100ms market data delivered directly from validator state. Multi-source fallback chain (Geyser → Pyth → Jupiter) eliminates single points of failure.' },
    { title: 'Pinocchio Batch Swap Router', body: 'Zero-copy, no-std Solana program using direct SVM syscalls. 30% compute unit reduction versus Anchor on every batch swap. Atomic multi-DEX execution in a single transaction with slippage protection at the instruction level.' },
    { title: 'Jito MEV Protection', body: 'Every trade submitted via Jito bundles by default. Atomic execution prevents front-running and sandwich attacks without any user configuration required.' },
    { title: 'Decentralised SocialFi Layer', body: 'P2P messaging via Iroh QUIC transport and Braid CRDT protocol. End-to-end encryption via p2panda Double Ratchet. Trader identity is an Ed25519 keypair tied directly to a Solana wallet — no centralised server holds messages or controls access.' },
    { title: 'REST API', body: 'Full terminal stack exposed via REST — market data, routing logic, transaction execution. Bot integrations in Python, JavaScript, and Rust. Developers can build automated strategies without rebuilding the infrastructure underneath.' },
    { title: 'Modular Rust Libraries', body: 'lib-solana, lib-core, lib-web — every component ships as a documented, benchmarked, forkable Rust library. Production-ready patterns for data pipelines, smart contract integration, and P2P infrastructure.' },
];

export default function What() {
    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <p className="text-red-400 font-mono text-sm mb-2">WHAT</p>
                <h1 className="text-5xl font-bold text-white mb-4">What is XForce Terminal?</h1>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                    An open-source native Rust trading terminal for Solana — replacing browser-based tools with a high-performance desktop stack built on Geyser, Pinocchio, Jito, and Iroh. The open infrastructure layer Solana trading has been missing.
                </p>
            </div>

            <div className="bg-gradient-to-br from-red-950/40 to-gray-900 border border-red-900/40 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-white mb-3">Project Summary</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                    XForce Terminal is an open-source native Rust trading terminal for Solana — replacing browser-based tools with a high-performance desktop stack built on Geyser, Pinocchio, Jito, and Iroh. The grant funds a 4-month devnet build delivering a reusable Geyser data pipeline, a Pinocchio batch swap router with verified 30% CU reduction, and a decentralised P2P SocialFi layer — all open source, all forkable.
                </p>
                <p className="text-gray-300 leading-relaxed">
                    Every component ships as a modular Rust library giving the ecosystem production-ready infrastructure patterns to build on. Twelve technical articles published throughout the build open-source the learnings for the wider Solana developer community.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
                {components.map((c, i) => (
                    <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <h3 className="text-white font-bold mb-2">{c.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{c.body}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
