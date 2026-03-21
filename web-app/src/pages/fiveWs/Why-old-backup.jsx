export default function Why() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    Why
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    The motivations and goals behind XForce Terminal
                </p>
            </div>

            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Problem Statement</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                        Retail DeFi traders face significant disadvantages compared to institutional players:
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            High latency on public RPC (2-5 seconds vs sub-100ms for institutions)
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            MEV extraction through front-running and sandwich attacks
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Custody risks with centralized exchanges
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Lack of professional-grade tools and order management
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Fragmented information across multiple platforms
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Solution Goals</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border-l-4 border-primary-500 pl-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Non-Custodial</h3>
                            <p className="text-gray-600 dark:text-gray-300">Users maintain full control of their private keys. The application never holds user funds or keys.</p>
                        </div>
                        <div className="border-l-4 border-primary-500 pl-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Institutional Speed</h3>
                            <p className="text-gray-600 dark:text-gray-300">Yellowstone Geyser integration delivers sub-100ms market data, matching professional trading infrastructure.</p>
                        </div>
                        <div className="border-l-4 border-primary-500 pl-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">MEV Protection</h3>
                            <p className="text-gray-600 dark:text-gray-300">Jito bundle-based transactions protect every trade from front-running and sandwich attacks by default.</p>
                        </div>
                        <div className="border-l-4 border-primary-500 pl-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Cost Efficiency</h3>
                            <p className="text-gray-600 dark:text-gray-300">Pinocchio-optimized contracts achieve 30% compute unit reduction, translating to lower fees on every trade.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Philosophy</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Self-Custody is Non-Negotiable:</strong> Users should never have to trust third parties with their assets
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Performance Matters:</strong> Every millisecond counts in trading; retail deserves the same speed as institutions
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Transparency:</strong> All contracts are open source, audited, and verifiable on-chain
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Build in Public:</strong> Development progress shared through articles and community engagement
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <strong>Developer Education:</strong> Reference implementations and documentation to grow the ecosystem
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Value Proposition</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                        For traders who want professional-grade DeFi tools without compromising on custody:
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Bloomberg-style terminal experience with real-time data
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Atomic batch swaps for better execution and lower fees
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Built-in news aggregation and sentiment analysis
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            P2P messaging with E2EE encryption for trader communities
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            API access for algorithmic trading and bot development
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Long-term Vision</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                        Establish XForce Terminal as the premier open-source trading infrastructure for Solana:
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Reference implementation for DeFi developers learning Solana
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Community-driven improvement through open source contributions
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Ecosystem of bots, plugins, and integrations built on the API
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Self-hosted option for institutions requiring full control
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
