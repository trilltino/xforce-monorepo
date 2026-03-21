const roadmapItems = [
    {
        title: "Mainnet Beta Deployment",
        icon: "🚀",
        items: [
            "Deploy smart contracts to Solana mainnet",
            "Launch mainnet Beta v1.0.0",
            "Open access to all waitlist members",
            "Monitor and optimize mainnet performance"
        ]
    },
    {
        title: "Production Infrastructure",
        icon: "⚙️",
        items: [
            "Production-grade server infrastructure",
            "High-availability architecture",
            "Real-time monitoring and alerting",
            "Automated backup and recovery systems"
        ]
    },
    {
        title: "User Onboarding & Support",
        icon: "🎓",
        items: [
            "Comprehensive user onboarding flow",
            "In-app tutorials and tooltips",
            "FAQ and help center",
            "Community support channels"
        ]
    },
    {
        title: "Launch Marketing",
        icon: "📣",
        items: [
            "Official mainnet launch announcement",
            "Press releases and media coverage",
            "Social media campaigns",
            "Community AMAs and events"
        ]
    }
];

export default function Month4() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full mb-4">
                    <span className="text-white font-bold text-2xl">4</span>
                </div>
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    Milestone 4 - Month 4
                </h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2 font-sans">$2,500</p>
                <p className="text-lg text-gray-500 dark:text-gray-500 font-sans">
                    Mainnet Beta Deployment & Production Launch
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

                {/* Launch Success */}
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 border border-primary-500 rounded-xl p-8 shadow-lg text-center">
                    <h3 className="text-3xl font-bold text-white mb-4 font-heading">🎉 Production Launch</h3>
                    <p className="text-xl text-primary-100 mb-6 font-sans">
                        XForce Terminal goes live on Solana Mainnet!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="px-6 py-3 bg-white/20 rounded-lg">
                            <p className="text-3xl font-bold text-white">100%</p>
                            <p className="text-sm text-primary-100">Open Source</p>
                        </div>
                        <div className="px-6 py-3 bg-white/20 rounded-lg">
                            <p className="text-3xl font-bold text-white">24/7</p>
                            <p className="text-sm text-primary-100">Support</p>
                        </div>
                        <div className="px-6 py-3 bg-white/20 rounded-lg">
                            <p className="text-3xl font-bold text-white">0%</p>
                            <p className="text-sm text-primary-100">Custodial Risk</p>
                        </div>
                    </div>
                </div>

                {/* Final Metrics */}
                <div className="grid md:grid-cols-4 gap-4">
                    {[
                        { label: "Total Users", value: "500+" },
                        { label: "Transactions", value: "10,000+" },
                        { label: "Developers", value: "50+" },
                        { label: "Uptime", value: "99.9%" }
                    ].map((metric) => (
                        <div key={metric.label} className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-6 text-center shadow-lg">
                            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{metric.value}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
