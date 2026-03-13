const roadmapItems = [
    {
        title: "Devnet Deployment & Testing",
        icon: "🧪",
        items: [
            "Deploy smart contracts to Solana devnet",
            "Comprehensive testing: unit tests, integration tests, security audits",
            "Load testing and performance benchmarking",
            "Bug fixes and stability improvements"
        ]
    },
    {
        title: "Security Hardening",
        icon: "🔒",
        items: [
            "Security audit of smart contracts",
            "Penetration testing of REST API",
            "Code review and vulnerability assessment",
            "Implement security best practices"
        ]
    },
    {
        title: "Production Readiness",
        icon: "🏭",
        items: [
            "Infrastructure setup for production deployment",
            "Monitoring and alerting systems",
            "Backup and disaster recovery procedures",
            "Production deployment documentation"
        ]
    },
    {
        title: "Community & Marketing",
        icon: "📢",
        items: [
            "Beta testing program with community feedback",
            "Marketing campaigns for upcoming mainnet launch",
            "Partnership announcements",
            "Educational content and tutorials"
        ]
    }
];

export default function Month3() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full mb-4">
                    <span className="text-white font-bold text-2xl">3</span>
                </div>
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    Milestone 3 - Month 3
                </h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2 font-sans">$2,500</p>
                <p className="text-lg text-gray-500 dark:text-gray-500 font-sans">
                    Devnet deployment, contract testing, security hardening, and production readiness
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
                            <li className="flex items-center"><span className="text-primary-500 mr-2">•</span>Test coverage: 80%+</li>
                            <li className="flex items-center"><span className="text-primary-500 mr-2">•</span>Security audit: completed</li>
                            <li className="flex items-center"><span className="text-primary-500 mr-2">•</span>Beta testers: 100+ active</li>
                            <li className="flex items-center"><span className="text-primary-500 mr-2">•</span>Devnet transactions: 1000+</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">Success Criteria</h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Smart contracts deployed and tested on devnet</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Security audit passed with no critical issues</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
