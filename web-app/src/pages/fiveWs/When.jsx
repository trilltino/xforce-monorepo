import { Link } from 'react-router-dom';

const kpis = [
    { metric: '1,000+', label: 'Devnet Transactions', desc: 'Primary KPI — executed through XForce Terminal on Solana devnet within the 4-month grant period. Verifiable on-chain. Confirms the terminal is functional, the infrastructure performs as specified, and real usage is happening.' },
    { metric: '30%', label: 'Compute Unit Reduction', desc: 'Pinocchio vs Anchor baseline — verified on every swap type. Documented and reproducible.' },
    { metric: '<100ms', label: 'Geyser Data Latency', desc: 'Sub-100ms delivery confirmed against RPC polling benchmark. Before/after numbers published.' },
    { metric: '80%+', label: 'Test Coverage', desc: 'Across all crates — unit tests, integration tests, and property-based fuzz testing for arithmetic edge cases.' },
    { metric: '50+', label: 'Developer Engagements', desc: 'Developers using the open libs or REST API — tracked via GitHub and developer program signups.' },
    { metric: '12', label: 'Technical Articles', desc: 'Published throughout the build — open-sourcing the learnings for the wider Solana developer community.' },
];

const months = [
    { num: 1, budget: '625 USDC', title: 'Geyser Integration & Beta Release', path: '/roadmap/month1', criteria: 'Geyser pipeline live, sub-100ms benchmarked. Beta v0.1.0 released. 50+ downloads. 100+ waitlist signups.' },
    { num: 2, budget: '625 USDC', title: 'Pinocchio Optimisation & SocialFi Layer', path: '/roadmap/month2', criteria: 'Pinocchio router on devnet, 30% CU reduction verified. SocialFi live. E2EE operational. 20+ developer signups.' },
    { num: 3, budget: '625 USDC', title: 'Advanced Trading & Security', path: '/roadmap/month3', criteria: 'Phoenix and Drift on devnet. Jito MEV protection live. Peer review published. 80%+ test coverage. 1,000+ devnet transactions.' },
    { num: 4, budget: '625 USDC', title: 'Devnet Completion & Mainnet Readiness', path: '/roadmap/month4', criteria: 'Devnet build complete, publicly verifiable. All 12 articles published. 50+ developer engagements. Mainnet roadmap published.' },
];

export default function When() {
    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <p className="text-red-400 font-mono text-sm mb-2">WHEN</p>
                <h1 className="text-5xl font-bold text-white mb-4">When does this ship?</h1>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                    4 months from grant approval — all devnet. Mainnet deployment follows post-grant, self-funded. Every milestone is verifiable on-chain.
                </p>
            </div>

            <div className="bg-gray-900 border border-red-900/40 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-white mb-2">Primary KPI</h2>
                <p className="text-4xl font-black text-red-500 mb-2">1,000+ Devnet Transactions</p>
                <p className="text-gray-400 leading-relaxed">
                    Executed through XForce Terminal on Solana devnet within the 4-month grant period. Verifiable on-chain. This metric confirms the terminal is functional, the infrastructure performs as specified, and real usage is happening — not just code sitting in a repository.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-12">
                {kpis.slice(1).map((k, i) => (
                    <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <p className="text-red-400 text-2xl font-black mb-1">{k.metric}</p>
                        <p className="text-white font-bold mb-2">{k.label}</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{k.desc}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">4-Month Build Schedule</h2>
            <div className="space-y-4 mb-12">
                {months.map((m) => (
                    <Link key={m.num} to={m.path} className="group block bg-gray-900 border border-gray-800 hover:border-red-600/50 rounded-xl p-6 transition-colors">
                        <div className="flex items-center gap-4 mb-2">
                            <span className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0">{m.num}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-red-400 text-xs font-mono">{m.budget}</p>
                                <p className="text-white font-bold">Month {m.num} — {m.title}</p>
                            </div>
                            <span className="text-red-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity shrink-0">Details →</span>
                        </div>
                        <p className="text-gray-400 text-sm pl-13 leading-relaxed ml-13">{m.criteria}</p>
                    </Link>
                ))}
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                <p className="text-gray-400">
                    Success threshold: <span className="text-white font-semibold">1,000+ devnet transactions</span> — <span className="text-white font-semibold">80%+ test coverage</span> — <span className="text-white font-semibold">50+ developer engagements</span> — all benchmarks documented and published.
                </p>
                <p className="text-gray-500 text-sm mt-2">All development and benchmarking is conducted on Solana devnet. Mainnet deployment follows post-grant, self-funded.</p>
            </div>
        </div>
    );
}
