const integrations = [
    {
        name: 'Jupiter V6',
        layer: 'Execution — Liquidity Aggregation',
        tag: 'DEX Aggregator',
        tagColor: 'blue',
        url: 'https://jup.ag',
        why: 'Solana has over 20 active DEXs — Raydium, Orca, Phoenix, Meteora, Lifinity, and more. Routing a swap directly to any single DEX means accepting whatever liquidity and price that venue offers at that moment. Jupiter solves this by splitting orders across multiple venues in a single atomic transaction, finding the route that minimises slippage and maximises output for any given input.',
        how: 'XForce Terminal integrates Jupiter V6 via the lib-solana crate. The terminal calls the Jupiter Quote API to get the optimal route, then builds a transaction using Jupiter swap instructions combined with Pinocchio CPI calls. The entire flow — quote, build, sign, submit — is handled natively in Rust with no JavaScript intermediary.',
        delivers: [
            'Best available price across all Solana DEXs on every swap',
            'Split routing across multiple venues when depth is insufficient at one',
            'Single atomic transaction regardless of route complexity',
            'Fallback to Jupiter as the tertiary price oracle when Geyser and Pyth are stale',
        ],
        vs: 'Direct DEX integration would require maintaining routing logic for every venue, rewriting it every time a new DEX gains liquidity, and accepting worse prices on fragmented pairs. Jupiter abstracts this entirely.',
    },
    {
        name: 'Astralane IRIS',
        layer: 'Execution — Transaction Landing',
        tag: 'Validator Infrastructure',
        tagColor: 'orange',
        url: 'https://astralane.io',
        why: 'Standard Solana transaction submission routes through a public RPC node, which then gossips the transaction across the network for validators to pick up. This multi-hop path introduces unpredictable propagation latency. In fast markets, the difference between a fill and a miss is often measured in milliseconds — latency that standard RPC broadcast cannot reliably eliminate.',
        how: 'Astralane IRIS is integrated as a Rust library compiled directly into the XForce Terminal backend. Every trade execution bypasses standard RPC broadcast and routes through IRIS, which sends transactions directly to optimised validator infrastructure with minimal propagation delay. The integration is transparent to the user — IRIS is the default submission layer, not an opt-in feature.',
        delivers: [
            'Significantly reduced transaction propagation latency vs public RPC',
            'Higher landing rate on time-sensitive trades',
            'Direct validator routing purpose-built for high-frequency Solana trading',
            'No configuration required — optimised submission is the baseline',
        ],
        vs: 'Public RPC endpoints (Helius, QuickNode, or public) introduce gossip-layer propagation that is fine for casual usage but creates systematic disadvantage for algorithmic strategies and large-size trades where timing determines execution quality.',
    },
    {
        name: 'Jito Bundles',
        layer: 'Execution — MEV Protection',
        tag: 'Bundle Submission',
        tagColor: 'green',
        url: 'https://jito.wtf',
        why: 'MEV (Maximal Extractable Value) attacks on Solana take two primary forms: front-running, where a searcher observes your pending transaction and inserts their own ahead of it to capture price impact; and sandwich attacks, where your transaction is bracketed by buy and sell orders that extract value from your slippage. These attacks are systematic and invisible to the victim — they appear as worse-than-expected execution.',
        how: 'XForce Terminal submits every swap as a Jito bundle by default. Bundles are atomic sequences of transactions processed by Jito-enabled validators as a unit. Because the bundle is atomic, front-running is mechanically impossible — there is no state between the user swap and any preceding transaction that an attacker could exploit. The lib-solana crate handles Jito bundle construction, tip calculation, and submission to the Jito block engine.',
        delivers: [
            'Front-running protection on every swap — no configuration needed',
            'Sandwich attack elimination via atomic bundle execution',
            'Predictable execution quality regardless of network mempool conditions',
            'Tip optimisation — minimum effective tip calculated per bundle to avoid overpaying',
        ],
        vs: 'Making Jito an opt-in feature would mean most users trade unprotected by default. MEV exposure is invisible — users would not know they were being attacked. Jito as the default ensures protection is universal, not a power-user setting.',
    },
    {
        name: 'Yellowstone Geyser',
        layer: 'Data — Primary Price Feed',
        tag: 'gRPC Validator Stream',
        tagColor: 'yellow',
        url: 'https://github.com/rpcpool/yellowstone-grpc',
        why: 'Standard Solana price data retrieval relies on RPC polling — your server sends a request, the RPC node queries its local state, and returns a response. This round-trip introduces 200–500ms latency under normal conditions, which compounds to seconds of staleness when the network is congested. For a trading terminal where price accuracy determines execution quality, polling-based data is fundamentally inadequate.',
        how: 'Yellowstone Geyser is a plugin for Solana validators that exposes a gRPC streaming interface. Instead of polling, XForce Terminal opens a persistent gRPC connection via the Tonic Rust client and receives account update notifications pushed directly from validator state — as changes happen on-chain, they stream to the terminal in under 100ms. The Geyser integration in lib-solana subscribes to relevant account streams (token prices, pool states, oracle accounts) and maintains a local hot cache that the UI reads without additional network round-trips.',
        delivers: [
            'Sub-100ms market data delivery from validator state',
            'Streaming updates instead of polling — data arrives as it changes',
            'Primary position in the three-tier price fallback chain',
            'Local hot cache eliminates per-request latency for UI reads',
        ],
        vs: 'RPC polling at 1-second intervals means you are always trading on data that is at minimum 1 second stale. In volatile markets this is significant. Geyser eliminates this latency floor entirely by inverting the model — data is pushed to you, not fetched by you.',
    },
    {
        name: 'Pyth Network',
        layer: 'Data — Secondary Oracle Fallback',
        tag: 'Crosschain Price Oracle',
        tagColor: 'purple',
        url: 'https://pyth.network',
        why: 'Geyser provides the fastest possible on-chain data, but it requires a connection to a Geyser-enabled validator endpoint. If that connection is lost, becomes stale, or reports anomalous data, the terminal needs a high-fidelity fallback that does not compromise on price accuracy. Pyth Network is the most widely adopted oracle on Solana with the deepest coverage across trading pairs.',
        how: 'Pyth Crosschain price feeds are integrated in lib-solana as the secondary tier in the fallback chain. Staleness detection in the Geyser pipeline monitors the age of the last received update. When a feed exceeds the staleness threshold, the data layer automatically switches to Pyth price accounts for that asset without any user-visible disruption. Pyth\'s high update frequency (400ms) means the quality degradation from falling back to Pyth is minimal.',
        delivers: [
            'Automatic failover when Geyser data becomes stale — zero user disruption',
            'High-fidelity price coverage across 300+ assets on Solana',
            '400ms update frequency from 90+ institutional data providers',
            'Cryptographically verified prices — confidence intervals exposed in the UI',
        ],
        vs: 'Chainlink has minimal Solana presence. Switchboard is an alternative but has lower publisher coverage and less battle-tested reliability in production trading contexts. Pyth is the dominant oracle in Solana DeFi with the deepest institutional data provider network.',
    },
    {
        name: 'Bags SDK',
        layer: 'Social — Monetisation Layer',
        tag: 'Token-Gating + P2P Tipping',
        tagColor: 'pink',
        url: 'https://bags.fm',
        why: 'The XForce Terminal SocialFi layer provides decentralised P2P messaging with on-chain identity. But a social graph without native monetisation primitives is incomplete — signal providers, alpha callers, and community moderators need a way to create exclusive access tiers and receive compensation for value provided. Bags provides exactly these primitives as a composable SDK that integrates with the existing Solana wallet identity.',
        how: 'The Bags SDK is integrated into the SocialFi layer of XForce Terminal. Token-gating is applied at the group and channel level — traders can create exclusive rooms accessible only to holders of a specified token, NFT, or badge. P2P tipping enables direct SOL and SPL token transfers between peers within the messaging interface, settled on-chain via Solana transactions built by the lib-solana crate. Because trader identity in XForce Terminal is an Ed25519 keypair tied to a Solana wallet, Bags integration requires no additional account creation or authentication step.',
        delivers: [
            'Token-gated group chats — exclusive access for NFT holders, token holders, or badge holders',
            'In-chat P2P tipping — direct SOL/SPL payments settled on-chain without leaving the terminal',
            'No additional authentication — Solana wallet identity is the Bags identity',
            'Native monetisation for alpha providers and signal groups',
        ],
        vs: 'Building custom token-gating from scratch would require implementing SPL token balance checks, NFT ownership verification, and an on-chain access control layer. Bags provides this as a production-ready SDK, letting the terminal focus on the trading infrastructure rather than rebuilding social primitives.',
    },
];

const tagColors = {
    blue: 'bg-blue-900/30 border-blue-700/40 text-blue-400',
    orange: 'bg-orange-900/30 border-orange-700/40 text-orange-400',
    green: 'bg-green-900/30 border-green-700/40 text-green-400',
    yellow: 'bg-yellow-900/30 border-yellow-700/40 text-yellow-400',
    purple: 'bg-purple-900/30 border-purple-700/40 text-purple-400',
    pink: 'bg-pink-900/30 border-pink-700/40 text-pink-400',
};

export default function Integrations() {
    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <p className="text-red-400 font-mono text-sm mb-2">INTEGRATIONS</p>
                <h1 className="text-5xl font-bold text-white mb-4">Integration Stack</h1>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                    XForce Terminal integrates across the full Solana stack. Every choice is deliberate — here is why each integration was selected over the alternatives.
                </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-12">
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    On-chain execution routes through <span className="text-white font-medium">Jupiter</span> for liquidity aggregation and <span className="text-white font-medium">Astralane</span> for fast transaction landing, with every swap submitted via <span className="text-white font-medium">Jito bundles</span> by default for MEV protection. Price data runs through a three-tier fallback chain — <span className="text-white font-medium">Geyser primary</span>, <span className="text-white font-medium">Pyth Crosschain secondary</span>, <span className="text-white font-medium">Jupiter tertiary</span> — eliminating single points of failure. The SocialFi layer integrates <span className="text-white font-medium">Bags</span> for token-gating and P2P tipping.
                </p>
                <div className="flex flex-wrap gap-2">
                    {integrations.map((i) => (
                        <span key={i.name} className={`px-3 py-1 border rounded-full text-xs font-medium ${tagColors[i.tagColor]}`}>
                            {i.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="space-y-8">
                {integrations.map((item, idx) => (
                    <div key={item.name} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                        <div className="border-b border-gray-800 px-8 py-6 flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0">{idx + 1}</span>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-2xl font-bold text-white">{item.name}</h2>
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-400 transition-colors text-sm">↗</a>
                                    </div>
                                    <p className="text-gray-500 text-sm">{item.layer}</p>
                                </div>
                            </div>
                            <span className={`ml-auto px-3 py-1 border rounded-full text-xs font-medium ${tagColors[item.tagColor]}`}>
                                {item.tag}
                            </span>
                        </div>

                        <div className="px-8 py-6 space-y-6">
                            <div>
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-red-600 rounded-full inline-block"></span>
                                    Why This Integration
                                </h3>
                                <p className="text-gray-400 leading-relaxed">{item.why}</p>
                            </div>

                            <div>
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-red-600 rounded-full inline-block"></span>
                                    How It Is Integrated
                                </h3>
                                <p className="text-gray-400 leading-relaxed">{item.how}</p>
                            </div>

                            <div>
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-red-600 rounded-full inline-block"></span>
                                    What It Delivers
                                </h3>
                                <ul className="space-y-2">
                                    {item.delivers.map((d, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-400 text-sm leading-relaxed">
                                            <span className="text-red-500 shrink-0 mt-0.5">▸</span>{d}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-black border border-gray-800 rounded-xl p-5">
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-gray-600 rounded-full inline-block"></span>
                                    Why Not The Alternatives
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.vs}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
