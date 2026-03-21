import { Link } from 'react-router-dom';

export default function When() {
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
                    When
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    4-month devnet build timeline | $2,500 Tools Grant | Mainnet follows post-grant
                </p>
            </div>

            <div className="space-y-8">
                {/* Grant Overview */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Grant Structure & Timeline</h2>
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">Development Phase</h3>
                            <ul className="space-y-3 text-green-700 dark:text-green-300 font-sans">
                                <li>• <strong>Duration:</strong> 4 months</li>
                                <li>• <strong>Funding:</strong> $2,500 Tools Grant</li>
                                <li>• <strong>Environment:</strong> Solana devnet</li>
                                <li>• <strong>Deliverables:</strong> Open source infrastructure</li>
                                <li>• <strong>Documentation:</strong> 12 technical articles</li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">Post-Grant Phase</h3>
                            <ul className="space-y-3 text-blue-700 dark:text-blue-300 font-sans">
                                <li>• <strong>Deployment:</strong> Self-funded mainnet launch</li>
                                <li>• <strong>Timeline:</strong> Immediately following devnet completion</li>
                                <li>• <strong>Infrastructure:</strong> Production-ready systems</li>
                                <li>• <strong>Monetization:</strong> Terminal features & API access</li>
                                <li>• <strong>Ecosystem:</strong> Developer adoption program</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-700">
                        <p className="text-yellow-800 dark:text-yellow-200 font-medium text-center">
                            <strong>Key Principle:</strong> All development and benchmarking conducted on Solana devnet. Mainnet deployment follows post-grant, self-funded.
                        </p>
                    </div>
                </div>

                {/* Monthly Breakdown */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Monthly Milestones</h2>
                    
                    <div className="space-y-6">
                        {/* Month 1 */}
                        <div className="border-l-4 border-blue-500 pl-6">
                            <div className="flex items-center mb-3">
                                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">1</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Geyser Integration & Beta Release</h3>
                                <span className="ml-auto text-blue-600 dark:text-blue-400 font-semibold">$625 USDC</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-sans mb-3">
                                Replace RPC polling with production Yellowstone Geyser gRPC pipeline delivering sub-100ms streaming directly from validator state.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Technical Deliverables</h4>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>• Geyser gRPC client (Rust + Tonic)</li>
                                        <li>• Multi-source price fallback (Geyser → Pyth → Jupiter)</li>
                                        <li>• WebSocket streaming to UI</li>
                                        <li>• RPC infrastructure hardening</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Success Criteria</h4>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>• Sub-100ms delivery benchmarked</li>
                                        <li>• Beta v0.1.0 released</li>
                                        <li>• 50+ downloads</li>
                                        <li>• 100+ waitlist signups</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Month 2 */}
                        <div className="border-l-4 border-green-500 pl-6">
                            <div className="flex items-center mb-3">
                                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">2</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pinocchio Optimisation & SocialFi Layer</h3>
                                <span className="ml-auto text-green-600 dark:text-green-400 font-semibold">$625 USDC</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-sans mb-3">
                                Convert Anchor batch swap router to Pinocchio for 30% CU reduction, and replace centralised chat with decentralised P2P messaging.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Technical Deliverables</h4>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>• Pinocchio batch swap router (30% CU reduction)</li>
                                        <li>• Iroh P2P + Braid CRDT messaging</li>
                                        <li>• p2panda Double Ratchet E2EE</li>
                                        <li>• Bags SDK token gating integration</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Success Criteria</h4>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>• 30% CU reduction verified</li>
                                        <li>• SocialFi layer live in Beta v0.2.0</li>
                                        <li>• E2EE operational</li>
                                        <li>• 20+ developer signups</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Month 3 */}
                        <div className="border-l-4 border-purple-500 pl-6">
                            <div className="flex items-center mb-3">
                                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">3</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Advanced Trading & Security</h3>
                                <span className="ml-auto text-purple-600 dark:text-purple-400 font-semibold">$625 USDC</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-sans mb-3">
                                Integrate Phoenix CLOB and Drift perps, implement Jito MEV protection, and conduct comprehensive security review.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Technical Deliverables</h4>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>• Phoenix CLOB spot trading integration</li>
                                        <li>• Drift perpetual futures support</li>
                                        <li>• Jito MEV protection (baseline)</li>
                                        <li>• Security review + test infrastructure</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Success Criteria</h4>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>• Phoenix & Drift integrated on devnet</li>
                                        <li>• Jito MEV protection verified</li>
                                        <li>• 80%+ test coverage</li>
                                        <li>• 1,000+ devnet transactions</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Month 4 */}
                        <div className="border-l-4 border-orange-500 pl-6">
                            <div className="flex items-center mb-3">
                                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">4</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Devnet Completion & Mainnet Readiness</h3>
                                <span className="ml-auto text-orange-600 dark:text-orange-400 font-semibold">$625 USDC</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-sans mb-3">
                                Complete devnet build, launch developer API, and prepare comprehensive documentation for mainnet deployment.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Technical Deliverables</h4>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>• All contracts verified & benchmarked</li>
                                        <li>• REST API live on devnet</li>
                                        <li>• Developer program & examples</li>
                                        <li>• XForce-Guide companion app</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Success Criteria</h4>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>• Devnet build publicly verifiable</li>
                                        <li>• All 12 articles published</li>
                                        <li>• 50+ developers engaged</li>
                                        <li>• Mainnet roadmap published</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Strategy */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Technical Documentation Strategy</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-6">
                        12 technical articles published throughout the build, open-sourcing the learnings for the wider Solana developer community.
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                            <div className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">Month 1</div>
                            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                                <li>• Sub-100ms Market Data</li>
                                <li>• Non-Custodial Architecture</li>
                                <li>• Multi-Source Price Feeds</li>
                            </ul>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                            <div className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">Month 2</div>
                            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                                <li>• Pinocchio vs Anchor</li>
                                <li>• Decentralised SocialFi</li>
                                <li>• E2EE Implementation</li>
                            </ul>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                            <div className="text-lg font-bold text-purple-800 dark:text-purple-200 mb-2">Month 3</div>
                            <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                                <li>• MEV on Solana</li>
                                <li>• Smart Contract Security</li>
                                <li>• Phoenix CLOB Integration</li>
                            </ul>
                        </div>
                        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
                            <div className="text-lg font-bold text-orange-800 dark:text-orange-200 mb-2">Month 4</div>
                            <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                                <li>• Production Architecture</li>
                                <li>• Real-Time Data Stack</li>
                                <li>• Open-Source Lessons</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Risk Mitigation */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-700 rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-red-800 dark:text-red-200 mb-4">Risk Mitigation & Dependencies</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">Technical Risks</h3>
                            <ul className="space-y-2 text-red-600 dark:text-red-400 font-sans">
                                <li>• <strong>Geyser Stability:</strong> Fallback chain ensures data continuity</li>
                                <li>• <strong>Pinocchio Adoption:</strong> Anchor fallback maintains compatibility</li>
                                <li>• <strong>MEV Protection:</strong> Bundle submission verified on devnet</li>
                                <li>• <strong>P2P Infrastructure:</strong> Centralised fallback during development</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">External Dependencies</h3>
                            <ul className="space-y-2 text-red-600 dark:text-red-400 font-sans">
                                <li>• <strong>Solana Network:</strong> Devnet environment for testing</li>
                                <li>• <strong>Protocol Updates:</strong> Integration testing with each release</li>
                                <li>• <strong>Community Support:</strong> Superteam UK mentorship network</li>
                                <li>• <strong>Grant Funding:</strong> Self-funded continuation post-grant</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
