import { Link } from 'react-router-dom';

export default function Where() {
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
                    Where
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    Platform deployment, ecosystem integration, and community presence
                </p>
            </div>

            <div className="space-y-8">
                {/* Digital Presence */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Digital Ecosystem</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Web Presence</h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2 mt-1">🌐</span>
                                    <div>
                                        <strong>Project Webpage</strong><br/>
                                        <a href="https://trilltino.github.io/xfterminal/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                                            trilltino.github.io/xfterminal
                                        </a><br/>
                                        <span className="text-sm">Showcasing project, founder, architecture, and roadmap</span>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-1">📚</span>
                                    <div>
                                        <strong>Documentation</strong><br/>
                                        Comprehensive technical documentation and integration guides
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-500 mr-2 mt-1">📖</span>
                                    <div>
                                        <strong>12 Technical Articles</strong><br/>
                                        Published throughout development, open-sourcing learnings
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Development Infrastructure</h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                                <li className="flex items-start">
                                    <span className="text-orange-500 mr-2 mt-1">🔧</span>
                                    <div>
                                        <strong>XForce Monorepo</strong><br/>
                                        <a href="https://github.com/trilltino/xforce-monorepo" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                                            github.com/trilltino/xforce-monorepo
                                        </a><br/>
                                        <span className="text-sm">Full DeFi ecosystem: terminal, contracts, infrastructure</span>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-500 mr-2 mt-1">⚡</span>
                                    <div>
                                        <strong>Solana Devnet</strong><br/>
                                        All development and benchmarking conducted on devnet
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-cyan-500 mr-2 mt-1">🚀</span>
                                    <div>
                                        <strong>Production Deployment</strong><br/>
                                        Self-funded mainnet launch post-grant completion
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Platform Architecture */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Multi-Platform Architecture</h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700">
                            <div className="text-2xl mb-3">🖥️</div>
                            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">Desktop Terminal</h3>
                            <p className="text-blue-700 dark:text-blue-300 font-sans text-sm">
                                Native Tauri application with Bloomberg-style interface
                            </p>
                        </div>
                        
                        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700">
                            <div className="text-2xl mb-3">🌐</div>
                            <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">Web Interface</h3>
                            <p className="text-green-700 dark:text-green-300 font-sans text-sm">
                                React-based web wallet and trading interface
                            </p>
                        </div>
                        
                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-700">
                            <div className="text-2xl mb-3">📚</div>
                            <h3 className="text-lg font-bold text-purple-800 dark:text-purple-200 mb-2">XForce-Guide</h3>
                            <p className="text-purple-700 dark:text-purple-300 font-sans text-sm">
                                Educational desktop app with certification curriculum
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ecosystem Integration */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Ecosystem Integration Points</h2>
                    
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Protocol Integrations</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-blue-500 mr-3">⚡</span>
                                        <div>
                                            <strong>Yellowstone Geyser</strong><br/>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Sub-100ms validator data feeds</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-green-500 mr-3">🔄</span>
                                        <div>
                                            <strong>Jupiter Aggregator</strong><br/>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Deepest liquidity on Solana</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-purple-500 mr-3">📊</span>
                                        <div>
                                            <strong>Phoenix CLOB & Drift</strong><br/>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Advanced trading protocols</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Infrastructure Partners</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-orange-500 mr-3">🛡️</span>
                                        <div>
                                            <strong>Jito MEV Protection</strong><br/>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Bundle-based transaction submission</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-cyan-500 mr-3">🔗</span>
                                        <div>
                                            <strong>Iroh P2P Network</strong><br/>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Decentralised messaging layer</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-red-500 mr-3">💎</span>
                                        <div>
                                            <strong>Bags Protocol</strong><br/>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Token-gating and social features</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Community & Support */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Community & Developer Ecosystem</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Developer Support</h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                                <li>• <strong>REST API:</strong> Full programmatic access to terminal stack</li>
                                <li>• <strong>Bot Examples:</strong> Python, JavaScript, Rust integrations</li>
                                <li>• <strong>Open Source Libraries:</strong> lib-solana, lib-core, lib-web</li>
                                <li>• <strong>Technical Documentation:</strong> Architecture and integration guides</li>
                                <li>• <strong>Developer Program:</strong> 50+ developer target for API adoption</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Community Presence</h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-sans">
                                <li>• <strong>Superteam UK:</strong> London-based Solana community support</li>
                                <li>• <strong>Technical Articles:</strong> 12 articles sharing development insights</li>
                                <li>• <strong>Open Source Contribution:</strong> Forkable codebase with contribution guides</li>
                                <li>• <strong>Community AMA:</strong> Launch events and ecosystem engagement</li>
                                <li>• <strong>Ecosystem Building:</strong> Raising technical floor for Solana developers</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Deployment Strategy */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4 text-center">Deployment Strategy</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-2">Devnet</div>
                            <div className="text-primary-600 dark:text-primary-400">4-month development</div>
                            <div className="text-sm text-primary-500 dark:text-primary-500 mt-1">All features built & tested</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-2">→</div>
                            <div className="text-primary-600 dark:text-primary-400">Self-funded</div>
                            <div className="text-sm text-primary-500 dark:text-primary-500 mt-1">Post-grant transition</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-2">Mainnet</div>
                            <div className="text-primary-600 dark:text-primary-400">Production launch</div>
                            <div className="text-sm text-primary-500 dark:text-primary-500 mt-1">Full ecosystem deployment</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
