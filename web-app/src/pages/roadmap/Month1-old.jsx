const roadmapItems = [
    {
        title: "UI/UX Enhancements & Minimal Beta Release",
        icon: "🎨",
        items: [
            "Polish core trading interface (terminal, wallet, transactions screens)",
            "Release minimal Beta v0.1.0 with core features: authentication, wallet connection, basic swaps, real-time price feeds, messaging and batch swapping",
            "Performance optimizations for Beta release"
        ]
    },
    {
        title: "SuperteamUK Participation",
        icon: "🤝",
        items: [
            "Attend SuperteamUK events in London",
            "Present XForce Terminal demos",
            "Network with Solana developers and ecosystem participants",
            "Collect feedback and potential partnerships"
        ]
    },
    {
        title: "Documentation & Content",
        icon: "📚",
        items: [
            "Complete usage manual covering installation, wallet setup, trading workflows, and troubleshooting",
            "Complete feature manual documenting all Beta features, keyboard shortcuts, and advanced functionality",
            "Publish 3 technical blog posts: Building Native DeFi Apps with Rust, Non-Custodial Architecture, CRDT-Based Messaging"
        ]
    },
    {
        title: "Waitlist & Community Building",
        icon: "👥",
        items: [
            "Launch waitlist signup page",
            "Implement waitlist management system",
            "Create landing page with Beta signup CTA"
        ]
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
                    Milestone 1 - Month 1
                </h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2 font-sans">$2,500</p>
                <p className="text-lg text-gray-500 dark:text-gray-500 font-sans">
                    UI/UX polish, minimal Beta release, community engagement, and documentation
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
                            <li className="flex items-center"><span className="text-primary-500 mr-2">•</span>Beta downloads: 50+ users</li>
                            <li className="flex items-center"><span className="text-primary-500 mr-2">•</span>Waitlist signups: 100+ signups</li>
                            <li className="flex items-center"><span className="text-primary-500 mr-2">•</span>Blog posts: 3 published</li>
                            <li className="flex items-center"><span className="text-primary-500 mr-2">•</span>Documentation completed</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">Success Criteria</h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Beta v0.1.0 released with core functionality</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Active community engagement</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
