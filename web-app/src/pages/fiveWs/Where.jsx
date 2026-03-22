export default function Where() {
    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <p className="text-red-400 font-mono text-sm mb-2">WHERE</p>
                <h1 className="text-5xl font-bold text-white mb-4">Where does this live?</h1>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                    Everything is public, open source, and verifiable. The showcase, the apps, the code — all linked below.
                </p>
            </div>

            <div className="space-y-4 mb-16">
                <a href="https://trilltino.github.io/xfterminal/" target="_blank" rel="noopener noreferrer"
                    className="group flex items-start gap-6 bg-gray-900 border border-gray-800 hover:border-red-600/50 rounded-xl p-7 transition-colors">
                    <div className="w-12 h-12 bg-red-600/20 border border-red-600/40 rounded-lg flex items-center justify-center shrink-0 text-red-400 font-bold text-lg">W</div>
                    <div>
                        <p className="text-white font-bold text-lg group-hover:text-red-400 transition-colors mb-1">Showcase Site ↗</p>
                        <p className="text-red-400 text-sm font-mono mb-2">trilltino.github.io/xfterminal</p>
                        <p className="text-gray-400 text-sm leading-relaxed">The public-facing web showcase for XForce Terminal — overview, terminal interface, and guide all accessible from one place.</p>
                    </div>
                </a>

                <div className="grid md:grid-cols-2 gap-4">
                    <a href="https://trilltino.github.io/xfterminal/?/guide" target="_blank" rel="noopener noreferrer"
                        className="group bg-gray-900 border border-gray-800 hover:border-red-600/50 rounded-xl p-6 transition-colors">
                        <p className="text-white font-bold group-hover:text-red-400 transition-colors mb-1">XFGuide ↗</p>
                        <p className="text-red-400 text-xs font-mono mb-3">trilltino.github.io/xfterminal/?/guide</p>
                        <p className="text-gray-400 text-sm leading-relaxed">Bloomberg-style Solana Market Concepts curriculum. A companion app shipped alongside the terminal — getting started guide and education in one place.</p>
                    </a>
                    <a href="https://trilltino.github.io/xfterminal/terminal" target="_blank" rel="noopener noreferrer"
                        className="group bg-gray-900 border border-gray-800 hover:border-red-600/50 rounded-xl p-6 transition-colors">
                        <p className="text-white font-bold group-hover:text-red-400 transition-colors mb-1">XFTerminal ↗</p>
                        <p className="text-red-400 text-xs font-mono mb-3">trilltino.github.io/xfterminal/terminal</p>
                        <p className="text-gray-400 text-sm leading-relaxed">The live terminal interface — real-time Solana market data, swap execution, and the full DeFi stack accessible from the browser showcase.</p>
                    </a>
                </div>

                <a href="https://github.com/trilltino/xforce-monorepo" target="_blank" rel="noopener noreferrer"
                    className="group flex items-start gap-6 bg-gray-900 border border-gray-800 hover:border-red-600/50 rounded-xl p-7 transition-colors">
                    <div className="w-12 h-12 bg-red-600/20 border border-red-600/40 rounded-lg flex items-center justify-center shrink-0 text-red-400 font-bold text-lg">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </div>
                    <div>
                        <p className="text-white font-bold text-lg group-hover:text-red-400 transition-colors mb-1">XForce Monorepo ↗</p>
                        <p className="text-red-400 text-sm font-mono mb-2">github.com/trilltino/xforce-monorepo</p>
                        <p className="text-gray-400 text-sm leading-relaxed">Full DeFi ecosystem including terminal, contracts, and supporting infrastructure. Every component open source — lib-solana, lib-core, lib-web — documented, benchmarked, and forkable. The reference stack the Solana ecosystem can build on.</p>
                    </div>
                </a>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Built on Solana</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    XForce Terminal lives on Solana devnet throughout the 4-month build — all contracts deployed, all benchmarks verifiable, all transactions logged on-chain. Mainnet deployment follows post-grant, self-funded.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    Solana already has the largest retail trading base of any chain — millions of active wallets, billions in daily volume. The Pyth Network, Jupiter, Phoenix, Drift, Jito, and Bags protocols are all live and production-ready. XForce Terminal is the layer that connects them into a unified, open, native desktop stack.
                </p>
            </div>
        </div>
    );
}
