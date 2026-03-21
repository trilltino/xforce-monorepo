export default function Demand() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    Market Demand
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    Quantified demand for open-source Solana infrastructure
                </p>
            </div>

            <div className="space-y-8">
                {/* Foundation Recognition */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-8 shadow-lg">
                    <div className="flex items-start mb-6">
                        <div className="text-4xl mr-4">🏛️</div>
                        <div>
                            <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-4 font-heading">Solana Foundation Recognition</h2>
                            <p className="text-blue-700 dark:text-blue-300 font-sans text-lg mb-4">
                                The Solana Foundation's own <strong>Indexer Tooling RFP</strong> acknowledged that Geyser "does not provide an ergonomic end-to-end solution for developers" — XForce Terminal's Milestone 1.1 is that solution: a production Rust Geyser pipeline, open source and forkable.
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-600">
                        <p className="text-blue-800 dark:text-blue-200 font-medium">
                            <strong>Official Gap Identified:</strong> Foundation acknowledges lack of ergonomic Geyser solutions
                        </p>
                        <p className="text-blue-700 dark:text-blue-300 text-sm mt-2">
                            <strong>XForce Terminal Response:</strong> Production-ready Geyser pipeline with developer-friendly API
                        </p>
                    </div>
                </div>

                {/* Bot Development Reality */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-2 border-red-300 dark:border-red-700 rounded-xl p-8 shadow-lg">
                    <div className="flex items-start mb-6">
                        <div className="text-4xl mr-4">🤖</div>
                        <div>
                            <h2 className="text-3xl font-bold text-red-800 dark:text-red-200 mb-4 font-heading">Bot Development Reality Check</h2>
                            <p className="text-red-700 dark:text-red-300 font-sans text-lg mb-4">
                                Bot development guides are blunter: <strong>"if your bot is reading from a public RPC, you're already late"</strong> — XForce Terminal fixes this at the infrastructure level and exposes it via a REST API with Python, JavaScript, and Rust bot integrations, so the next developer doesn't rebuild the data layer from scratch.
                            </p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                            <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">❌ Current Problem</h3>
                            <p className="text-red-700 dark:text-red-300 text-sm">
                                Public RPC = Already 200ms behind validators, missing critical price updates between polling intervals
                            </p>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                            <h3 className="font-bold text-green-800 dark:text-green-200 mb-2">✓ XForce Solution</h3>
                            <p className="text-green-700 dark:text-green-300 text-sm">
                                Sub-100ms Geyser pipeline + REST API + Bot examples in Python, JS, Rust
                            </p>
                        </div>
                    </div>
                </div>

                {/* Co-location Gap Quantified */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-8 shadow-lg">
                    <div className="flex items-start mb-6">
                        <div className="text-4xl mr-4">⚡</div>
                        <div>
                            <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-200 mb-4 font-heading">The Co-location Gap Quantified</h2>
                            <p className="text-purple-700 dark:text-purple-300 font-sans text-lg mb-4">
                                Bots on public RPC are already <strong>200ms behind validators</strong>, missing price updates that arrive between polling intervals — the XForce Terminal data stack (Geyser primary, Pyth secondary, Jupiter tertiary with automatic failover) gives any developer access to infrastructure previously requiring advanced operator setup.
                            </p>
                        </div>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-lg">
                        <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-4 text-xl">Multi-Source Fallback Chain</h3>
                        <div className="flex items-center justify-center space-x-4 text-purple-700 dark:text-purple-300">
                            <div className="text-center">
                                <div className="bg-purple-200 dark:bg-purple-800 rounded-lg p-4 mb-2">
                                    <div className="font-bold text-lg">Primary</div>
                                    <div className="text-sm">Geyser</div>
                                </div>
                                <div className="text-xs">&lt;100ms</div>
                            </div>
                            <div className="text-2xl">→</div>
                            <div className="text-center">
                                <div className="bg-purple-200 dark:bg-purple-800 rounded-lg p-4 mb-2">
                                    <div className="font-bold text-lg">Secondary</div>
                                    <div className="text-sm">Pyth</div>
                                </div>
                                <div className="text-xs">Institutional</div>
                            </div>
                            <div className="text-2xl">→</div>
                            <div className="text-center">
                                <div className="bg-purple-200 dark:bg-purple-800 rounded-lg p-4 mb-2">
                                    <div className="font-bold text-lg">Tertiary</div>
                                    <div className="text-sm">Jupiter</div>
                                </div>
                                <div className="text-xs">Aggregator</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Developer Growth */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-300 dark:border-green-700 rounded-xl p-8 shadow-lg">
                    <div className="flex items-start mb-6">
                        <div className="text-4xl mr-4">👨‍💻</div>
                        <div>
                            <h2 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-4 font-heading">Rapidly Expanding Developer Cohort</h2>
                            <p className="text-green-700 dark:text-green-300 font-sans text-lg mb-4">
                                Solana displaced Ethereum as the top ecosystem for new developers in 2024, with <strong>7,625 new developers joining (83% growth)</strong> — all of whom need open reference architecture to build on.
                            </p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-6 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <div className="text-4xl font-bold text-green-800 dark:text-green-200 mb-2">7,625</div>
                            <div className="text-green-700 dark:text-green-300 font-semibold">New Developers</div>
                            <div className="text-green-600 dark:text-green-400 text-sm mt-1">Joined in 2024</div>
                        </div>
                        <div className="text-center p-6 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <div className="text-4xl font-bold text-green-800 dark:text-green-200 mb-2">83%</div>
                            <div className="text-green-700 dark:text-green-300 font-semibold">Growth Rate</div>
                            <div className="text-green-600 dark:text-green-400 text-sm mt-1">Year-over-year</div>
                        </div>
                        <div className="text-center p-6 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <div className="text-4xl font-bold text-green-800 dark:text-green-200 mb-2">#1</div>
                            <div className="text-green-700 dark:text-green-300 font-semibold">Ecosystem Rank</div>
                            <div className="text-green-600 dark:text-green-400 text-sm mt-1">Displaced Ethereum</div>
                        </div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-600">
                        <p className="text-green-800 dark:text-green-200 font-medium">
                            <strong>XForce Terminal is that reference:</strong> Every component ships as a modular Rust library, documented, benchmarked, and production-ready.
                        </p>
                    </div>
                </div>

                {/* Market Volume */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-2 border-orange-300 dark:border-orange-700 rounded-xl p-8 shadow-lg">
                    <div className="flex items-start mb-6">
                        <div className="text-4xl mr-4">📊</div>
                        <div>
                            <h2 className="text-3xl font-bold text-orange-800 dark:text-orange-200 mb-4 font-heading">On-Chain Market Reality</h2>
                            <p className="text-orange-700 dark:text-orange-300 font-sans text-lg mb-4">
                                Solana processed <strong>$1.5 trillion in DEX volume in 2025</strong>, up 57% year-on-year, averaging <strong>3.2 million daily active wallets</strong> — the demand is out there for solid open source infrastructure.
                            </p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-orange-100 dark:bg-orange-900/30 p-6 rounded-lg text-center">
                            <div className="text-5xl font-bold text-orange-800 dark:text-orange-200 mb-2">$1.5T</div>
                            <div className="text-orange-700 dark:text-orange-300 font-semibold text-lg mb-1">DEX Volume 2025</div>
                            <div className="text-orange-600 dark:text-orange-400">↑ 57% Year-over-Year</div>
                        </div>
                        <div className="bg-orange-100 dark:bg-orange-900/30 p-6 rounded-lg text-center">
                            <div className="text-5xl font-bold text-orange-800 dark:text-orange-200 mb-2">3.2M</div>
                            <div className="text-orange-700 dark:text-orange-300 font-semibold text-lg mb-1">Daily Active Wallets</div>
                            <div className="text-orange-600 dark:text-orange-400">Average Trading Volume</div>
                        </div>
                    </div>
                </div>

                {/* Key Insight */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl p-8 shadow-lg">
                    <div className="text-center">
                        <div className="text-4xl mb-4">💡</div>
                        <h2 className="text-3xl font-bold text-yellow-800 dark:text-yellow-200 mb-4 font-heading">The Infrastructure Gap</h2>
                        <p className="text-yellow-700 dark:text-yellow-300 font-sans text-xl mb-4">
                            <strong>The market exists. The demand is verified. The infrastructure is missing.</strong>
                        </p>
                        <p className="text-yellow-600 dark:text-yellow-400 font-sans text-lg">
                            XForce Terminal delivers the open-source foundation that 7,625 new developers need to build on $1.5 trillion in trading volume.
                        </p>
                    </div>
                </div>

                {/* References */}
                <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">References & Sources</h2>
                    <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Solana Foundation Indexer Tooling RFP</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                Official acknowledgment that Geyser lacks ergonomic developer solutions
                            </p>
                            <a 
                                href="https://forum.solana.com/t/indexer-tooling/2059" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline text-sm break-all"
                            >
                                https://forum.solana.com/t/indexer-tooling/2059
                            </a>
                        </div>

                        <div className="border-l-4 border-green-500 pl-4">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">RPC Fast — Solana Trading Bot Guide 2026</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                Industry guidance on RPC limitations and bot infrastructure requirements
                            </p>
                            <a 
                                href="https://rpcfast.com/blog/solana-trading-bot-guide" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-green-600 dark:text-green-400 hover:underline text-sm break-all"
                            >
                                https://rpcfast.com/blog/solana-trading-bot-guide
                            </a>
                        </div>

                        <div className="border-l-4 border-purple-500 pl-4">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">RPC Fast — Solana Arbitrage Bot Setup</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                Technical documentation on latency requirements for competitive trading
                            </p>
                            <a 
                                href="https://rpcfast.com/blog/solana-arbitrage-bot-setup" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-purple-600 dark:text-purple-400 hover:underline text-sm break-all"
                            >
                                https://rpcfast.com/blog/solana-arbitrage-bot-setup
                            </a>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Helius H1 2025 Ecosystem Report</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                Comprehensive data on Solana developer growth and market metrics
                            </p>
                            <a 
                                href="https://www.helius.dev/blog/solana-ecosystem-report-h1-2025" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-orange-600 dark:text-orange-400 hover:underline text-sm break-all"
                            >
                                https://www.helius.dev/blog/solana-ecosystem-report-h1-2025
                            </a>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 rounded-xl p-8 text-center">
                    <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4">The Opportunity is Clear</h2>
                    <p className="text-primary-700 dark:text-primary-300 font-sans text-lg mb-6">
                        Foundation-acknowledged gap + 7,625 new developers + $1.5T trading volume = Verified demand for XForce Terminal's open infrastructure.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="/xfterminal/roadmap" 
                            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
                        >
                            View Development Roadmap
                        </a>
                        <a 
                            href="/xfterminal/integrations" 
                            className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
                        >
                            Explore Integrations
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
