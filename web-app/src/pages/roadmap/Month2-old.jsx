const roadmapItems = [
    {
        title: "Advanced Features & Beta v0.2.0 Release",
        icon: "⚡",
        items: [
            "Integrate AI assistant using rust-genai (DeepSeek, OpenAI, Anthropic, Gemini support)",
            "Enhance SociaFI messaging with full CRDT implementation and conflict resolution",
            "Advanced charting: candlestick charts, technical indicators, multiple timeframes",
            "Portfolio analytics: P&L tracking, performance metrics, trade history analysis",
            "Batch swap router contract deployment and integration"
        ]
    },
    {
        title: "REST API Development",
        icon: "🔌",
        items: [
            "Design and implement REST API endpoints for trading operations",
            "Example trading bot integrations (Python, JavaScript, Rust)"
        ]
    },
    {
        title: "Software Development & Performance",
        icon: "💻",
        items: [
            "Address Beta v0.1.0 user feedback and bug fixes",
            "Performance optimizations: reduce memory footprint, improve WebSocket latency",
            "Code review, dependency scanning",
            "Enhanced error handling and user feedback systems"
        ]
    },
    {
        title: "Community Growth & Partnerships",
        icon: "🌱",
        items: [
            "Launch developer program with API access for early adopters",
            "Engage with Solana developer communities (SuperteamUK)"
        ]
    },
    {
        title: "Documentation & Content",
        icon: "📝",
        items: [
            "API documentation: endpoints, authentication, rate limits, examples",
            "Developer guide: building trading bots, integrating with XForce Terminal",
            "Publish 3 technical blog posts: Building Trading Bots, CRDT Conflict Resolution, Rust-GenAI Integration"
        ]
    }
];

export default function Month2() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full mb-4">
                    <span className="text-white font-bold text-2xl">2</span>
                </div>
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    Milestone 2 - Month 2
                </h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2 font-sans">$2,500</p>
                <p className="text-lg text-gray-500 dark:text-gray-500 font-sans">
                    Advanced features, API infrastructure, community growth, and ecosystem integration
                </p>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
                {roadmapItems.map((section) => (
                    <div key={section.title} className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-2xl">{section.icon}</span>
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

                {/* Metrics & Success Criteria */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">Metrics</h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                            <li className="flex items-center"><span className="text-primary-500 mr-2">•</span>API integrations: 3+ trading bots</li>
                            <li className="flex items-center"><span className="text-primary-500 mr-2">•</span>Developer signups: 20+ developers</li>
                            <li className="flex items-center"><span className="text-primary-500 mr-2">•</span>Blog posts: 3 published</li>
                            <li className="flex items-center"><span className="text-primary-500 mr-2">•</span>Beta v0.2.0 released</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">Success Criteria</h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>REST API functional with documentation</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>AI assistant integrated and functional</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
