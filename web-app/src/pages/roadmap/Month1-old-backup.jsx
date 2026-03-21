const roadmapItems = [
    {
        title: "Milestone 1.1 — Yellowstone Geyser gRPC Pipeline",
        items: [
            "Replace standard RPC polling with production Yellowstone Geyser gRPC pipeline",
            "Geyser gRPC client built in Rust using Tonic",
            "Account subscription filter for user-relevant accounts only (micro-indexing)",
            "Shadow state reconciliation — Geyser feed synced against RPC for consistency",
            "WebSocket streaming layer delivering real-time data to terminal UI",
            "Benchmark documented: RPC polling latency vs Geyser latency, verified in production"
        ]
    },
    {
        title: "Milestone 1.2 — Multi-Source Price Fallback Chain",
        items: [
            "Primary: Geyser real-time feeds",
            "Secondary: Pyth Network oracles",
            "Tertiary: Jupiter aggregator",
            "Automatic failover with zero user-visible disruption",
            "Staleness detection — feeds older than configurable threshold trigger fallback"
        ]
    },
    {
        title: "Milestone 1.3 — Beta v0.1.0 Release",
        items: [
            "Wallet connection: Phantom, Solflare, Backpack",
            "Real-time price feeds via Geyser pipeline",
            "Basic swap execution via Jupiter aggregator",
            "WebSocket streaming price charts",
            "JWT authentication and session management"
        ]
    },
    {
        title: "Milestone 1.4 — RPC Infrastructure Hardening",
        items: [
            "Connection pooling — 100+ concurrent RPC connections",
            "Exponential backoff retry logic across mainnet and devnet",
            "Circuit breakers — automatic failover on degraded performance",
            "Local caching of frequently accessed account data"
        ]
    }
];

const articles = [
    {
        title: "Building Sub-100ms Market Data Infrastructure on Solana",
        desc: "Complete walkthrough of replacing RPC polling with Yellowstone Geyser gRPC. Tonic client setup in Rust, account subscription filtering, shadow state reconciliation, WebSocket delivery layer. Before/after latency benchmarks and full implementation included."
    },
    {
        title: "Non-Custodial Architecture in Practice — How XForce Terminal Works",
        desc: "The architectural decisions behind a trading terminal where the application never holds user keys or funds. Wallet adapter integration, transaction signing flows, and the full threat model."
    },
    {
        title: "Multi-Source Price Feeds with Automatic Failover",
        desc: "Deep dive into the fallback chain — Geyser primary, Pyth secondary, Jupiter tertiary. Staleness detection, failover triggers, and building production-grade data reliability without centralised oracle dependency."
    }
];

export default function Month1() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full mb-4">
                    <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    MONTH 1 — Geyser Integration & Beta Release
                </h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2 font-sans">$2,500 USDC</p>
                <p className="text-lg text-gray-500 dark:text-gray-500 font-sans">
                    Sub-100ms market data delivery, multi-source price feeds, basic swap execution, RPC infrastructure hardening
                </p>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
                {roadmapItems.map((section, idx) => (
                    <div key={section.title} className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-2xl font-bold text-primary-600">{idx + 1}</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-heading">{section.title}</h2>
                        </div>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-300 font-sans">
                            {section.items.map((item, idx) => (
                                <li key={idx} className="flex items-start">
                                    <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Articles Section */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">Month 1 Articles</h2>
                    <div className="space-y-6">
                        {articles.map((article, idx) => (
                            <div key={idx} className="border-l-4 border-primary-500 pl-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Article {idx + 1}: {article.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{article.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Success Criteria */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">Month 1 Success Criteria</h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Geyser pipeline live and sub-100ms delivery benchmarked</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Beta v0.1.0 released</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>50+ downloads</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>100+ waitlist signups</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>3 articles published</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
