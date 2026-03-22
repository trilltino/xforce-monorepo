const milestones = [
    {
        id: '3.1',
        title: 'Phoenix CLOB & Drift Perps Integration',
        detail: null,
        items: [
            'Phoenix CLOB: spot limit orders, order book visualisation, fill tracking',
            'Drift: perpetual futures with margin management',
            'Unified order management across spot and perps',
            'Advanced charting: candlestick, technical indicators, multiple timeframes',
        ],
    },
    {
        id: '3.2',
        title: 'Jito MEV Protection',
        detail: null,
        items: [
            'Jito Searcher Client integration in Rust',
            'Bundle-based transaction submission — atomic execution preventing MEV extraction',
            'Dynamic tip estimation based on transaction urgency',
            'MEV protection documented and verifiable on devnet — bundle inclusion confirmed',
        ],
    },
    {
        id: '3.3',
        title: 'Security Review & Test Infrastructure',
        detail: null,
        items: [
            'Community peer review of Pinocchio batch swap router via Superteam UK developer network — findings published publicly',
            'cargo-audit dependency scan — supply chain vulnerabilities documented and resolved',
            'Unit tests covering every program instruction and account constraint',
            'Integration tests — full swap flows, SocialFi message propagation, P2P connections',
            'Property-based fuzz testing for arithmetic edge cases',
            '80%+ test coverage across all crates',
            '1,000+ devnet transactions logged and verifiable',
        ],
    },
];

const articles = [
    {
        num: 7,
        title: 'MEV on Solana — How Front-Running Works and How Jito Stops It',
        desc: 'Technical explanation of MEV extraction on Solana — sandwich attacks, front-running, how validators and searchers extract value. Jito architecture, bundle submission via Searcher Client API, tip estimation, and full Rust integration.',
    },
    {
        num: 8,
        title: 'Smart Contract Security on Solana — A Pinocchio Audit Walkthrough',
        desc: 'What to look for when auditing a Pinocchio program. Common vulnerability classes — missing signer checks, unconstrained account ownership, arithmetic overflow, CPI reentrancy — and how they manifest differently in Pinocchio vs Anchor. Walks through the XForce Terminal audit findings and fixes.',
    },
    {
        num: 9,
        title: 'Order Book Architecture — Integrating Phoenix CLOB in a Rust Terminal',
        desc: 'How to integrate Phoenix into a Rust desktop application. Phoenix program architecture, order placement and cancellation via CPI, order book state streaming via Geyser, P&L calculation from fill history. Full integration implementation included.',
    },
];

export default function Month3() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <p className="text-red-400 font-mono text-sm mb-2">625 USDC</p>
                <h1 className="text-4xl font-bold text-white mb-4">Month 3 — Advanced Trading &amp; Security</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Phoenix and Drift integrated on devnet. Jito MEV protection live and verified. Peer review published. 80%+ test coverage. 1,000+ devnet transactions.
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
