export default function Who() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    Who
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    The team and ecosystem behind XForce Terminal
                </p>
            </div>

            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Developer</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                        Solo developer from London building professional-grade DeFi infrastructure. The project is developed as a comprehensive portfolio piece demonstrating production-ready Solana development skills.
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-center">
                            <span className="text-primary-500 mr-2">•</span>
                            Rust expertise with Tauri, Axum, and Anchor frameworks
                        </li>
                        <li className="flex items-center">
                            <span className="text-primary-500 mr-2">•</span>
                            Full-stack development with React and TypeScript
                        </li>
                        <li className="flex items-center">
                            <span className="text-primary-500 mr-2">•</span>
                            DeFi protocol integration and smart contract development
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Ecosystem Partners</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">SuperteamUK</h3>
                            <p className="text-gray-600 dark:text-gray-300">London-based Solana community providing mentorship, networking, and ecosystem support throughout the development process.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Integrations</h3>
                            <p className="text-gray-600 dark:text-gray-300">Building on top of Solana infrastructure from Jupiter, Pyth, Yellowstone Geyser, Jito, Phoenix, and Drift protocols.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Target Users</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Retail Traders</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Non-custodial trading with institutional-grade tools</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">DeFi Developers</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">API access and open-source reference implementations</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Institutions</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Self-hosted solutions with audit-ready codebase</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
