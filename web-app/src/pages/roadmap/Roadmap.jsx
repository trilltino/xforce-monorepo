import { Link } from 'react-router-dom';

const months = [
    {
        num: 1, budget: '625 USDC',
        title: 'Geyser Integration & Beta Release',
        path: '/roadmap/month1',
        criteria: 'Geyser pipeline live, sub-100ms benchmarked. Beta v0.1.0 released. 50+ downloads. 100+ waitlist signups. 3 articles published.',
    },
    {
        num: 2, budget: '625 USDC',
        title: 'Pinocchio Optimisation & SocialFi Layer',
        path: '/roadmap/month2',
        criteria: 'Pinocchio batch swap router on devnet, 30% CU reduction verified. SocialFi layer live in Beta v0.2.0. E2EE operational. 20+ developer signups. 3 articles published.',
    },
    {
        num: 3, budget: '625 USDC',
        title: 'Advanced Trading & Security',
        path: '/roadmap/month3',
        criteria: 'Phoenix and Drift integrated on devnet. Jito MEV protection live and verified. Peer review published. 80%+ test coverage. 1,000+ devnet transactions.',
    },
    {
        num: 4, budget: '625 USDC',
        title: 'Devnet Completion & Mainnet Readiness',
        path: '/roadmap/month4',
        criteria: 'Devnet build complete and publicly verifiable. All 12 articles published. 50+ developers engaged with API or libs. Codebase forkable with complete documentation.',
    },
];

const goals = [
    {
        title: 'Sub-100ms Market Data Infrastructure',
        body: 'Replace RPC polling with a production Yellowstone Geyser gRPC pipeline. Real-time data delivery that matches institutional trading infrastructure — not a prototype, a deployed system.',
    },
    {
        title: 'Production-Grade Open-Source Pinocchio Batch Swap Router',
        body: 'Convert the Anchor batch swap program to Pinocchio — zero-copy, no-std, 30% compute unit reduction. A public reference implementation that any Solana developer can learn from and build on.',
    },
    {
        title: 'Non-Custodial Terminal with Decentralised Social Layer',
        body: 'XForce Terminal v1.0.0 on mainnet — full DeFi functionality with P2P messaging via Iroh, E2EE via p2panda Double Ratchet, and Bags token economics. No centralised server holding user data.',
    },
    {
        title: 'MEV-Resistant Execution at the Program Level',
        body: 'Jito bundle integration live in production. Every trade protected from front-running and sandwiching by default — not an optional feature, a baseline guarantee.',
    },
    {
        title: 'Developer Reference Architecture for the Solana Ecosystem',
        body: 'Every component open source. The Geyser pipeline, the Pinocchio contracts, the SocialFi stack — documented, tested, and forkable. A codebase that raises the technical floor for UK Solana developers.',
    },
];

export default function Roadmap() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">
                    <span className="text-red-500">XF</span>Terminal — Roadmap
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    All development and benchmarking is conducted on Solana devnet. Mainnet deployment follows post-grant, self-funded.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
                {months.map((m) => (
                    <Link key={m.num} to={m.path} className="group block bg-gray-900 border border-gray-800 hover:border-red-600/50 rounded-xl p-8 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bold text-white text-lg shrink-0">{m.num}</div>
                            <div>
                                <p className="text-red-400 text-sm font-mono">{m.budget}</p>
                                <h2 className="text-white font-bold text-lg leading-tight">Month {m.num} — {m.title}</h2>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{m.criteria}</p>
                        <span className="text-red-400 text-sm group-hover:translate-x-1 inline-block transition-transform">View milestones →</span>
                    </Link>
                ))}
            </div>

            <div className="border-t border-gray-800 pt-16">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Overall Goals</h2>
                <div className="space-y-4">
                    {goals.map((g, i) => (
                        <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <h3 className="text-white font-bold text-lg mb-2">{g.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{g.body}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-8 bg-red-950/30 border border-red-900/40 rounded-xl p-6 text-center">
                    <p className="text-gray-300">
                        <span className="text-red-400 font-semibold">50+ developers</span> using the open libs —{' '}
                        <span className="text-red-400 font-semibold">12 articles</span> published —{' '}
                        devnet transaction count verifiable — codebase forkable with documentation complete.
                    </p>
                </div>
            </div>
        </div>
    );
}
