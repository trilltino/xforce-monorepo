import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PartCard = ({ title, description, to }) => (
    <Link to={to} className="block bg-gray-900/50 border border-gray-800 p-6 rounded-xl hover:border-red-500/50 transition-colors group">
        <h3 className="font-bold text-white mb-2 text-lg group-hover:text-red-400 transition-colors">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
        <span className="text-red-500 text-sm mt-4 inline-block">Learn more →</span>
    </Link>
);

const ConnectionItem = ({ children }) => (
    <li className="flex items-start">
        <span className="text-red-500 mr-3 mt-1">→</span>
        <span className="text-gray-300">{children}</span>
    </li>
);

export default function ArchitectureOverview() {
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
                    <span className="text-red-500">Big</span>
                    <span className="text-white">Picture</span>
                    <span className="text-red-500">.</span>
                </h1>
                <p className="text-2xl text-gray-400 font-light tracking-wide font-sans">
                    How Everything Works Together
                </p>
            </motion.div>

            {/* Restaurant Analogy */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12"
            >
                <div className="bg-black/40 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
                    <p className="text-gray-300 text-lg mb-8 font-sans leading-relaxed">
                        XForce Terminal is actually <strong className="text-red-400">three separate projects</strong> that work together to create a complete trading platform. Think of it like a restaurant: you have the dining room (the terminal), the kitchen (the contracts), and the news feed (crypto info) — they all need to work together to give you a great experience.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <PartCard 
                            title="Trading Terminal" 
                            description="This is what you see and use — the desktop app where you trade. It has a beautiful desktop interface (like Bloomberg terminals), a backend server that handles your requests, and a web wallet helper."
                            to="/architecture/backend"
                        />
                        <PartCard 
                            title="Smart Contracts" 
                            description="These are special programs that live on the Solana blockchain. Their main job is to let you do multiple trades in one transaction, which saves you a lot of money on fees."
                            to="/architecture/contracts"
                        />
                        <PartCard 
                            title="News Service" 
                            description="This is like a news aggregator. It constantly scrapes the web for crypto news, analyzes whether articles are positive or negative, and serves them to your terminal."
                            to="/architecture/crypto"
                        />
                    </div>
                </div>
            </motion.div>

            {/* How Everything Connects */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
            >
                <h2 className="text-3xl font-bold text-white mb-6 font-heading">How Everything Connects</h2>
                <div className="bg-black/40 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
                    <ul className="space-y-4">
                        <ConnectionItem>
                            <strong className="text-white">Trading Terminal</strong> uses the <strong className="text-white">Client Library</strong> from Smart Contracts to interact with blockchain programs (compiled into the app)
                        </ConnectionItem>
                        <ConnectionItem>
                            <strong className="text-white">Trading Terminal</strong> requests news from the <strong className="text-white">News Service</strong> via HTTP API (port 3003)
                        </ConnectionItem>
                        <ConnectionItem>
                            <strong className="text-white">Smart Contracts</strong> are deployed to the <strong className="text-white">Solana Blockchain</strong> where they execute batch swaps
                        </ConnectionItem>
                        <ConnectionItem>
                            <strong className="text-white">Trading Terminal</strong> asks <strong className="text-white">Jupiter</strong> for the best swap prices across all DEXs
                        </ConnectionItem>
                        <ConnectionItem>
                            <strong className="text-white">Trading Terminal</strong> sends transactions directly to <strong className="text-white">Solana Blockchain</strong> via RPC
                        </ConnectionItem>
                    </ul>
                    
                    <p className="text-gray-400 text-sm mt-6 italic border-t border-gray-800 pt-6">
                        All three projects are independent but designed to work together seamlessly. The terminal uses contracts via a library (compiled into the app), connects to the news service over HTTP, and communicates with Solana blockchain and Jupiter aggregator directly.
                    </p>
                </div>
            </motion.div>

            {/* Navigation to other sections */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                <Link to="/architecture/backend" className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg hover:border-red-500/50 transition-colors text-center">
                    <span className="text-red-400 font-bold">Backend</span>
                    <p className="text-gray-500 text-sm mt-1">Rust API Details</p>
                </Link>
                <Link to="/architecture/contracts" className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg hover:border-red-500/50 transition-colors text-center">
                    <span className="text-red-400 font-bold">Contracts</span>
                    <p className="text-gray-500 text-sm mt-1">Smart Contract Code</p>
                </Link>
                <Link to="/architecture/crypto" className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg hover:border-red-500/50 transition-colors text-center">
                    <span className="text-red-400 font-bold">News</span>
                    <p className="text-gray-500 text-sm mt-1">Python Scraper</p>
                </Link>
                <Link to="/architecture/system" className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg hover:border-red-500/50 transition-colors text-center">
                    <span className="text-red-400 font-bold">System</span>
                    <p className="text-gray-500 text-sm mt-1">Full Architecture</p>
                </Link>
            </motion.div>
        </div>
    );
}
