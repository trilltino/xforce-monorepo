export default function What() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    What
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    The four core programs and their functionality
                </p>
            </div>

            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">xforce-terminal</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                        A comprehensive non-custodial Solana DeFi trading platform featuring a desktop terminal application, web wallet interface, and robust backend API.
                    </p>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Core Components</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans mb-6">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Desktop Terminal: Bloomberg-style Tauri app with real-time charts and multi-wallet support
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Web Wallet: React interface with Solana wallet adapter integration
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Backend API: Axum REST server with JWT auth, WebSocket feeds, and swap execution
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Library Crates: Modular Rust libraries for auth, core, Solana integration, and utilities
                        </li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Key Features by Milestone</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-primary-500/10 p-4 rounded-lg">
                            <h4 className="font-bold text-primary-400 mb-2">Month 1 — Infrastructure</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Yellowstone Geyser gRPC pipeline (sub-100ms)</li>
                                <li>• Multi-source price fallback chain</li>
                                <li>• RPC connection pooling & circuit breakers</li>
                                <li>• Beta v0.1.0 with wallet support</li>
                            </ul>
                        </div>
                        <div className="bg-primary-500/10 p-4 rounded-lg">
                            <h4 className="font-bold text-primary-400 mb-2">Month 2 — Optimization</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Pinocchio batch swap (30% CU reduction)</li>
                                <li>• Iroh P2P messaging with Braid CRDT</li>
                                <li>• p2panda E2EE encryption</li>
                                <li>• Bags SDK token gating</li>
                            </ul>
                        </div>
                        <div className="bg-primary-500/10 p-4 rounded-lg">
                            <h4 className="font-bold text-primary-400 mb-2">Month 3 — Advanced Trading</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Phoenix CLOB spot trading</li>
                                <li>• Drift perpetual futures</li>
                                <li>• Jito MEV protection (baseline)</li>
                                <li>• Advanced charting & technical indicators</li>
                            </ul>
                        </div>
                        <div className="bg-primary-500/10 p-4 rounded-lg">
                            <h4 className="font-bold text-primary-400 mb-2">Month 4 — Launch</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Mainnet v1.0.0 deployment</li>
                                <li>• Developer REST API</li>
                                <li>• Bot integration examples</li>
                                <li>• Production infrastructure (99.9% uptime)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">xforce-terminal-contracts</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                        Solana smart contracts built with Anchor framework, providing batch token swap functionality with security and efficiency optimizations.
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Batch Swap Router: Execute up to 10 swaps atomically in one transaction
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Pinocchio Optimization: Zero-copy deserialization with 30% compute unit reduction
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Devnet Deployment: Program ID published with explorer links and test transactions
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Client Libraries: Rust and TypeScript clients for easy integration
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">xforce-crypto-info</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                        Crypto news aggregation and analysis service with React frontend and Python scraper backend.
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            News Web: React dashboard with article cards, sentiment indicators, and category filtering
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            News Scraper: Python service aggregating from 10+ RSS feeds and APIs
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Sentiment Analysis: NLTK/VADER processing for market sentiment scoring
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            PostgreSQL Storage: Historical data with search and filtering capabilities
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">xforce-guide</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                        Developer documentation and reference implementations using React with Vite and TypeScript.
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans">
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            React + TypeScript + Vite template for modern frontend development
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Reference implementations in Tauri for desktop applications
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            Documentation site for developer onboarding
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
