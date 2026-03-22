import { Link } from 'react-router-dom';

export default function Who() {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <p className="text-red-400 font-mono text-sm mb-2">WHO</p>
                <h1 className="text-5xl font-bold text-white mb-4">Who is building this?</h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    A self-taught Rust engineer who pivoted from law to systems programming — and built the infrastructure to prove it.
                </p>
            </div>

            <div className="flex flex-col items-center mb-12">
                <img src={`${import.meta.env.BASE_URL}images/tino.webp`} alt="Tino" className="w-40 h-40 rounded-full object-cover border-4 border-red-600 shadow-2xl mb-6" />
                <h2 className="text-3xl font-bold text-white mb-1">Tino</h2>
                <p className="text-red-400 font-medium mb-6">Open Source Software Engineer — Rust, Solana, Distributed Systems</p>
                <div className="flex items-center gap-6">
                    <a href="https://www.linkedin.com/in/valentine-i-b0619b2b6/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="https://github.com/trilltino" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="https://x.com/StellarEuropa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                </div>
            </div>

            <div className="space-y-6 mb-12">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                    <h3 className="text-white font-bold text-xl mb-4">Background</h3>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>After graduating in Law from the University of Warwick, I pivoted to software engineering and taught myself Rust through building real systems — not tutorials, not toy projects, but production infrastructure with real constraints.</p>
                        <p>I specialise in distributed systems and blockchain infrastructure, building full-stack applications using Leptos, Axum, and Tauri, with focus on P2P protocols and decentralised architecture. I have contributed to IETF protocol implementations, built P2P networking layers, and developed Solana smart contracts.</p>
                        <p>XForce Terminal is the convergence of everything I have built toward — a production-grade, open-source trading terminal that treats performance as a first-class requirement, not an afterthought.</p>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                    <h3 className="text-white font-bold text-xl mb-4">Superteam UK</h3>
                    <p className="text-gray-400 leading-relaxed">
                        Currently active in Superteam UK, contributing to ecosystem growth through developer education and open-source tooling. My work spans protocol-level engineering, DeFi infrastructure, and making decentralised technologies more accessible to developers worldwide. XForce Terminal is being built in public within this community — the 12 technical articles published throughout the build are part of that commitment.
                    </p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                    <h3 className="text-white font-bold text-xl mb-4">Why me?</h3>
                    <p className="text-gray-400 leading-relaxed">
                        I am not a team of twenty. I am one engineer who has shipped the contracts, the data pipelines, the P2P layer, and the frontend — and documented every architectural decision publicly. The grant funds four months of focused, verifiable devnet development. Every commit is public. Every benchmark is reproducible. Every article is permanent.
                    </p>
                </div>
            </div>

            <div className="text-center">
                <Link to="/projects" className="inline-block px-6 py-3 border border-red-600 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors font-medium">
                    View Proof of Work
                </Link>
            </div>
        </div>
    );
}
