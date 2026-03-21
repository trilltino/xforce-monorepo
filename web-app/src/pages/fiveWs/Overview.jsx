export default function Overview5Ws() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    5 Ws and H
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-sans">
                    Understanding the XForce Terminal ecosystem through the classic journalistic framework
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg hover:border-primary-500 transition-all">
                    <h2 className="text-3xl font-bold text-primary-400 mb-4 font-heading">Who</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans">
                        Solo developer from London, building professional-grade DeFi infrastructure with SuperteamUK support
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg hover:border-primary-500 transition-all">
                    <h2 className="text-3xl font-bold text-primary-400 mb-4 font-heading">What</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans">
                        A comprehensive non-custodial Solana trading platform with desktop terminal, smart contracts, news service, and developer guides
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg hover:border-primary-500 transition-all">
                    <h2 className="text-3xl font-bold text-primary-400 mb-4 font-heading">When</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans">
                        4-month development roadmap from March 2026, with mainnet launch targeted for June 2026
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg hover:border-primary-500 transition-all">
                    <h2 className="text-3xl font-bold text-primary-400 mb-4 font-heading">Where</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans">
                        Solana blockchain mainnet, with devnet testing throughout development. Based in London with SuperteamUK ecosystem
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg hover:border-primary-500 transition-all">
                    <h2 className="text-3xl font-bold text-primary-400 mb-4 font-heading">Why</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans">
                        To provide institutional-grade trading tools for retail traders, eliminating custody risks while maximizing execution efficiency
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg hover:border-primary-500 transition-all">
                    <h2 className="text-3xl font-bold text-primary-400 mb-4 font-heading">How</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans">
                        Built with Rust (Tauri, Axum, Anchor), React, TypeScript, and integrated with Yellowstone Geyser, Jupiter, Pyth, and Jito
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">The Four Core Programs</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="border-l-4 border-primary-500 pl-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">xforce-terminal</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Desktop terminal, web wallet, and backend API with real-time market data and trading execution</p>
                    </div>
                    <div className="border-l-4 border-primary-500 pl-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">xforce-terminal-contracts</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Solana smart contracts for atomic batch swaps with Pinocchio optimization</p>
                    </div>
                    <div className="border-l-4 border-primary-500 pl-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">xforce-crypto-info</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">News aggregation and sentiment analysis service with Python scraper and React frontend</p>
                    </div>
                    <div className="border-l-4 border-primary-500 pl-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">xforce-guide</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Developer documentation and React reference implementations using Vite</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
