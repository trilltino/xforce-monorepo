import { Link } from 'react-router-dom';

export default function Why() {
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
                    Why Solana?
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    The strategic choice and ecosystem advantages that make Solana the ideal foundation
                </p>
            </div>

            <div className="space-y-8">
                {/* Main Rationale */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">The Strategic Foundation</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-6 text-lg">
                        Solana already has the largest retail trading base of any chain — millions of active wallets, billions in daily volume, a proven user base that is already here. The ecosystem has the primitives to serve that demand at an institutional level. What it lacks is the unified open infrastructure layer to connect them — and that is exactly what XForce Terminal builds.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">Existing Strengths</h3>
                            <ul className="space-y-3 text-green-700 dark:text-green-300 font-sans">
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2 mt-1">✓</span>
                                    <span><strong>Largest Retail Base</strong> - Millions of active wallets already trading daily</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2 mt-1">✓</span>
                                    <span><strong>Massive Volume</strong> - $1.5 trillion DEX volume in 2025, up 57% YoY</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2 mt-1">✓</span>
                                    <span><strong>Institutional Primitives</strong> - Phoenix, Drift, Jupiter, Jito ready</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2 mt-1">✓</span>
                                    <span><strong>Technical Foundation</strong> - High throughput, low costs, finality</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">Missing Infrastructure</h3>
                            <ul className="space-y-3 text-blue-700 dark:text-blue-300 font-sans">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1">◆</span>
                                    <span><strong>Unified Data Layer</strong> - No sub-100ms market data infrastructure</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1">◆</span>
                                    <span><strong>Professional Execution</strong> - No MEV-protected batch routing</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1">◆</span>
                                    <span><strong>Developer Stack</strong> - No open reference architecture</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1">◆</span>
                                    <span><strong>Social Integration</strong> - No decentralised identity layer</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Market Metrics */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">On-Chain Reality Check</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-6">
                        The demand is not hypothetical — it is on-chain and verifiable. These are not projections; this is the current state of the Solana ecosystem.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-700">
                            <div className="text-3xl font-bold text-purple-800 dark:text-purple-200 mb-2">$1.5T</div>
                            <div className="text-purple-700 dark:text-purple-300 font-sans">DEX Volume 2025</div>
                            <div className="text-sm text-purple-600 dark:text-purple-400 mt-1">↑ 57% YoY</div>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700">
                            <div className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-2">3.2M</div>
                            <div className="text-blue-700 dark:text-blue-300 font-sans">Daily Active Wallets</div>
                            <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">Proven user base</div>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700">
                            <div className="text-3xl font-bold text-green-800 dark:text-green-200 mb-2">65K</div>
                            <div className="text-green-700 dark:text-green-300 font-sans">TPS Capacity</div>
                            <div className="text-sm text-green-600 dark:text-green-400 mt-1">Institutional scale</div>
                        </div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-700">
                        <p className="text-yellow-800 dark:text-yellow-200 font-medium text-center">
                            <strong>Key Insight:</strong> This is not a market to be built — it already exists at scale. The infrastructure arrives first, traction follows.
                        </p>
                    </div>
                </div>

                {/* Technical Advantages */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Technical Architecture Fit</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-6">
                        Solana's technical architecture uniquely enables the performance characteristics required for professional-grade trading infrastructure.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Performance Characteristics</h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                                    <li>• <strong>Sub-second finality</strong> - Critical for trading operations</li>
                                    <li>• <strong>65K TPS capacity</strong> - Handles institutional throughput</li>
                                    <li>• <strong>Millisecond latency</strong> - Enables real-time strategies</li>
                                    <li>• <strong>Parallel execution</strong> - Sealevel runtime efficiency</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Cost Efficiency</h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                                    <li>• <strong>Low transaction costs</strong> - Enables micro-trading strategies</li>
                                    <li>• <strong>Efficient compute units</strong> - Pinocchio optimization impact</li>
                                    <li>• <strong>Storage economics</strong> - On-chain data anchoring feasible</li>
                                    <li>• <strong>Network effects</strong> - Liquidity begets more liquidity</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ecosystem Maturity */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Ecosystem Readiness</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-6">
                        Solana has the primitives to support institutional-grade trading. The ecosystem just hasn't built the infrastructure layer to unlock them — until now.
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Data Infrastructure</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Yellowstone Geyser</li>
                                <li>• Pyth Network</li>
                                <li>• Jupiter Aggregator</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Trading Protocols</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Phoenix CLOB</li>
                                <li>• Drift Perps</li>
                                <li>• Serum DEXes</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">MEV Infrastructure</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Jito Bundle API</li>
                                <li>• Searcher Clients</li>
                                <li>• Validator MEV</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Developer Tools</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Anchor Framework</li>
                                <li>• Pinocchio Programs</li>
                                <li>• Rust SDK</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Social Infrastructure</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Iroh P2P</li>
                                <li>• Braid CRDT</li>
                                <li>• Bags Protocol</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Community Support</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Superteam Ecosystem</li>
                                <li>• Developer Grants</li>
                                <li>• Technical Documentation</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* The Opportunity */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4 text-center">The XForce Opportunity</h2>
                    <p className="text-primary-700 dark:text-primary-300 font-sans text-center mb-6">
                        XForce Terminal is not competing with existing protocols — it is the missing infrastructure layer that connects them into a cohesive, professional-grade trading stack.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-2">Connect</div>
                            <div className="text-primary-600 dark:text-primary-400">Unify existing primitives</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-2">Optimize</div>
                            <div className="text-primary-600 dark:text-primary-400">Extract maximum performance</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-2">Open Source</div>
                            <div className="text-primary-600 dark:text-primary-400">Raise ecosystem technical floor</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
