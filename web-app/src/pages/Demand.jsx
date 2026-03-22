const signals = [
    {
        quote: 'The Solana Foundation\'s own Indexer Tooling RFP acknowledged that Geyser "does not provide an ergonomic end-to-end solution for developers."',
        detail: 'XForce Terminal\'s Milestone 1.1 is that solution: a production Rust Geyser pipeline, open source and forkable.',
        source: null,
    },
    {
        quote: '"If your bot is reading from a public RPC, you\'re already late."',
        detail: 'XForce Terminal fixes this at the infrastructure level and exposes it via a REST API with Python, JavaScript, and Rust bot integrations — so the next developer doesn\'t rebuild the data layer from scratch.',
        source: null,
    },
    {
        quote: 'Bots on public RPC are already 200ms behind validators, missing price updates that arrive between polling intervals.',
        detail: 'The XForce Terminal data stack (Geyser primary, Pyth secondary, Jupiter tertiary with automatic failover) gives any developer access to infrastructure previously requiring advanced operator setup.',
        source: null,
    },
    {
        quote: 'Solana displaced Ethereum as the top ecosystem for new developers in 2024 — 7,625 new developers joining (83% growth).',
        detail: 'All of whom need open reference architecture to build on. XForce Terminal is that reference: every component ships as a modular Rust library, documented, benchmarked, and production-ready.',
        source: null,
    },
];

const endorsements = [
    {
        name: 'CHOPPAtheSHARK',
        role: 'Moderator, Pyth Network',
        quote: '"Seems like something people could certainly use"',
        detail: 'Encouraged submission as a hackathon project. March 2026.',
        img: 'https://postimg.cc/9zDvfbLb',
    },
    {
        name: 'Aditya520',
        role: 'Moderator, Pyth Network',
        quote: '"Great idea. Happy to help you in any way possible."',
        detail: '"If you want to extend the data layer at all (historical OHLC, broader asset coverage), Pyth Pro API and the MCP server are worth a look. Happy to point you to the right docs." March 2026.',
        img: 'https://postimg.cc/0bKKwSzW',
    },
];

export default function Demand() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">
                    <span className="text-red-500">XF</span>Terminal — Demand
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    The infrastructure gap is documented, quantified, and acknowledged by the ecosystem itself.
                </p>
            </div>

            <div className="space-y-6 mb-16">
                {signals.map((s, i) => (
                    <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                        <blockquote className="text-lg text-white font-medium italic border-l-4 border-red-500 pl-6 mb-4">
                            {s.quote}
                        </blockquote>
                        <p className="text-gray-400 leading-relaxed">{s.detail}</p>
                    </div>
                ))}
            </div>

            <div className="mb-16">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Ecosystem Validation</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {endorsements.map((e, i) => (
                        <div key={i} className="bg-gray-900 border border-gray-800 hover:border-red-900/60 rounded-xl p-8 transition-colors duration-300">
                            <p className="text-xl text-white font-semibold italic mb-4">{e.quote}</p>
                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">{e.detail}</p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-bold">{e.name}</p>
                                    <p className="text-red-400 text-sm">{e.role}</p>
                                </div>
                                <a href={e.img} target="_blank" rel="noopener noreferrer"
                                    className="text-xs text-gray-500 hover:text-red-400 transition-colors underline underline-offset-2">
                                    View screenshot ↗
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-br from-red-950/40 to-gray-900 border border-red-900/40 rounded-xl p-10 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">The Reference Stack</h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    XForce Terminal is that reference: every component ships as a{' '}
                    <span className="text-red-400 font-semibold">modular Rust library</span>, documented, benchmarked, and production-ready.
                </p>
            </div>
        </div>
    );
}
