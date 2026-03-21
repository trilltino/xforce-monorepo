import { Link } from 'react-router-dom';

export default function How() {
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
                    How
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    Technical architecture, implementation strategy, and development approach
                </p>
            </div>

            <div className="space-y-8">
                {/* Technical Architecture */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Technical Architecture</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-6">
                        XForce Terminal is built with a modular, performance-first architecture using Rust systems programming and modern web technologies. Every component is designed for maximum performance and ecosystem reusability.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Core Technology Stack</h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                                <li className="flex items-start">
                                    <span className="text-orange-500 mr-2 mt-1">🦀</span>
                                    <div>
                                        <strong>Rust Systems Programming</strong><br/>
                                        <span className="text-sm">Tauri for desktop, Axum for backend, Pinocchio for contracts</span>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2 mt-1">⚛️</span>
                                    <div>
                                        <strong>React + TypeScript</strong><br/>
                                        <span className="text-sm">Modern frontend with Vite, TailwindCSS, and responsive design</span>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-1">🔗</span>
                                    <div>
                                        <strong>Solana Native Integration</strong><br/>
                                        <span className="text-sm">Direct RPC calls, Geyser gRPC, Jupiter aggregator, Jito bundles</span>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-500 mr-2 mt-1">🌐</span>
                                    <div>
                                        <strong>P2P Infrastructure</strong><br/>
                                        <span className="text-sm">Iroh QUIC transport, Braid CRDT sync, p2panda E2EE</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Modular Library Design</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                                    <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">lib-solana</h4>
                                    <p className="text-blue-700 dark:text-blue-300 font-sans text-sm">
                                        Solana-specific integrations, RPC clients, Geyser pipeline, contract interfaces
                                    </p>
                                </div>
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                                    <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">lib-core</h4>
                                    <p className="text-green-700 dark:text-green-300 font-sans text-sm">
                                        Core utilities, data structures, authentication, error handling, logging
                                    </p>
                                </div>
                                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                                    <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">lib-web</h4>
                                    <p className="text-purple-700 dark:text-purple-300 font-sans text-sm">
                                        Web components, API servers, WebSocket handlers, React integrations
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Optimizations */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Performance Optimizations</h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg border border-red-200 dark:border-red-700">
                            <div className="text-3xl font-bold text-red-800 dark:text-red-200 mb-2">&lt;100ms</div>
                            <h3 className="text-lg font-bold text-red-700 dark:text-red-300 mb-2">Market Data Latency</h3>
                            <p className="text-red-600 dark:text-red-400 font-sans text-sm">
                                Yellowstone Geyser gRPC pipeline replaces 2-5s RPC polling
                            </p>
                        </div>
                        
                        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700">
                            <div className="text-3xl font-bold text-green-800 dark:text-green-200 mb-2">-30%</div>
                            <h3 className="text-lg font-bold text-green-700 dark:text-green-300 mb-2">Compute Unit Reduction</h3>
                            <p className="text-green-600 dark:text-green-400 font-sans text-sm">
                                Pinocchio zero-copy contracts vs Anchor framework
                            </p>
                        </div>
                        
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700">
                            <div className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-2">100%</div>
                            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">MEV Protection</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-sans text-sm">
                                Jito bundle submission by default, not optional
                            </p>
                        </div>
                    </div>
                </div>

                {/* Development Methodology */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Development Methodology</h2>
                    
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Build in Public Approach</h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                                    <li>• <strong>Open Source Development:</strong> All code publicly visible on GitHub</li>
                                    <li>• <strong>Technical Documentation:</strong> 12 articles sharing implementation details</li>
                                    <li>• <strong>Community Engagement:</strong> Regular updates and ecosystem feedback</li>
                                    <li>• <strong>Reference Architecture:</strong> Production-ready patterns for ecosystem reuse</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Testing & Quality Assurance</h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                                    <li>• <strong>Comprehensive Testing:</strong> 80%+ test coverage across all crates</li>
                                    <li>• <strong>Property-Based Testing:</strong> Fuzz testing for arithmetic edge cases</li>
                                    <li>• <strong>Integration Testing:</strong> Full swap flows and P2P message propagation</li>
                                    <li>• <strong>Security Review:</strong> Community peer review via Superteam UK</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-700">
                            <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">Milestone-Driven Development</h3>
                            <p className="text-yellow-700 dark:text-yellow-300 font-sans mb-4">
                                Each month delivers concrete, verifiable milestones with clear success criteria:
                            </p>
                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="font-bold text-yellow-800 dark:text-yellow-200">Month 1</div>
                                    <div className="text-sm text-yellow-600 dark:text-yellow-400">Infrastructure</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-yellow-800 dark:text-yellow-200">Month 2</div>
                                    <div className="text-sm text-yellow-600 dark:text-yellow-400">Optimization</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-yellow-800 dark:text-yellow-200">Month 3</div>
                                    <div className="text-sm text-yellow-600 dark:text-yellow-400">Advanced Trading</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-yellow-800 dark:text-yellow-200">Month 4</div>
                                    <div className="text-sm text-yellow-600 dark:text-yellow-400">Launch Ready</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Implementation Strategy */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Implementation Strategy</h2>
                    
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Data Pipeline Implementation</h3>
                                <ol className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                                    <li><strong>1. Geyser Client Setup:</strong> Rust Tonic client with account filtering</li>
                                    <li><strong>2. Shadow State Sync:</strong> Geyser ↔ RPC consistency verification</li>
                                    <li><strong>3. Fallback Chain:</strong> Automatic failover Geyser → Pyth → Jupiter</li>
                                    <li><strong>4. WebSocket Layer:</strong> Real-time data streaming to UI</li>
                                    <li><strong>5. Performance Monitoring:</strong> Latency benchmarking and optimization</li>
                                </ol>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Smart Contract Development</h3>
                                <ol className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                                    <li><strong>1. Anchor to Pinocchio Migration:</strong> Zero-copy deserialization</li>
                                    <li><strong>2. Manual Account Validation:</strong> Direct SVM syscalls</li>
                                    <li><strong>3. Batch Execution Logic:</strong> Atomic multi-DEX transactions</li>
                                    <li><strong>4. Slippage Protection:</strong> Instruction-level controls</li>
                                    <li><strong>5. Devnet Deployment:</strong> Program verification and testing</li>
                                </ol>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">P2P Social Layer Architecture</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                                    <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">Transport Layer</h4>
                                    <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                                        <li>• Iroh QUIC protocol</li>
                                        <li>• NAT traversal</li>
                                        <li>• Direct peer connections</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-700">
                                    <h4 className="font-bold text-cyan-800 dark:text-cyan-200 mb-2">Sync Layer</h4>
                                    <ul className="text-sm text-cyan-700 dark:text-cyan-300 space-y-1">
                                        <li>• Braid CRDT protocol</li>
                                        <li>• Conflict-free resolution</li>
                                        <li>• On-chain anchoring</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                                    <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">Security Layer</h4>
                                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                                        <li>• p2panda Double Ratchet</li>
                                        <li>• End-to-end encryption</li>
                                        <li>• Cryptographic identity</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success Metrics */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4 text-center">Success Metrics & Verification</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-2">50+</div>
                            <div className="text-primary-600 dark:text-primary-400">Downloads</div>
                            <div className="text-sm text-primary-500 dark:text-primary-500">Beta adoption</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-2">100+</div>
                            <div className="text-primary-600 dark:text-primary-400">Waitlist Signups</div>
                            <div className="text-sm text-primary-500 dark:text-primary-500">Community interest</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-2">50+</div>
                            <div className="text-primary-600 dark:text-primary-400">Developers</div>
                            <div className="text-sm text-primary-500 dark:text-primary-500">API engagement</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-2">1K+</div>
                            <div className="text-primary-600 dark:text-primary-400">Devnet Transactions</div>
                            <div className="text-sm text-primary-500 dark:text-primary-500">Testing volume</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
