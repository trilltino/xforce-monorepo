import { Link } from 'react-router-dom';

const pages = [
    { to: '/who', label: 'Who?', summary: 'The engineer behind XForce Terminal — background, Superteam UK, and why this project exists.' },
    { to: '/what', label: 'What?', summary: 'What XForce Terminal is — project summary, core components, and links to the live apps and repo.' },
    { to: '/why', label: 'Why?', summary: 'The problem with the current Solana tooling landscape and why native infrastructure matters.' },
    { to: '/when', label: 'When?', summary: '4-month build schedule, KPIs, success thresholds, and verifiable milestones.' },
    { to: '/where', label: 'Where?', summary: 'Showcase site, XFGuide, XFTerminal app, and the open-source monorepo — all public.' },
    { to: '/how', label: 'How?', summary: 'The four-layer technical architecture — Geyser, Pinocchio + Jito, Iroh + p2panda, and the developer API.' },
];

export default function FiveWs() {
    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <div className="text-center mb-16">
                <p className="text-red-400 font-mono text-sm mb-2">5Ws & H</p>
                <h1 className="text-5xl font-bold text-white mb-4">The Full Picture</h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Everything you need to understand XForce Terminal — who built it, what it is, why it matters, when it ships, where to find it, and how it works.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-16">
                {pages.map((p) => (
                    <Link key={p.to} to={p.to} className="group block bg-gray-900 border border-gray-800 hover:border-red-600/50 rounded-xl p-7 transition-all duration-200">
                        <p className="text-red-500 text-3xl font-black mb-3 group-hover:text-red-400 transition-colors">{p.label}</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{p.summary}</p>
                        <span className="mt-4 inline-block text-red-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Read more →</span>
                    </Link>
                ))}
            </div>

            <div className="bg-gradient-to-br from-red-950/40 to-gray-900 border border-red-900/40 rounded-xl p-10 text-center">
                <p className="text-2xl font-bold text-white mb-3">XForce Terminal</p>
                <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    An open-source native Rust trading terminal for Solana — replacing browser-based tools with a high-performance desktop stack built on Geyser, Pinocchio, Jito, and Iroh. The open infrastructure layer Solana trading has been missing.
                </p>
                <div className="flex flex-wrap gap-3 justify-center mt-6">
                    <a href="https://github.com/trilltino/xforce-monorepo" target="_blank" rel="noopener noreferrer"
                        className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors text-sm">
                        View Monorepo ↗
                    </a>
                    <Link to="/roadmap" className="px-5 py-2 border border-gray-700 hover:border-red-500 text-gray-300 hover:text-white font-bold rounded-lg transition-colors text-sm">
                        See Roadmap
                    </Link>
                </div>
            </div>
        </div>
    );
}
