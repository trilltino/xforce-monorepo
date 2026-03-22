const milestones = [
    {
        id: '4.1',
        title: 'Devnet Completion',
        detail: null,
        items: [
            'All contracts verified and benchmarked on devnet — program addresses published',
            'Full benchmark suite documented: latency, CU reduction, load test results',
            'Codebase open, forkable, and fully documented — lib-solana, lib-core, lib-web ready for community use',
            'Mainnet deployment scoped and prepared — executed post-grant, self-funded',
        ],
    },
    {
        id: '4.2',
        title: 'Developer API & Ecosystem',
        detail: null,
        items: [
            'REST API live on devnet — trading operations, order management, account data',
            'Example bot integrations: Python, JavaScript, Rust',
            'Full API documentation: endpoints, authentication, rate limits, examples',
            'Developer program open — 50+ developer target for API access and lib adoption',
            'Community AMA and launch event with Superteam UK',
        ],
    },
    {
        id: '4.3',
        title: 'Community & Documentation',
        detail: null,
        items: [
            'XForce-Guide companion app shipped — Bloomberg-style layout, Solana Market Concepts curriculum',
            'In-app tutorials covering swap execution, order management, SocialFi features',
            'Full developer documentation published — architecture decisions, integration guides, contribution guide',
        ],
    },
];

const articles = [
    {
        num: 10,
        title: 'Shipping a Production Rust Trading Terminal — Architecture Decisions That Mattered',
        desc: 'The key architectural choices behind XForce Terminal — Tauri over Electron, Axum over Actix, Pinocchio over Anchor for performance-critical paths, Iroh over libp2p. Why each decision was made and what the tradeoffs were in practice.',
    },
    {
        num: 11,
        title: 'From Geyser to UI — The Complete Real-Time Data Stack',
        desc: 'The complete XForce Terminal data pipeline from validator to user interface. Every layer: Geyser gRPC subscription, filter stage, specialised parsers, Redis cache, WebSocket delivery, lightweight-charts rendering. A reference implementation for building Bloomberg-speed data pipelines on Solana.',
    },
    {
        num: 12,
        title: 'Building Open-Source Trading Infrastructure — Lessons from XForce Terminal',
        desc: 'A retrospective on building a production trading terminal in Rust over four months. Architectural decisions that worked and those that did not, security considerations for financial applications, and the experience of building in public within the Superteam ecosystem.',
    },
];

export default function Month4() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <p className="text-red-400 font-mono text-sm mb-2">625 USDC</p>
                <h1 className="text-4xl font-bold text-white mb-4">Month 4 — Devnet Completion &amp; Mainnet Readiness</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Devnet build complete and publicly verifiable. All 12 articles published. 50+ developers engaged with API or libs. Codebase forkable with complete documentation. Mainnet deployment roadmap published.
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
