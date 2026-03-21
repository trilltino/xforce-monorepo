export default function Where() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    Where
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    Location, deployment targets, and infrastructure
                </p>
            </div>

            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Blockchain Deployment</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border-l-4 border-primary-500 pl-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Solana Devnet</h3>
                            <p className="text-gray-600 dark:text-gray-300">Development and testing environment throughout the 4-month roadmap. All contracts tested here before mainnet deployment.</p>
                        </div>
                        <div className="border-l-4 border-primary-500 pl-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Solana Mainnet</h3>
                            <p className="text-gray-600 dark:text-gray-300">Production deployment target for Month 4. All program addresses will be published publicly.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Physical Location</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                        Based in London, United Kingdom, with active participation in the SuperteamUK ecosystem.
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            London-based developer with access to SuperteamUK events and mentorship
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Community AMA and launch event planned with SuperteamUK
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Infrastructure</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Frontend</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">GitHub Pages hosting for web wallet and documentation sites</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Backend API</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Self-hosted Axum server with PostgreSQL database</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Desktop Terminal</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Tauri-based application distributed via GitHub releases</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Smart Contracts</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Deployed on Solana validator network with 99.9% uptime</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Integration Partners</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Jupiter:</strong> DEX aggregation and liquidity routing across all major Solana markets
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Pyth Network:</strong> Institutional price oracles for secondary price feeds
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Yellowstone Geyser:</strong> Real-time validator data pipeline for sub-100ms delivery
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Jito:</strong> MEV protection through bundle-based transaction submission
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Phoenix:</strong> Central Limit Order Book for spot trading
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Drift:</strong> Perpetual futures trading with margin management
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Distribution</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            GitHub: Source code repositories and releases
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            GitHub Pages: Web wallet and documentation
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Solana Explorer: Verified program deployments and transactions
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            SuperteamUK: Community events and developer outreach
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
