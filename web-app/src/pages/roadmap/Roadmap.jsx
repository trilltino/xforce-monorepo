import { Link } from 'react-router-dom';

const roadmapCards = [
    {
        month: 1,
        amount: "$625 USDC",
        description: "Geyser Integration & Beta Release — Sub-100ms market data via Yellowstone Geyser, multi-source price feeds, beta v0.1.0 release, RPC infrastructure hardening",
        path: "/roadmap/month1"
    },
    {
        month: 2,
        amount: "$625 USDC",
        description: "Pinocchio Optimisation & SocialFi Layer — 30% CU reduction, Iroh P2P messaging, Braid CRDT sync, p2panda E2EE encryption, Bags SDK integration",
        path: "/roadmap/month2"
    },
    {
        month: 3,
        amount: "$625 USDC",
        description: "Advanced Trading & Security — Phoenix CLOB & Drift perps, Jito MEV protection, security review, comprehensive test infrastructure",
        path: "/roadmap/month3"
    },
    {
        month: 4,
        amount: "$625 USDC",
        description: "Devnet Completion & Mainnet Readiness — Contract verification, Developer API, ecosystem building, community documentation",
        path: "/roadmap/month4"
    }
];

export default function Roadmap() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    Roadmap
                </h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2 font-sans">2,500 USDC</p>
                <p className="text-lg text-gray-500 dark:text-gray-500 font-sans">
                    Development roadmap and milestones for XForce Terminal
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-600 font-sans mt-2">
                    All development and benchmarking conducted on Solana devnet. Mainnet deployment follows post-grant, self-funded.
                </p>
            </div>

            {/* Roadmap Cards Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                {roadmapCards.map((card) => (
                    <Link key={card.month} to={card.path} className="group">
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black border border-primary-900/50 rounded-xl p-8 shadow-2xl hover:border-primary-500 transition-all duration-300 hover:scale-105">
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white font-bold text-2xl">{card.month}</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading group-hover:text-primary-400 transition-colors">Month {card.month}</h2>
                                    <p className="text-primary-600 dark:text-primary-400 font-sans">{card.amount}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                                {card.description}
                            </p>
                            <div className="flex items-center text-primary-600 dark:text-primary-400 group-hover:text-primary-500 transition-colors">
                                <span className="mr-2">View Details</span>
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
