const milestones = [
    {
        id: '1.1',
        title: 'Yellowstone Geyser gRPC Pipeline',
        items: [
            'Geyser gRPC client built in Rust using Tonic',
            'Account subscription filter for user-relevant accounts only (micro-indexing)',
            'Shadow state reconciliation — Geyser feed synced against RPC for consistency',
            'WebSocket streaming layer delivering real-time data to terminal UI',
            'Benchmark documented: RPC polling latency vs Geyser latency, verified in production',
        ],
        detail: 'Replace standard RPC polling with a production Yellowstone Geyser gRPC pipeline. Current RPC polling delivers market data in 2–5 seconds. Geyser delivers sub-100ms streaming directly from validator state.',
    },
    {
        id: '1.2',
        title: 'Multi-Source Price Fallback Chain',
        items: [
            'Primary: Geyser real-time feeds',
            'Secondary: Pyth Network oracles',
            'Tertiary: Jupiter aggregator',
            'Automatic failover with zero user-visible disruption',
            'Staleness detection — feeds older than configurable threshold trigger fallback',
        ],
        detail: null,
    },
    {
        id: '1.3',
        title: 'Beta v0.1.0 Release',
        items: [
            'Wallet connection: Phantom, Solflare, Backpack',
            'Real-time price feeds via Geyser pipeline',
            'Basic swap execution via Jupiter aggregator',
            'WebSocket streaming price charts',
            'JWT authentication and session management',
        ],
        detail: null,
    },
    {
        id: '1.4',
        title: 'RPC Infrastructure Hardening',
        items: [
            'Connection pooling — 100+ concurrent RPC connections',
            'Exponential backoff retry logic across mainnet and devnet',
            'Circuit breakers — automatic failover on degraded performance',
            'Local caching of frequently accessed account data',
        ],
        detail: null,
    },
];

const articles = [
    {
        num: 1,
        title: 'Building Sub-100ms Market Data Infrastructure on Solana',
        desc: 'Complete walkthrough of replacing RPC polling with Yellowstone Geyser gRPC. Tonic client setup in Rust, account subscription filtering, shadow state reconciliation, WebSocket delivery layer. Before/after latency benchmarks and full implementation included.',
    },
    {
        num: 2,
        title: 'Non-Custodial Architecture in Practice — How XForce Terminal Works',
        desc: 'The architectural decisions behind a trading terminal where the application never holds user keys or funds. Wallet adapter integration, transaction signing flows, and the full threat model.',
    },
    {
        num: 3,
        title: 'Multi-Source Price Feeds with Automatic Failover',
        desc: 'Deep dive into the fallback chain — Geyser primary, Pyth secondary, Jupiter tertiary. Staleness detection, failover triggers, and building production-grade data reliability without centralised oracle dependency.',
    },
];

export default function Month1() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <p className="text-red-400 font-mono text-sm mb-2">625 USDC</p>
                <h1 className="text-4xl font-bold text-white mb-4">Month 1 — Geyser Integration &amp; Beta Release</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Geyser pipeline live and sub-100ms delivery benchmarked. Beta v0.1.0 released. 50+ downloads. 100+ waitlist signups. 3 articles published.
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
