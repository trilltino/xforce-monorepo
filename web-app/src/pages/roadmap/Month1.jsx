import { Link } from 'react-router-dom';

export default function Month1() {
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
                    Month 1
                </h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2 font-sans">625 USDC</p>
                <p className="text-xl text-gray-500 dark:text-gray-500 font-sans">
                    Geyser Integration & Beta Release
                </p>
            </div>

            {/* Success Criteria */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200">Success Criteria</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Geyser pipeline live and sub-100ms delivery benchmarked</li>
                    <li>Beta v0.1.0 released</li>
                    <li>50+ downloads</li>
                    <li>100+ waitlist signups</li>
                    <li>3 articles published</li>
                </ul>
            </div>

            {/* Milestones */}
            <div className="space-y-8">
                {/* Milestone 1.1 */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 1.1 — Yellowstone Geyser gRPC Pipeline</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Replace standard RPC polling with a production Yellowstone Geyser gRPC pipeline. Current RPC polling delivers market data in 2-5 seconds. Geyser delivers sub-100ms streaming directly from validator state.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Geyser gRPC client built in Rust using Tonic</li>
                        <li>Account subscription filter for user-relevant accounts only (micro-indexing)</li>
                        <li>Shadow state reconciliation — Geyser feed synced against RPC for consistency</li>
                        <li>WebSocket streaming layer delivering real-time data to terminal UI</li>
                        <li>Benchmark documented: RPC polling latency vs Geyser latency, verified in production</li>
                    </ul>
                </div>

                {/* Milestone 1.2 */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 1.2 — Multi-Source Price Fallback Chain</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Primary: Geyser real-time feeds</li>
                        <li>Secondary: Pyth Network oracles</li>
                        <li>Tertiary: Jupiter aggregator</li>
                        <li>Automatic failover with zero user-visible disruption</li>
                        <li>Staleness detection — feeds older than configurable threshold trigger fallback</li>
                    </ul>
                </div>

                {/* Milestone 1.3 */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 1.3 — Beta v0.1.0 Release</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Wallet connection: Phantom, Solflare, Backpack</li>
                        <li>Real-time price feeds via Geyser pipeline</li>
                        <li>Basic swap execution via Jupiter aggregator</li>
                        <li>WebSocket streaming price charts</li>
                        <li>JWT authentication and session management</li>
                    </ul>
                </div>

                {/* Milestone 1.4 */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 1.4 — RPC Infrastructure Hardening</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Connection pooling — 100+ concurrent RPC connections</li>
                        <li>Exponential backoff retry logic across mainnet and devnet</li>
                        <li>Circuit breakers — automatic failover on degraded performance</li>
                        <li>Local caching of frequently accessed account data</li>
                    </ul>
                </div>
            </div>

            {/* Articles */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Month 1 Articles</h2>
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Article 1: Building Sub-100ms Market Data Infrastructure on Solana</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Complete walkthrough of replacing RPC polling with Yellowstone Geyser gRPC. Tonic client setup in Rust, account subscription filtering, shadow state reconciliation, WebSocket delivery layer. Before/after latency benchmarks and full implementation included.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Article 2: Non-Custodial Architecture in Practice — How XForce Terminal Works</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            The architectural decisions behind a trading terminal where the application never holds user keys or funds. Wallet adapter integration, transaction signing flows, and the full threat model.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Article 3: Multi-Source Price Feeds with Automatic Failover</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Deep dive into the fallback chain — Geyser primary, Pyth secondary, Jupiter tertiary. Staleness detection, failover triggers, and building production-grade data reliability without centralised oracle dependency.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
