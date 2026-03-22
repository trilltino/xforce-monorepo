const competitors = [
    {
        name: 'Birdeye',
        url: 'https://birdeye.so',
        tag: 'Data Analytics',
        tagColor: 'blue',
        description: 'The leading data analytics platform in the Solana ecosystem, processing over $1 billion in daily trading volume data.',
        limitation: 'A data dashboard — no native execution layer, no open infrastructure, no developer primitives to build on.',
    },
    {
        name: 'Axiom',
        url: 'https://axiom.trade',
        tag: 'Memecoin Trading',
        tagColor: 'yellow',
        description: 'Dominates memecoin trading through a browser interface — YC-backed, closed source, built for casual speculation.',
        limitation: 'No programmable infrastructure layer. No forkable stack. Built for latency-insensitive retail, not professional ops.',
    },
    {
        name: 'Jupiter Terminal',
        url: 'https://coinpedia.org/news/jupiter-unveils-jupusd-stablecoin-and-major-defi-upgrades-at-solana-breakpoint-2025/',
        tag: 'Most Formidable',
        tagColor: 'orange',
        description: 'Introduced at Breakpoint 2025: an all-in-one Terminal with spot trading, perps, wallet tracking, and market data on their Ultra V3 engine. In January 2026, launched Mobile V3 — "the first fully native pro trading mobile terminal."',
        limitation: 'Closed source. Does not expose a programmable infrastructure layer. Does not ship as forkable Rust libraries the ecosystem can build on. Validates the market — then proves the gap.',
        note: 'Jupiter Mobile V3 launch: https://crypto.news/jupiter-launches-mobile-v3-native-pro-trading-2026/',
    },
];

const tagColors = {
    blue: 'bg-blue-900/30 text-blue-400 border-blue-800',
    yellow: 'bg-yellow-900/30 text-yellow-400 border-yellow-800',
    orange: 'bg-orange-900/30 text-orange-400 border-orange-800',
};

export default function Competition() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">
                    <span className="text-red-500">XF</span>Terminal — Competitive Landscape
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    The existing tools are web and mobile-first by design — and that is precisely their limitation.
                </p>
            </div>

            <div className="space-y-6 mb-16">
                {competitors.map((c) => (
                    <div key={c.name} className="bg-gray-900 border border-gray-800 hover:border-red-900/60 rounded-xl p-8 transition-colors duration-300">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <a href={c.url} target="_blank" rel="noopener noreferrer"
                                className="text-2xl font-bold text-white hover:text-red-400 transition-colors">
                                {c.name} ↗
                            </a>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${tagColors[c.tagColor]}`}>
                                {c.tag}
                            </span>
                        </div>
                        <p className="text-gray-300 mb-3">{c.description}</p>
                        <p className="text-red-400/80 text-sm font-medium border-l-2 border-red-600 pl-4">{c.limitation}</p>
                        {c.note && (
                            <p className="mt-3 text-gray-500 text-xs">
                                <a href={c.note} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors underline underline-offset-2">{c.note}</a>
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-gradient-to-br from-red-950/40 to-gray-900 border border-red-900/40 rounded-xl p-10 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">The Gap Nobody Filled</h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    None of the above are <span className="text-red-400 font-semibold">open source</span>.
                    None expose a <span className="text-red-400 font-semibold">developer API</span>.
                    None give the next bot builder, algo trader, or Solana dev a reference stack to build on.
                </p>
                <p className="mt-6 text-xl font-bold text-white">
                    XForce Terminal is the open infrastructure layer none of them chose to build.
                </p>
            </div>
        </div>
    );
}
