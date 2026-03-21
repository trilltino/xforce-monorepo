import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MenuCard = ({ title, subtitle, description, to, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
    >
        <Link 
            to={to} 
            className="block bg-gray-900/50 border border-gray-800 p-8 rounded-2xl hover:border-red-500/50 transition-all group h-full"
        >
            <h2 className="text-2xl font-bold mb-2 font-heading">
                <span className="text-red-500">{title.split(' ')[0]}</span>
                <span className="text-white"> {title.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-red-400 text-sm mb-4 font-sans">{subtitle}</p>
            <p className="text-gray-400 font-sans text-sm mb-6">{description}</p>
            <span className="text-red-500 text-sm font-semibold group-hover:text-red-400 transition-colors">
                Explore →
            </span>
        </Link>
    </motion.div>
);

export default function Architecture() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h1 className="text-6xl md:text-7xl font-black mb-4 font-heading tracking-tight">
                    <span className="text-red-500">XF</span>
                    <span className="text-white">Architecture</span>
                    <span className="text-red-500">.</span>
                </h1>
                <p className="text-2xl text-gray-400 font-light tracking-wide font-sans">
                    Technical architecture and system design
                </p>
            </motion.div>

            {/* Menu Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MenuCard 
                    title="Big Picture"
                    subtitle="Overview"
                    description="How everything works together. The restaurant analogy explaining the three main components and how they connect."
                    to="/architecture/overview"
                    delay={0.1}
                />
                <MenuCard 
                    title="xforce-terminal"
                    subtitle="Rust Backend API"
                    description="The backend server that handles authentication, market data, and WebSocket connections for real-time price feeds."
                    to="/architecture/backend"
                    delay={0.2}
                />
                <MenuCard 
                    title="xforce-contracts"
                    subtitle="Solana Smart Contracts"
                    description="Anchor-based contracts for batch token swaps with security validations, slippage protection, and protocol fee management."
                    to="/architecture/contracts"
                    delay={0.3}
                />
                <MenuCard 
                    title="xforce-crypto"
                    subtitle="News Aggregation"
                    description="Python-based news scraper with RSS feed aggregation, sentiment analysis using NLTK/VADER, and PostgreSQL storage."
                    to="/architecture/crypto"
                    delay={0.4}
                />
                <MenuCard 
                    title="System Overview"
                    subtitle="Full Architecture"
                    description="Complete technology stack breakdown, data flow diagrams, performance metrics, and external integrations."
                    to="/architecture/system"
                    delay={0.5}
                />
            </div>

            {/* Quick Summary */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-16 bg-black/40 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm"
            >
                <h2 className="text-2xl font-bold text-white mb-4 font-heading">Quick Summary</h2>
                <p className="text-gray-400 font-sans leading-relaxed">
                    XForce Terminal is built from <strong className="text-white">three independent projects</strong> that work together: 
                    a <strong className="text-red-400">Rust backend</strong> (Axum) handling API requests and WebSockets, 
                    <strong className="text-red-400"> Solana smart contracts</strong> (Anchor) for batch token swaps, 
                    and a <strong className="text-red-400">Python news service</strong> for sentiment analysis. 
                    All connected through a <strong className="text-white">Tauri-based desktop frontend</strong> that provides 
                    institutional-grade trading capabilities with sub-50ms latency.
                </p>
            </motion.div>
        </div>
    );
}
