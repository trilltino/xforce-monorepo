import { Link } from 'react-router-dom';

export default function Who() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <Link to="/5ws" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-500 mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to 5Ws and H
                </Link>
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    Who
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    The founder, problem, and ecosystem behind XForce Terminal
                </p>
            </div>

            <div className="space-y-8">
                {/* Founder */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">The Founder</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                        Solo developer from London building professional-grade DeFi infrastructure as a comprehensive portfolio piece demonstrating production-ready Solana development skills. The project represents a deep technical investment in Solana's ecosystem infrastructure.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Technical Expertise</h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2 mt-1">•</span>
                                    <span>Rust systems programming with Tauri, Axum, and Pinocchio frameworks</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2 mt-1">•</span>
                                    <span>Full-stack development with React, TypeScript, and modern web technologies</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2 mt-1">•</span>
                                    <span>DeFi protocol integration and smart contract development on Solana</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2 mt-1">•</span>
                                    <span>P2P infrastructure with Iroh, Braid CRDT, and cryptographic protocols</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Project Vision</h3>
                            <p className="text-gray-600 dark:text-gray-300 font-sans">
                                Building the open infrastructure layer that Solana trading has been missing — not just a trading interface, but a comprehensive reference architecture that raises the technical floor for the entire ecosystem.
                            </p>
                        </div>
                    </div>
                </div>

                {/* The Problem */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">The Problem</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-6">
                        The Solana DeFi ecosystem lacks professional-grade native trading infrastructure. Every serious tool is web-based — constrained by browser performance, dependent on centralised RPC providers, and fragmented across platforms that were never designed to work together.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Current Limitations</h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2 mt-1">•</span>
                                    <span>Browser performance constraints for latency-sensitive trading</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2 mt-1">•</span>
                                    <span>RPC polling delays (2-5 seconds) unacceptable in fast markets</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2 mt-1">•</span>
                                    <span>No MEV protection by default — users exposed to front-running</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2 mt-1">•</span>
                                    <span>Fragmented tools with no unified foundation for developers</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Developer Pain Points</h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2 mt-1">•</span>
                                    <span>No open reference stack for algorithmic trading strategies</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2 mt-1">•</span>
                                    <span>Every serious builder starts from scratch</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2 mt-1">•</span>
                                    <span>Market data, execution, and risk controls exist as separate pieces</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2 mt-1">•</span>
                                    <span>Low-latency validator feeds locked behind advanced infrastructure</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Competition Analysis */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Competition Gap</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-6">
                        Existing tools are web-first by design — and that is precisely their limitation. They deliver data dashboards but no execution layer, no open infrastructure, no developer primitives to build on.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Birdeye & Photon</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Data dashboards only</p>
                            <div className="text-xs text-red-500">No execution layer</div>
                            <div className="text-xs text-red-500">No open infrastructure</div>
                        </div>
                        <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Axiom</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Browser swap aggregation</p>
                            <div className="text-xs text-yellow-600">Casual use only</div>
                            <div className="text-xs text-red-500">Not open source</div>
                        </div>
                        <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Phantom Swap</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Wallet feature</p>
                            <div className="text-xs text-yellow-600">Not a trading terminal</div>
                            <div className="text-xs text-red-500">No developer primitives</div>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg">
                        <p className="text-primary-800 dark:text-primary-200 font-medium text-center">
                            <strong>XForce Terminal</strong> is what they would have built if the foundation had existed.
                        </p>
                    </div>
                </div>

                {/* Market Demand */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Market Demand</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-6">
                        The demand is not hypothetical — it is on-chain and verifiable. Solana processed <strong>$1.5 trillion in DEX volume in 2025</strong>, up 57% year-on-year, averaging <strong>3.2 million daily active wallets</strong>.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3">Existing Market</h3>
                            <ul className="space-y-2 text-green-700 dark:text-green-300 font-sans">
                                <li>• Millions of active wallets already trading</li>
                                <li>• Billions in daily volume processed</li>
                                <li>• Proven user base that is already here</li>
                                <li>• This is not a market to be built — it exists at scale</li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-3">Missing Infrastructure</h3>
                            <ul className="space-y-2 text-blue-700 dark:text-blue-300 font-sans">
                                <li>• No open, native infrastructure for professional trading</li>
                                <li>• All wallets trading through browser interfaces</li>
                                <li>• No MEV protection by default</li>
                                <li>• No low-latency data or programmable execution layer</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                            XForce Terminal is built for that user base — <strong>the infrastructure arrives first, traction follows.</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
