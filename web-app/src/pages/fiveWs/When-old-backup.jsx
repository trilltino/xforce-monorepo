export default function When() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    When
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    Timeline and roadmap for XForce Terminal development
                </p>
            </div>

            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Development Timeline</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                        A 4-month development roadmap from March 2026 to June 2026, structured around the SuperteamUK grant program and milestone-based delivery.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Month 1 — March 2026</h2>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Geyser Integration & Beta Release</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Yellowstone Geyser gRPC pipeline implementation (sub-100ms delivery)
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Multi-source price fallback chain (Geyser → Pyth → Jupiter)
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Beta v0.1.0 release with wallet connection and basic swaps
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            RPC infrastructure hardening with connection pooling
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Target: 50+ downloads, 100+ waitlist signups
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Month 2 — April 2026</h2>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Pinocchio Optimisation & SocialFi Layer</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Pinocchio batch swap router (30% compute unit reduction)
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Iroh P2P messaging with Braid CRDT protocol
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            p2panda E2EE encryption and group management
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Bags SDK integration for token gating and tipping
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Target: Beta v0.2.0, 20+ developer signups
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Month 3 — May 2026</h2>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Advanced Trading & Security</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Phoenix CLOB and Drift perpetual futures integration
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Jito MEV protection with bundle-based submission
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Smart contract security audit (public report)
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Test infrastructure: 80%+ coverage, 1,000+ devnet transactions
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Target: 100+ active beta testers
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Month 4 — June 2026</h2>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Mainnet Launch</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            All contracts deployed to Solana mainnet
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            XForce Terminal v1.0.0 production release
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Developer API and ecosystem launch
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Community onboarding and SuperteamUK launch event
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Target: 250 active wallets, 10,000+ transactions, 99.9% uptime
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">Key Milestones</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="text-center p-4 bg-primary-500/10 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Month 1</h3>
                            <p className="text-primary-400 font-bold">Beta v0.1.0 Release</p>
                        </div>
                        <div className="text-center p-4 bg-primary-500/10 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Month 2</h3>
                            <p className="text-primary-400 font-bold">SocialFi Layer Live</p>
                        </div>
                        <div className="text-center p-4 bg-primary-500/10 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Month 3</h3>
                            <p className="text-primary-400 font-bold">Security Audit Complete</p>
                        </div>
                        <div className="text-center p-4 bg-primary-500/10 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Month 4</h3>
                            <p className="text-primary-400 font-bold">Mainnet v1.0.0 Launch</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
