export default function Why() {
    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <p className="text-red-400 font-mono text-sm mb-2">WHY</p>
                <h1 className="text-5xl font-bold text-white mb-4">Why does this need to exist?</h1>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                    Solana has the primitives to support institutional-grade trading. The ecosystem just has not built the infrastructure layer to unlock them — until now.
                </p>
            </div>

            <div className="space-y-6 mb-16">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">The Problem</h2>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>The Solana DeFi ecosystem lacks professional-grade native trading infrastructure. Every serious tool is web-based — constrained by browser performance, dependent on centralised RPC providers, and fragmented across platforms that were never designed to work together. Retail interfaces are sufficient for casual users but fall apart under the demands of low-latency or large-scale trading operations.</p>
                        <p>Developers building algorithmic strategies, trading bots, or social trading platforms have no open reference stack to build on. Market data, execution, order management, and risk controls exist as separate pieces with no unified foundation connecting them. Every serious builder starts from scratch.</p>
                        <p>The data problem compounds this. RPC polling introduces delays that are unacceptable in fast markets. Low-latency validator feeds exist but are locked behind advanced operator infrastructure, inaccessible through standard development tooling. MEV exposure is unaddressed by default. Batch execution across multiple DEXs requires substantial custom engineering with no shared patterns to reference.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-900 border border-red-900/30 rounded-xl p-6">
                        <h3 className="text-red-400 font-bold mb-3">Browser Ceiling</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Web-based tools hit a hard performance ceiling. Browser sandboxing, network overhead, and JavaScript runtime constraints make sub-100ms data delivery impossible at scale.</p>
                    </div>
                    <div className="bg-gray-900 border border-red-900/30 rounded-xl p-6">
                        <h3 className="text-red-400 font-bold mb-3">No Open Stack</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">None of the leading tools are open source. None expose a developer API. Every bot builder, algo trader, and Solana dev rebuilds the same infrastructure from scratch with no shared reference.</p>
                    </div>
                    <div className="bg-gray-900 border border-red-900/30 rounded-xl p-6">
                        <h3 className="text-red-400 font-bold mb-3">MEV by Default</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">MEV exposure is unaddressed by default across every existing tool. Users are front-run and sandwiched on every significant trade with no opt-out and no protection.</p>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Why Solana?</h2>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>Solana already has the largest retail trading base of any chain — millions of active wallets, billions in daily volume, a proven user base that is already here. The ecosystem has the primitives to serve that demand at an institutional level.</p>
                        <p>Solana displaced Ethereum as the top ecosystem for new developers in 2024, with 7,625 new developers joining — 83% growth year-on-year. All of whom need open reference architecture to build on. All of whom face the same fragmented infrastructure problem.</p>
                        <p className="text-white font-medium">What Solana lacks is the unified open infrastructure layer to connect its primitives. That is exactly what XForce Terminal builds.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
