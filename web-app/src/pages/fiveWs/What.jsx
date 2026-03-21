import { Link } from 'react-router-dom';

export default function What() {
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
                    What
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    The comprehensive solution: XForce Terminal and ecosystem infrastructure
                </p>
            </div>

            <div className="space-y-8">
                {/* Main Solution */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">XForce Terminal</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-6">
                        A native Rust desktop trading terminal built with Tauri — non-custodial, fully open source, and designed from the ground up for performance that web interfaces cannot match. This is not just a trading interface; it is the open infrastructure layer Solana trading has been missing.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Core Architecture</h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-1">✓</span>
                                    <div>
                                        <strong>Native Desktop Performance</strong><br/>
                                        Tauri-based desktop application with Bloomberg-style layout
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-1">✓</span>
                                    <div>
                                        <strong>Non-Custodial Design</strong><br/>
                                        Application never holds user keys or funds
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-1">✓</span>
                                    <div>
                                        <strong>Modular Library Architecture</strong><br/>
                                        lib-solana, lib-core, lib-web for ecosystem reuse
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-1">✓</span>
                                    <div>
                                        <strong>Comprehensive REST API</strong><br/>
                                        Full terminal stack exposed for automated strategies
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Differentiators</h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2 mt-1">◆</span>
                                    <div>
                                        <strong>Sub-100ms Market Data</strong><br/>
                                        Yellowstone Geyser gRPC pipeline vs 2-5s RPC polling
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2 mt-1">◆</span>
                                    <div>
                                        <strong>30% CU Reduction</strong><br/>
                                        Pinocchio zero-copy contracts vs Anchor framework
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2 mt-1">◆</span>
                                    <div>
                                        <strong>Baseline MEV Protection</strong><br/>
                                        Jito bundles by default, not optional configuration
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2 mt-1">◆</span>
                                    <div>
                                        <strong>Decentralised Social Layer</strong><br/>
                                        P2P messaging with cryptographic identity
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Technical Stack Breakdown */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Technical Infrastructure</h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Data Layer */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">Data Layer</h3>
                            <ul className="space-y-2 text-blue-700 dark:text-blue-300 font-sans text-sm">
                                <li>• <strong>Yellowstone Geyser</strong> - Sub-100ms validator feeds</li>
                                <li>• <strong>Multi-source Fallback</strong> - Geyser → Pyth → Jupiter</li>
                                <li>• <strong>WebSocket Streaming</strong> - Real-time UI updates</li>
                                <li>• <strong>Shadow State Sync</strong> - Geyser ↔ RPC consistency</li>
                                <li>• <strong>Connection Pooling</strong> - 100+ concurrent RPC</li>
                                <li>• <strong>Circuit Breakers</strong> - Automatic failover</li>
                            </ul>
                        </div>

                        {/* Execution Layer */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">Execution Layer</h3>
                            <ul className="space-y-2 text-green-700 dark:text-green-300 font-sans text-sm">
                                <li>• <strong>Pinocchio Router</strong> - Zero-copy batch swaps</li>
                                <li>• <strong>30% CU Reduction</strong> - Direct SVM syscalls</li>
                                <li>• <strong>Atomic Multi-DEX</strong> - Single transaction execution</li>
                                <li>• <strong>Jito Bundle API</strong> - MEV protection by default</li>
                                <li>• <strong>Dynamic Tip Estimation</strong> - Transaction urgency</li>
                                <li>• <strong>Slippage Protection</strong> - Instruction-level control</li>
                            </ul>
                        </div>

                        {/* Social Layer */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4">Social Layer</h3>
                            <ul className="space-y-2 text-purple-700 dark:text-purple-300 font-sans text-sm">
                                <li>• <strong>Iroh QUIC Transport</strong> - P2P direct connections</li>
                                <li>• <strong>Braid CRDT Protocol</strong> - Conflict-free sync</li>
                                <li>• <strong>p2panda E2EE</strong> - Double Ratchet encryption</li>
                                <li>• <strong>On-chain Anchoring</strong> - CRDT patches to PDAs</li>
                                <li>• <strong>Cryptographic Identity</strong> - Ed25519 = Solana keypair</li>
                                <li>• <strong>Bags Integration</strong> - Token gating & tipping</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Ecosystem Applications */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Ecosystem Applications</h2>
                    
                    <div className="space-y-6">
                        {/* XForce-Guide */}
                        <div className="border-l-4 border-primary-500 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">XForce-Guide</h3>
                            <p className="text-gray-600 dark:text-gray-300 font-sans mb-3">
                                Native Tauri desktop application — Bloomberg-style layout, A4 document design, built in React and TypeScript. A getting started guide and Solana Market Concepts certification curriculum in one place.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm">Desktop Application</span>
                                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm">Educational Content</span>
                                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm">Certification</span>
                            </div>
                        </div>

                        {/* Integrations */}
                        <div className="border-l-4 border-green-500 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Core Integrations</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Infrastructure Partners</h4>
                                    <ul className="space-y-1 text-gray-600 dark:text-gray-300 font-sans text-sm">
                                        <li>• <strong>Astralane</strong> - Transaction landing infrastructure</li>
                                        <li>• <strong>Jupiter</strong> - Deepest liquidity on Solana</li>
                                        <li>• <strong>Pyth Crosschain</strong> - Institutional oracle network</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Protocol Stack</h4>
                                    <ul className="space-y-1 text-gray-600 dark:text-gray-300 font-sans text-sm">
                                        <li>• <strong>Geyser</strong> - Direct validator data pipeline</li>
                                        <li>• <strong>Pinocchio</strong> - Below-framework smart contracts</li>
                                        <li>• <strong>Bags</strong> - Token-gating and P2P tipping</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Developer API */}
                        <div className="border-l-4 border-blue-500 pl-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Developer Infrastructure</h3>
                            <p className="text-gray-600 dark:text-gray-300 font-sans mb-3">
                                Comprehensive REST API exposes the full terminal stack — market data, routing logic, transaction execution — so developers can build automated strategies and bots in any language without rebuilding the infrastructure underneath.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">REST API</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Full programmatic access</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">Bot Examples</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Python, JS, Rust</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Open Source</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Apache 2.0 License</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Open Source Commitment */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4 text-center">Open Source Foundation</h2>
                    <p className="text-primary-700 dark:text-primary-300 font-sans text-center mb-6">
                        Every component is open source. The modular Rust library architecture gives the ecosystem production-ready patterns for data pipelines, smart contract integration, and P2P infrastructure.
                    </p>
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-lg font-bold text-primary-800 dark:text-primary-200">lib-solana</div>
                            <div className="text-sm text-primary-600 dark:text-primary-400">Solana integration</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-primary-800 dark:text-primary-200">lib-core</div>
                            <div className="text-sm text-primary-600 dark:text-primary-400">Core utilities</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-primary-800 dark:text-primary-200">lib-web</div>
                            <div className="text-sm text-primary-600 dark:text-primary-400">Web components</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-primary-800 dark:text-primary-200">12 Articles</div>
                            <div className="text-sm text-primary-600 dark:text-primary-400">Technical documentation</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
