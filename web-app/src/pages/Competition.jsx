export default function Competition() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    Competition Analysis
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    Why existing solutions validate the market but leave the infrastructure gap open
                </p>
            </div>

            <div className="space-y-8">
                {/* Key Insight */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl p-8 shadow-lg">
                    <div className="text-center">
                        <div className="text-4xl mb-4">🎯</div>
                        <h2 className="text-3xl font-bold text-yellow-800 dark:text-yellow-200 mb-4 font-heading">The Competitive Landscape</h2>
                        <p className="text-yellow-700 dark:text-yellow-300 font-sans text-xl mb-4">
                            <strong>The existing tools are web and mobile-first by design — and that is precisely their limitation.</strong>
                        </p>
                        <p className="text-yellow-600 dark:text-yellow-400 font-sans text-lg">
                            None are open source. None expose a developer API. None give the next bot builder, algo trader, or Solana dev a reference stack to build on.
                        </p>
                    </div>
                </div>

                {/* Birdeye */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-8 shadow-lg">
                    <div className="flex items-start mb-6">
                        <div className="text-4xl mr-4">📊</div>
                        <div>
                            <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-4 font-heading">Birdeye — Data Dashboard Leader</h2>
                            <p className="text-blue-700 dark:text-blue-300 font-sans text-lg mb-4">
                                Birdeye is the leading data analytics platform in the Solana ecosystem, processing over <strong>$1 billion in daily trading volume data</strong>, but it is a data dashboard — no native execution layer, no open infrastructure, no developer primitives to build on.
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                            <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">✓ What They Do Well</h3>
                            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                                <li>• Leading data analytics platform</li>
                                <li>• $1B+ daily volume tracking</li>
                                <li>• Comprehensive market data</li>
                                <li>• Strong ecosystem presence</li>
                            </ul>
                        </div>
                        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                            <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">✗ Critical Gaps</h3>
                            <ul className="text-red-700 dark:text-red-300 text-sm space-y-1">
                                <li>• No native execution layer</li>
                                <li>• No open infrastructure</li>
                                <li>• No developer primitives</li>
                                <li>• Data dashboard only</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-600">
                        <p className="text-blue-800 dark:text-blue-200 font-medium">
                            <strong>Market Position:</strong> Dominant in analytics, absent in infrastructure
                        </p>
                        <a 
                            href="https://birdeye.so" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline text-sm mt-2 inline-block"
                        >
                            birdeye.so →
                        </a>
                    </div>
                </div>

                {/* Axiom */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-8 shadow-lg">
                    <div className="flex items-start mb-6">
                        <div className="text-4xl mr-4">🎲</div>
                        <div>
                            <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-200 mb-4 font-heading">Axiom — Memecoin Trading Dominance</h2>
                            <p className="text-purple-700 dark:text-purple-300 font-sans text-lg mb-4">
                                Axiom dominates memecoin trading through a browser interface — <strong>YC-backed, closed source</strong>, and built for casual speculation rather than latency-sensitive or large-scale operations. No programmable infrastructure layer. No forkable stack.
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
                            <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-2">✓ What They Do Well</h3>
                            <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
                                <li>• YC-backed with strong funding</li>
                                <li>• Dominates memecoin trading</li>
                                <li>• Polished browser interface</li>
                                <li>• Casual user-friendly UX</li>
                            </ul>
                        </div>
                        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                            <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">✗ Critical Gaps</h3>
                            <ul className="text-red-700 dark:text-red-300 text-sm space-y-1">
                                <li>• Closed source</li>
                                <li>• Browser-only (latency constraints)</li>
                                <li>• No programmable infrastructure</li>
                                <li>• No forkable stack</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-600">
                        <p className="text-purple-800 dark:text-purple-200 font-medium">
                            <strong>Market Position:</strong> Casual speculation leader, not built for serious infrastructure
                        </p>
                        <a 
                            href="https://axiom.trade" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-600 dark:text-purple-400 hover:underline text-sm mt-2 inline-block"
                        >
                            axiom.trade →
                        </a>
                    </div>
                </div>

                {/* Jupiter */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-2 border-orange-300 dark:border-orange-700 rounded-xl p-8 shadow-lg">
                    <div className="flex items-start mb-6">
                        <div className="text-4xl mr-4">🪐</div>
                        <div>
                            <h2 className="text-3xl font-bold text-orange-800 dark:text-orange-200 mb-4 font-heading">Jupiter — The Most Formidable Entrant</h2>
                            <p className="text-orange-700 dark:text-orange-300 font-sans text-lg mb-4">
                                Jupiter is the most formidable entrant. At <strong>Breakpoint 2025</strong>, Jupiter introduced a new all-in-one Terminal bringing spot trading, perps, wallet tracking, and market data into one place, running on their Ultra V3 engine. In <strong>January 2026</strong>, they launched Mobile V3, described as "the first fully native pro trading mobile terminal," revamping token discovery, analysis, and trading UX.
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200 mb-3">Jupiter Terminal (Breakpoint 2025)</h3>
                            <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-lg mb-4">
                                <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-2">
                                    <li>• <strong>All-in-one Terminal</strong> - Spot, perps, wallet tracking, market data</li>
                                    <li>• <strong>Ultra V3 Engine</strong> - Advanced routing technology</li>
                                    <li>• <strong>Unified Interface</strong> - Single platform for all trading needs</li>
                                </ul>
                            </div>
                            <a 
                                href="https://coinpedia.org/news/jupiter-unveils-jupusd-stablecoin-and-major-defi-upgrades-at-solana-breakpoint-2025/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-orange-600 dark:text-orange-400 hover:underline text-sm"
                            >
                                Breakpoint 2025 Announcement →
                            </a>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200 mb-3">Jupiter Mobile V3 (January 2026)</h3>
                            <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-lg mb-4">
                                <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-2">
                                    <li>• <strong>"First fully native pro trading mobile terminal"</strong></li>
                                    <li>• <strong>Revamped UX</strong> - Token discovery and analysis</li>
                                    <li>• <strong>Mobile-first</strong> - Professional trading on mobile</li>
                                </ul>
                            </div>
                            <a 
                                href="https://crypto.news/jupiter-launches-mobile-v3-native-pro-trading-2026/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-orange-600 dark:text-orange-400 hover:underline text-sm"
                            >
                                Mobile V3 Launch →
                            </a>
                        </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-2 border-yellow-400 dark:border-yellow-600 mb-4">
                        <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-3">What Jupiter Proves</h3>
                        <p className="text-yellow-700 dark:text-yellow-300 font-sans mb-4">
                            Jupiter validates that <strong>the market wants native, non-browser trading infrastructure</strong> — and then proves the gap:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded text-center">
                                <div className="font-bold text-red-800 dark:text-red-200 mb-1">Closed Source</div>
                                <div className="text-red-700 dark:text-red-300 text-sm">No code access</div>
                            </div>
                            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded text-center">
                                <div className="font-bold text-red-800 dark:text-red-200 mb-1">No Developer API</div>
                                <div className="text-red-700 dark:text-red-300 text-sm">No programmable layer</div>
                            </div>
                            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded text-center">
                                <div className="font-bold text-red-800 dark:text-red-200 mb-1">Not Forkable</div>
                                <div className="text-red-700 dark:text-red-300 text-sm">No Rust libraries</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-600">
                        <p className="text-orange-800 dark:text-orange-200 font-medium">
                            <strong>Market Position:</strong> Validates native infrastructure demand, but keeps it proprietary
                        </p>
                    </div>
                </div>

                {/* The XForce Difference */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-300 dark:border-green-700 rounded-xl p-8 shadow-lg">
                    <div className="text-center mb-6">
                        <div className="text-4xl mb-4">⚡</div>
                        <h2 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-4 font-heading">The XForce Terminal Difference</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">What Competitors Don't Provide</h3>
                            <div className="space-y-3">
                                <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                                    <div className="font-bold text-red-800 dark:text-red-200 mb-1">❌ Open Source Code</div>
                                    <div className="text-red-700 dark:text-red-300 text-sm">All competitors are closed source</div>
                                </div>
                                <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                                    <div className="font-bold text-red-800 dark:text-red-200 mb-1">❌ Developer API</div>
                                    <div className="text-red-700 dark:text-red-300 text-sm">No programmable infrastructure layer</div>
                                </div>
                                <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                                    <div className="font-bold text-red-800 dark:text-red-200 mb-1">❌ Forkable Stack</div>
                                    <div className="text-red-700 dark:text-red-300 text-sm">No reference architecture for builders</div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">What XForce Terminal Delivers</h3>
                            <div className="space-y-3">
                                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                                    <div className="font-bold text-green-800 dark:text-green-200 mb-1">✓ Fully Open Source</div>
                                    <div className="text-green-700 dark:text-green-300 text-sm">Apache 2.0 license, all code public</div>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                                    <div className="font-bold text-green-800 dark:text-green-200 mb-1">✓ Comprehensive REST API</div>
                                    <div className="text-green-700 dark:text-green-300 text-sm">Full programmatic access to terminal stack</div>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                                    <div className="font-bold text-green-800 dark:text-green-200 mb-1">✓ Modular Rust Libraries</div>
                                    <div className="text-green-700 dark:text-green-300 text-sm">lib-solana, lib-core, lib-web for ecosystem</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-lg border-l-4 border-green-600">
                        <p className="text-green-800 dark:text-green-200 font-medium text-lg text-center">
                            <strong>XForce Terminal is the open infrastructure layer none of them chose to build.</strong>
                        </p>
                    </div>
                </div>

                {/* Competitive Summary Table */}
                <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-8 shadow-lg overflow-x-auto">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading text-center">Competitive Comparison Matrix</h2>
                    
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gray-300 dark:border-gray-700">
                                <th className="text-left p-3 font-bold text-gray-900 dark:text-white">Feature</th>
                                <th className="text-center p-3 font-bold text-blue-800 dark:text-blue-200">Birdeye</th>
                                <th className="text-center p-3 font-bold text-purple-800 dark:text-purple-200">Axiom</th>
                                <th className="text-center p-3 font-bold text-orange-800 dark:text-orange-200">Jupiter</th>
                                <th className="text-center p-3 font-bold text-green-800 dark:text-green-200">XForce Terminal</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-gray-300">
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="p-3 font-semibold">Open Source</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3 text-green-600 dark:text-green-400">✓</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="p-3 font-semibold">Developer API</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3 text-green-600 dark:text-green-400">✓</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="p-3 font-semibold">Native Execution</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3">Partial</td>
                                <td className="text-center p-3 text-orange-600 dark:text-orange-400">✓</td>
                                <td className="text-center p-3 text-green-600 dark:text-green-400">✓</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="p-3 font-semibold">Forkable Stack</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3 text-green-600 dark:text-green-400">✓</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="p-3 font-semibold">Sub-100ms Data</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3 text-green-600 dark:text-green-400">✓</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="p-3 font-semibold">MEV Protection</td>
                                <td className="text-center p-3">N/A</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3">Partial</td>
                                <td className="text-center p-3 text-green-600 dark:text-green-400">✓ Default</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-semibold">Modular Libraries</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3">❌</td>
                                <td className="text-center p-3 text-green-600 dark:text-green-400">✓</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* References */}
                <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">References</h2>
                    <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Birdeye</h3>
                            <a 
                                href="https://birdeye.so" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline text-sm break-all"
                            >
                                https://birdeye.so
                            </a>
                        </div>

                        <div className="border-l-4 border-purple-500 pl-4">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Axiom</h3>
                            <a 
                                href="https://axiom.trade" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-purple-600 dark:text-purple-400 hover:underline text-sm break-all"
                            >
                                https://axiom.trade
                            </a>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Jupiter Terminal (Breakpoint 2025)</h3>
                            <a 
                                href="https://coinpedia.org/news/jupiter-unveils-jupusd-stablecoin-and-major-defi-upgrades-at-solana-breakpoint-2025/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-orange-600 dark:text-orange-400 hover:underline text-sm break-all"
                            >
                                https://coinpedia.org/news/jupiter-unveils-jupusd-stablecoin-and-major-defi-upgrades-at-solana-breakpoint-2025/
                            </a>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Jupiter Mobile V3</h3>
                            <a 
                                href="https://crypto.news/jupiter-launches-mobile-v3-native-pro-trading-2026/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-orange-600 dark:text-orange-400 hover:underline text-sm break-all"
                            >
                                https://crypto.news/jupiter-launches-mobile-v3-native-pro-trading-2026/
                            </a>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 rounded-xl p-8 text-center">
                    <h2 className="text-3xl font-bold text-primary-800 dark:text-primary-200 mb-4">The Open Infrastructure Gap</h2>
                    <p className="text-primary-700 dark:text-primary-300 font-sans text-lg mb-6">
                        Competitors validate the market. XForce Terminal fills the infrastructure gap they left open.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="/xfterminal/what" 
                            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
                        >
                            See What We Build
                        </a>
                        <a 
                            href="/xfterminal/demand" 
                            className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
                        >
                            View Market Demand
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
