export default function Demo() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    Demo
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    Experience XForce Terminal's capabilities
                </p>
            </div>

            <div className="space-y-8">
                {/* Demo Overview */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Interactive Demonstrations</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-8">
                        Explore the key features and technical capabilities of XForce Terminal through these interactive demonstrations.
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Market Data Demo */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-4">📊</div>
                            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-3">Sub-100ms Market Data</h3>
                            <p className="text-blue-700 dark:text-blue-300 font-sans mb-4">
                                Experience real-time market data streaming via Yellowstone Geyser with sub-100ms latency.
                            </p>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                Launch Demo
                            </button>
                        </div>

                        {/* Batch Swap Demo */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-4">🔄</div>
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3">Pinocchio Batch Swaps</h3>
                            <p className="text-green-700 dark:text-green-300 font-sans mb-4">
                                Test the 30% compute unit reduction with zero-copy batch swap execution.
                            </p>
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                Launch Demo
                            </button>
                        </div>

                        {/* MEV Protection Demo */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-4">🛡️</div>
                            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-3">MEV Protection</h3>
                            <p className="text-purple-700 dark:text-purple-300 font-sans mb-4">
                                See how Jito bundle submission protects against front-running and sandwich attacks.
                            </p>
                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                Launch Demo
                            </button>
                        </div>

                        {/* P2P Messaging Demo */}
                        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 border border-cyan-200 dark:border-cyan-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-4">💬</div>
                            <h3 className="text-xl font-bold text-cyan-800 dark:text-cyan-200 mb-3">P2P Social Layer</h3>
                            <p className="text-cyan-700 dark:text-cyan-300 font-sans mb-4">
                                Try the decentralized messaging with Iroh P2P and end-to-end encryption.
                            </p>
                            <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                Launch Demo
                            </button>
                        </div>

                        {/* Trading Interface Demo */}
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-4">📈</div>
                            <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200 mb-3">Trading Interface</h3>
                            <p className="text-orange-700 dark:text-orange-300 font-sans mb-4">
                                Explore the Bloomberg-style terminal interface with advanced charting.
                            </p>
                            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                Launch Demo
                            </button>
                        </div>

                        {/* API Demo */}
                        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-4">🔌</div>
                            <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-3">Developer API</h3>
                            <p className="text-red-700 dark:text-red-300 font-sans mb-4">
                                Test the REST API with automated trading strategies and bot integration.
                            </p>
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                Launch Demo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Live Performance Metrics */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Live Performance Metrics</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-8">
                        Real-time performance benchmarks comparing XForce Terminal against traditional web-based solutions.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                                &lt;100ms
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Data Latency</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                vs 2-5s for RPC polling
                            </p>
                        </div>
                        
                        <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                -30%
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Compute Usage</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                Pinocchio vs Anchor
                            </p>
                        </div>
                        
                        <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                100%
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">MEV Protection</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                Jito bundles by default
                            </p>
                        </div>
                    </div>
                </div>

                {/* Technical Demonstrations */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Technical Deep Dives</h2>
                    
                    <div className="space-y-6">
                        <div className="border-l-4 border-blue-500 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Geyser Data Pipeline</h3>
                            <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                                Watch the Yellowstone Geyser gRPC pipeline in action, delivering market data directly from validator state with sub-100ms latency.
                            </p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                                <div className="text-green-600 dark:text-green-400">✓ Geyser Connected</div>
                                <div className="text-blue-600 dark:text-blue-400">→ Streaming SOL/USDC</div>
                                <div className="text-yellow-600 dark:text-yellow-400">⚡ Latency: 87ms</div>
                            </div>
                        </div>

                        <div className="border-l-4 border-green-500 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Contract Execution</h3>
                            <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                                See the Pinocchio batch swap router executing multiple DEX trades in a single transaction with 30% CU reduction.
                            </p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                                <div className="text-green-600 dark:text-green-400">✓ Pinocchio Router</div>
                                <div className="text-blue-600 dark:text-blue-400">→ 5 Swaps Executed</div>
                                <div className="text-yellow-600 dark:text-yellow-400">⚡ CU: 210,300 (-30%)</div>
                            </div>
                        </div>

                        <div className="border-l-4 border-purple-500 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">P2P Message Propagation</h3>
                            <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                                Observe decentralized messages propagating through the Iroh P2P network with Braid CRDT synchronization.
                            </p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                                <div className="text-green-600 dark:text-green-400">✓ Iroh Network</div>
                                <div className="text-blue-600 dark:text-blue-400">→ 12 Nodes Connected</div>
                                <div className="text-yellow-600 dark:text-yellow-400">⚡ Sync: Real-time</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Getting Started */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4 text-center">Ready to Experience XForce Terminal?</h2>
                    <p className="text-primary-700 dark:text-primary-300 font-sans text-center mb-6">
                        Try the live demo or download the beta version to start trading with institutional-grade tools.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                            Launch Live Demo
                        </button>
                        <button className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-semibold py-3 px-8 rounded-lg transition-colors">
                            Download Beta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
