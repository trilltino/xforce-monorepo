import { Link } from 'react-router-dom';

export default function Month4() {
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
                    Month 4
                </h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2 font-sans">625 USDC</p>
                <p className="text-xl text-gray-500 dark:text-gray-500 font-sans">
                    Devnet Completion & Mainnet Readiness
                </p>
            </div>

            {/* Success Criteria */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-200">Success Criteria</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Devnet build complete and publicly verifiable</li>
                    <li>All 12 articles published</li>
                    <li>50+ developers engaged with API or libs</li>
                    <li>Codebase forkable with complete documentation</li>
                    <li>Mainnet deployment roadmap published</li>
                </ul>
            </div>

            {/* Milestones */}
            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 4.1 — Devnet Completion</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>All contracts verified and benchmarked on devnet — program addresses published</li>
                        <li>Full benchmark suite documented: latency, CU reduction, load test results</li>
                        <li>Codebase open, forkable, and fully documented — lib-solana, lib-core, lib-web ready for community use</li>
                        <li>Mainnet deployment scoped and prepared — executed post-grant, self-funded</li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 4.2 — Developer API & Ecosystem</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>REST API live on devnet — trading operations, order management, account data</li>
                        <li>Example bot integrations: Python, JavaScript, Rust</li>
                        <li>Full API documentation: endpoints, authentication, rate limits, examples</li>
                        <li>Developer program open — 50+ developer target for API access and lib adoption</li>
                        <li>Community AMA and launch event with Superteam UK</li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Milestone 4.3 — Community & Documentation</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>XForce-Guide companion app shipped — Bloomberg-style layout, Solana Market Concepts curriculum</li>
                        <li>In-app tutorials covering swap execution, order management, SocialFi features</li>
                        <li>Full developer documentation published — architecture decisions, integration guides, contribution guide</li>
                    </ul>
                </div>
            </div>

            {/* Articles */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Month 4 Articles</h2>
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Article 10: Shipping a Production Rust Trading Terminal — Architecture Decisions That Mattered</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            The key architectural choices behind XForce Terminal — Tauri over Electron, Axum over Actix, Pinocchio over Anchor for performance-critical paths, Iroh over libp2p. Why each decision was made and what the tradeoffs were in practice.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Article 11: From Geyser to UI — The Complete Real-Time Data Stack</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            The complete XForce Terminal data pipeline from validator to user interface. Every layer: Geyser gRPC subscription, filter stage, specialised parsers, Redis cache, WebSocket delivery, lightweight-charts rendering. A reference implementation for building Bloomberg-speed data pipelines on Solana.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Article 12: Building Open-Source Trading Infrastructure — Lessons from XForce Terminal</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            A retrospective on building a production trading terminal in Rust over four months. Architectural decisions that worked and those that did not, security considerations for financial applications, and the experience of building in public within the Superteam ecosystem.
                        </p>
                    </div>
                </div>
            </div>

            {/* Overall Goals */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Overall Goals</h2>
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Deliver sub-100ms market data infrastructure</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Replace RPC polling with a production Yellowstone Geyser gRPC pipeline. Real-time data delivery that matches institutional trading infrastructure — not a prototype, a deployed system.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Ship a production-grade open-source Pinocchio batch swap router</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Convert the Anchor batch swap program to Pinocchio — zero-copy, no-std, 30% compute unit reduction. A public reference implementation that any Solana developer can learn from and build on.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Launch a non-custodial trading terminal with decentralised social layer</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            XForce Terminal v1.0.0 on mainnet — full DeFi functionality with P2P messaging via Iroh, E2EE via p2panda Double Ratchet, and Bags token economics. No centralised server holding user data or controlling access.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Prove MEV-resistant execution at the program level</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Jito bundle integration live in production. Every trade protected from front-running and sandwiching by default — not an optional feature, a baseline guarantee.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Build a developer reference architecture for the Solana ecosystem</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Every component open source. The Geyser pipeline, the Pinocchio contracts, the SocialFi stack — documented, tested, and forkable. A codebase that raises the technical floor for UK Solana developers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
