import { Link } from 'react-router-dom';

export default function Month3() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <Link to="/roadmap" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-500 mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Roadmap
                </Link>
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    Month 3
                </h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2 font-sans">625 USDC</p>
                <p className="text-xl text-gray-500 dark:text-gray-500 font-sans">
                    Advanced Trading & Security
                </p>
            </div>

            {/* Success Criteria */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200">Success Criteria</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Phoenix and Drift integrated on devnet</li>
                    <li>Jito MEV protection live and verified</li>
                    <li>Peer review published</li>
                    <li>80%+ test coverage</li>
                    <li>1,000+ devnet transactions</li>
                </ul>
            </div>

            {/* Milestones */}
            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 3.1 — Phoenix CLOB & Drift Perps Integration</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Phoenix CLOB: spot limit orders, order book visualisation, fill tracking</li>
                        <li>Drift: perpetual futures with margin management</li>
                        <li>Unified order management across spot and perps</li>
                        <li>Advanced charting: candlestick, technical indicators, multiple timeframes</li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 3.2 — Jito MEV Protection</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Jito Searcher Client integration in Rust</li>
                        <li>Bundle-based transaction submission — atomic execution preventing MEV extraction</li>
                        <li>Dynamic tip estimation based on transaction urgency</li>
                        <li>MEV protection documented and verifiable on devnet — bundle inclusion confirmed</li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 3.3 — Security Review & Test Infrastructure</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Community peer review of Pinocchio batch swap router via Superteam UK developer network — findings published publicly</li>
                        <li>cargo-audit dependency scan — supply chain vulnerabilities documented and resolved</li>
                        <li>Unit tests covering every program instruction and account constraint</li>
                        <li>Integration tests — full swap flows, SocialFi message propagation, P2P connections</li>
                        <li>Property-based fuzz testing for arithmetic edge cases</li>
                        <li>80%+ test coverage across all crates</li>
                        <li>1,000+ devnet transactions logged and verifiable</li>
                    </ul>
                </div>
            </div>

            {/* Articles */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Month 3 Articles</h2>
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Article 7: MEV on Solana — How Front-Running Works and How Jito Stops It</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Technical explanation of MEV extraction on Solana — sandwich attacks, front-running, how validators and searchers extract value. Jito architecture, bundle submission via Searcher Client API, tip estimation, and full Rust integration.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Article 8: Smart Contract Security on Solana — A Pinocchio Audit Walkthrough</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            What to look for when auditing a Pinocchio program. Common vulnerability classes — missing signer checks, unconstrained account ownership, arithmetic overflow, CPI reentrancy — and how they manifest differently in Pinocchio vs Anchor. Walks through the XForce Terminal audit findings and fixes.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Article 9: Order Book Architecture — Integrating Phoenix CLOB in a Rust Terminal</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            How to integrate Phoenix into a Rust desktop application. Phoenix program architecture, order placement and cancellation via CPI, order book state streaming via Geyser, P&L calculation from fill history. Full integration implementation included.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
