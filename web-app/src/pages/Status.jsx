import { Link } from 'react-router-dom';

function FeatureCard({ title, description }) {
    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-3 font-heading text-gray-900 dark:text-white">
                {title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-sans">
                {description}
            </p>
        </div>
    );
}

function TechCard({ category, technologies, colorClass }) {
    return (
        <div className={`p-4 rounded-lg ${colorClass}`}>
            <h4 className="font-semibold mb-2">{category}</h4>
            <p className="text-sm">{technologies.join(', ')}</p>
        </div>
    );
}

export default function Status() {
    const features = [
        { title: "Bloomberg-Style Desktop Interface", description: "Native desktop application with professional trading terminal UI built using egui/eframe for optimal performance and user experience." },
        { title: "Real-Time Price Feeds", description: "Live market data and price updates directly from Solana blockchain, keeping you informed of market movements in real-time." },
        { title: "Candlestick Charts", description: "Advanced charting capabilities with candlestick visualization for technical analysis and trading decisions." },
        { title: "Batch Swap Router Contracts", description: "Atomic batch token swaps on Solana, enabling multiple swaps in a single transaction with significant fee savings." },
        { title: "AI-Powered Trading Assistant", description: "Integrated AI assistance using rust-genai with multi-provider support (DeepSeek, OpenAI, Anthropic, Gemini) for market analysis and strategy guidance." },
        { title: "Social Messaging System", description: "Decentralized messaging using Braid Protocol (CRDT-based) for copy-trading, signal sharing, and trader communication without centralized intermediaries." },
        { title: "REST API for Trading Bots", description: "Comprehensive REST API enabling developers to build automated trading strategies, copy-trading systems, and algorithmic trading bots in any language." },
        { title: "Non-Custodial Security", description: "Your keys, your funds. Full control over your assets with secure wallet integration and transaction signing." },
        { title: "Web Wallet Interface", description: "Browser-based wallet helper built with Leptos/WASM for seamless web integration and accessibility." },
    ];

    const techStack = [
        { category: "Core Language", technologies: ["Rust"], colorClass: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" },
        { category: "Desktop GUI", technologies: ["egui", "eframe"], colorClass: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" },
        { category: "Web Framework", technologies: ["Leptos", "WASM"], colorClass: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" },
        { category: "Backend Server", technologies: ["Axum", "Tokio"], colorClass: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
        { category: "Blockchain", technologies: ["Solana SDK", "Anchor"], colorClass: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" },
        { category: "Database", technologies: ["SQLite"], colorClass: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400" },
        { category: "Authentication", technologies: ["JWT"], colorClass: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400" },
        { category: "Messaging", technologies: ["Braid Protocol", "CRDT"], colorClass: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400" },
        { category: "AI Integration", technologies: ["rust-genai"], colorClass: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400" },
        { category: "Styling", technologies: ["Tailwind CSS"], colorClass: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400" },
    ];

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            {/* Hero Section */}
            <div className="relative mb-12">
                <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-primary-900/50">
                    <img
                        src="/xforcesolutions/images/xfterminal-cover.png"
                        alt="XFTerminal - Access SolanaDeFi Anywhere"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40"></div>
                    <div className="absolute inset-0 flex items-end justify-start p-8">
                        <div className="text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-heading">
                                <span className="text-primary-500">XF</span>
                                <span className="text-white">Terminal</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 font-sans mb-2">
                                Access SolanaDeFi Anywhere
                            </p>
                            <p className="text-sm md:text-base text-gray-400 font-mono">
                                Production-grade DeFi trading terminal built entirely in Rust
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Overview */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg mb-8 border border-gray-200 dark:border-gray-800">
                <h2 className="text-3xl font-bold mb-6 font-heading text-gray-900 dark:text-white">
                    System Status & Features
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 font-sans leading-relaxed">
                    XFTerminal is the first end-to-end Rust DeFi trading terminal for Solana, featuring a unified stack from smart contracts to desktop GUI to web components. All components share type safety, ensuring consistency and reliability across the entire application.
                </p>
            </div>

            {/* Core Features Grid */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold mb-8 text-center font-heading text-gray-900 dark:text-white">
                    Core Features
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
                    ))}
                </div>
            </div>

            {/* Technology Stack */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold mb-8 text-center font-heading text-gray-900 dark:text-white">
                    Technology Stack
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {techStack.map((tech) => (
                        <TechCard key={tech.category} {...tech} />
                    ))}
                </div>
            </div>

            {/* Architecture Highlights */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold mb-8 text-center font-heading text-gray-900 dark:text-white">
                    Architecture Highlights
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { title: "Modular Library Architecture", desc: "Reusable libraries designed for crates.io publication: lib-solana (blockchain integration), lib-core (data models), lib-web (server code), lib-auth (authentication), and lib-utils (shared utilities)." },
                        { title: "Unified Type Safety", desc: "Shared types across Solana programs, desktop app, backend API, and web components ensure consistency and eliminate type-related bugs across the entire stack." },
                        { title: "Production-Ready Patterns", desc: "Idiomatic Rust code with comprehensive error handling, logging, documentation, and modular architecture suitable for production deployment and open-source contribution." },
                        { title: "Public Infrastructure", desc: "Fully open-source platform serving as public infrastructure for the Solana DeFi ecosystem, providing reusable patterns and best practices for the community." },
                    ].map((item) => (
                        <div key={item.title} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold mb-3 font-heading text-gray-900 dark:text-white">{item.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300 font-sans">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-black p-8 rounded-lg shadow-lg text-center border border-primary-900/50">
                <h2 className="text-3xl font-bold mb-4 font-heading text-white">
                    Ready to Explore?
                </h2>
                <p className="text-lg text-gray-300 mb-6 font-sans">
                    Discover more about XFTerminal's architecture, contracts, and documentation
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/architecture"
                        className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors duration-200"
                    >
                        View Architecture
                    </Link>
                    <Link
                        to="/contracts"
                        className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors duration-200"
                    >
                        Smart Contracts
                    </Link>
                    <Link
                        to="/documentation"
                        className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors duration-200"
                    >
                        Documentation
                    </Link>
                </div>
            </div>
        </div>
    );
}
