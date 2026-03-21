import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StackCard = ({ title, items }) => (
    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl">
        <h3 className="font-bold text-red-400 mb-3 text-lg">{title}</h3>
        <ul className="text-sm text-gray-400 space-y-2">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const Section = ({ title, subtitle, children, delay = 0 }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="mb-12"
    >
        <h2 className="text-3xl font-bold text-white mb-2 font-heading">{title}</h2>
        {subtitle && (
            <p className="text-xl text-gray-400 mb-6 font-sans">{subtitle}</p>
        )}
        <div className="bg-black/40 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
            {children}
        </div>
    </motion.div>
);

export default function SystemOverview() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl md:text-6xl font-black mb-4 font-heading tracking-tight">
                    <span className="text-red-500">System</span>
                    <span className="text-white">Overview</span>
                </h1>
                <p className="text-xl text-gray-400 font-sans">
                    Full Stack Architecture & Data Flow
                </p>
            </motion.div>

            {/* Technology Stack */}
            <Section title="Technology Stack" subtitle="What Powers Each Component" delay={0.1}>
                <div className="grid md:grid-cols-2 gap-6">
                    <StackCard 
                        title="Backend Stack"
                        items={[
                            "Rust + Axum (HTTP server)",
                            "PostgreSQL + SQLx (database)",
                            "JWT + Argon2 (authentication)",
                            "Tokio (async runtime)",
                            "Tonic (gRPC for Geyser)"
                        ]}
                    />
                    <StackCard 
                        title="Smart Contracts"
                        items={[
                            "Anchor Framework",
                            "Batch Swap Router Program",
                            "CPI to SPL Token Program",
                            "Event emission for indexing",
                            "Program ID: HS63bw1V1q..."
                        ]}
                    />
                    <StackCard 
                        title="News Service"
                        items={[
                            "Python + feedparser (RSS)",
                            "NLTK/VADER (sentiment)",
                            "PostgreSQL (storage)",
                            "React frontend (dashboard)",
                            "10+ RSS sources aggregated"
                        ]}
                    />
                    <StackCard 
                        title="Frontend"
                        items={[
                            "React 18 + TypeScript",
                            "Tauri v2 (desktop)",
                            "Tailwind CSS (styling)",
                            "lightweight-charts (charts)",
                            "Solana Wallet Adapter"
                        ]}
                    />
                </div>
            </Section>

            {/* Architecture Diagram */}
            <Section title="Data Flow" subtitle="How Information Moves Through the System" delay={0.2}>
                <div className="overflow-x-auto">
                    <pre className="bg-gray-900/80 border border-gray-800 text-gray-400 p-4 rounded-lg text-xs md:text-sm min-w-[600px]">
{`┌─────────────────────────────────────────────────────────────────────────────┐
│                          XFTerminal Architecture                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐               │
│   │   Terminal   │────▶│  Axum API    │────▶│  PostgreSQL  │               │
│   │   (Tauri)    │◀────│   (Rust)     │◀────│  (SQLx)      │               │
│   └──────────────┘     └──────┬───────┘     └──────────────┘               │
│                               │                                              │
│                               ▼                                              │
│                        ┌──────────────┐                                       │
│                        │   Solana     │                                       │
│                        │  (Contracts) │                                       │
│                        └──────────────┘                                       │
│                               │                                              │
│         ┌─────────────────────┼─────────────────────┐                      │
│         ▼                     ▼                     ▼                      │
│   ┌──────────┐         ┌──────────┐         ┌──────────┐                   │
│   │  Geyser  │         │  Jupiter │         │   Pyth   │                   │
│   │ (gRPC)   │         │ (Quotes) │         │ (Prices) │                   │
│   └──────────┘         └──────────┘         └──────────┘                   │
│                                                                              │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐               │
│   │ News Scraper │────▶│  PostgreSQL  │────▶│  React Web   │               │
│   │  (Python)    │     │   (News DB)  │     │   Dashboard  │               │
│   └──────────────┘     └──────────────┘     └──────────────┘               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘`}
                    </pre>
                </div>
                
                <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-red-400 mb-2">Data Flow: Trading</h3>
                        <p className="text-gray-400 text-sm">Terminal → Axum API → PostgreSQL. Terminal talks directly to Solana blockchain via RPC and Jupiter for quotes.</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-red-400 mb-2">Data Flow: News</h3>
                        <p className="text-gray-400 text-sm">Python Scraper → PostgreSQL → React Dashboard. News is pulled from 10+ RSS feeds, analyzed, and served via HTTP API.</p>
                    </div>
                </div>
            </Section>

            {/* Key Metrics */}
            <Section title="Performance" subtitle="What to Expect" delay={0.3}>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl text-center">
                        <div className="text-4xl font-black text-red-400 mb-2">&lt;50ms</div>
                        <p className="text-gray-400 text-sm">API Response Time</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl text-center">
                        <div className="text-4xl font-black text-red-400 mb-2">&lt;10%</div>
                        <p className="text-gray-400 text-sm">CPU Usage</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl text-center">
                        <div className="text-4xl font-black text-red-400 mb-2">30%</div>
                        <p className="text-gray-400 text-sm">Compute Unit Reduction</p>
                    </div>
                </div>
            </Section>

            {/* External Integrations */}
            <Section title="Integrations" subtitle="External Services We Connect To" delay={0.4}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-white mb-1">Jupiter</h3>
                        <p className="text-gray-400 text-xs">Best swap routes across all Solana DEXs</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-white mb-1">Pyth Network</h3>
                        <p className="text-gray-400 text-xs">High-fidelity price oracle data</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-white mb-1">Yellowstone Geyser</h3>
                        <p className="text-gray-400 text-xs">Sub-100ms account updates via gRPC</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-white mb-1">Jito</h3>
                        <p className="text-gray-400 text-xs">MEV protection via bundle submission</p>
                    </div>
                    <div className="bg-gray-900/50 border border-red-900/30 p-4 rounded-lg border-l-4 border-l-red-500">
                        <h3 className="font-bold text-red-400 mb-1">Astralane IRIS</h3>
                        <p className="text-gray-400 text-xs">High-speed transaction sender via optimised validator infrastructure</p>
                    </div>
                </div>
            </Section>

            {/* Astralane IRIS Deep Dive */}
            <Section title="Astralane IRIS" subtitle="High-Speed Transaction Sender" delay={0.5}>
                <div className="bg-gray-900/50 border border-red-900/30 p-6 rounded-xl">
                    <p className="text-gray-300 mb-6 leading-relaxed">
                        XFTerminal integrates Astralane's IRIS transaction sender as the primary submission layer for all trade execution. 
                        IRIS bypasses standard public RPC broadcast, routing transactions directly through optimised validator infrastructure 
                        for sub-second landing times. For HFT strategies and time-sensitive batch swaps, the difference between IRIS and 
                        standard RPC submission is the difference between a fill and a miss.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-black/40 border border-gray-800 p-4 rounded-lg">
                            <h4 className="font-bold text-red-400 mb-2">Type of Connection</h4>
                            <p className="text-gray-400 text-sm">Rust library integration — compiled directly into the terminal backend for minimal overhead</p>
                        </div>
                        <div className="bg-black/40 border border-gray-800 p-4 rounded-lg">
                            <h4 className="font-bold text-red-400 mb-2">What It Does</h4>
                            <p className="text-gray-400 text-sm">Optimised transaction landing with minimal propagation latency via direct validator routing</p>
                        </div>
                        <div className="bg-black/40 border border-gray-800 p-4 rounded-lg">
                            <h4 className="font-bold text-red-400 mb-2">Why It's Good</h4>
                            <p className="text-gray-400 text-sm">Built specifically for high-frequency Solana trading, not retrofitted from general-purpose RPC tooling</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Navigation */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex justify-between items-center mt-12 pt-8 border-t border-gray-800"
            >
                <Link to="/architecture/crypto" className="text-gray-400 hover:text-red-400 transition-colors">
                    ← News Service
                </Link>
                <Link to="/architecture" className="text-red-400 hover:text-red-300 transition-colors">
                    Back to Architecture Overview →
                </Link>
            </motion.div>
        </div>
    );
}
