export default function Guide() {
    const curriculum = [
        {
            title: 'Order Book Mechanics',
            body: 'Understand bid/ask depth, spread dynamics, and how institutional order flow moves markets. Learn to read on-chain order books on Phoenix CLOB the same way a Bloomberg trader reads Level 2 data.',
        },
        {
            title: 'Liquidity & Slippage Analysis',
            body: 'Quantify liquidity depth across Solana DEXs, model slippage at scale, and identify thin markets before entering positions. The same analysis desks run before executing block trades — applied to on-chain data.',
        },
        {
            title: 'On-Chain Data Intelligence',
            body: 'Read raw Geyser feeds, interpret account state changes, and extract signal from validator-level data. The infrastructure layer most tools hide from you — made legible and actionable.',
        },
        {
            title: 'MEV & Execution Quality',
            body: 'Understand how front-running and sandwich attacks work mechanically, how Jito bundles provide atomic protection, and how to measure execution quality against a fair-value benchmark.',
        },
        {
            title: 'DeFi Protocol Architecture',
            body: 'Deep dives into Jupiter routing, Pyth oracle mechanics, Drift margin systems, and Pinocchio program design. Not high-level overviews — the actual instruction flows, account structures, and failure modes.',
        },
        {
            title: 'Professional Workflow Patterns',
            body: 'Terminal keyboard navigation, data density configuration, multi-panel layout management, and alert systems. Bloomberg-style productivity patterns translated into the XFTerminal interface.',
        },
    ];

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <p className="text-red-400 font-mono text-sm mb-2">XFGuide</p>
                <h1 className="text-5xl font-bold text-white mb-4">
                    <span className="text-red-500">XF</span>Guide
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    Institutional-depth education for Solana. Bloomberg-style layout. Built for traders and developers who want to understand the infrastructure, not just use it.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-16">
                <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 shadow-2xl">
                    <img src={`${import.meta.env.BASE_URL}images/guide-capture-1.png`} alt="XFGuide Interface 1" className="w-full h-auto" />
                </div>
                <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 shadow-2xl">
                    <img src={`${import.meta.env.BASE_URL}images/guide-capture-2.png`} alt="XFGuide Interface 2" className="w-full h-auto" />
                </div>
            </div>

            <div className="bg-gray-900 border border-red-900/40 rounded-xl p-10 mb-12">
                <h2 className="text-3xl font-bold text-white mb-3">Institutional Depth. Open Source.</h2>
                <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                    Bloomberg Terminal costs $27,000 per year. The depth it provides — real-time data density, structured curricula, professional workflow patterns — has always been locked behind that paywall. XFGuide is the open-source answer built for Solana.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    XFGuide ships as a native Tauri desktop application alongside XFTerminal, combining a getting-started guide with a full Solana Market Concepts curriculum in a Bloomberg-style high-density interface. Every module is designed to take someone who understands traditional finance and give them the precise mental models needed to operate at a professional level on-chain — not conceptual overviews, but the actual mechanics of how Solana protocols work at the instruction level.
                </p>
            </div>

            <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Curriculum</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {curriculum.map((c, i) => (
                        <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <h3 className="text-white font-bold mb-2">{c.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{c.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-12">
                <div className="bg-gray-900 border border-red-900/30 rounded-xl p-6 text-center">
                    <p className="text-red-400 text-2xl font-black mb-2">Native</p>
                    <p className="text-white font-bold mb-1">Tauri Desktop App</p>
                    <p className="text-gray-500 text-sm">Not a web wrapper. A proper desktop application with system-level performance and keyboard-first navigation.</p>
                </div>
                <div className="bg-gray-900 border border-red-900/30 rounded-xl p-6 text-center">
                    <p className="text-red-400 text-2xl font-black mb-2">Open</p>
                    <p className="text-white font-bold mb-1">Fully Open Source</p>
                    <p className="text-gray-500 text-sm">Free for every developer in the ecosystem. Forkable, extendable, and designed to grow with community contributions.</p>
                </div>
                <div className="bg-gray-900 border border-red-900/30 rounded-xl p-6 text-center">
                    <p className="text-red-400 text-2xl font-black mb-2">Deep</p>
                    <p className="text-white font-bold mb-1">Protocol-Level Detail</p>
                    <p className="text-gray-500 text-sm">Every module goes to the instruction level — account structures, CPI flows, failure modes. No surface-level explanations.</p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-red-950/40 to-gray-900 border border-red-900/40 rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">For the 7,600+ New Solana Developers</h2>
                <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Solana displaced Ethereum as the top ecosystem for new developers in 2024 — 83% growth year-on-year. Every one of those developers needs a reference that goes deeper than documentation. XFGuide is built for them.
                </p>
            </div>
        </div>
    );
}
