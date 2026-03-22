export default function Terminal() {
    return (
        <div className="max-w-7xl mx-auto py-16 px-4">
            <div className="text-center mb-16">
    <h1 className="text-6xl font-black mb-6 font-heading tracking-tighter">
        <span className="text-red-500">XF</span>TERMINAL
    </h1>

                <div className="max-w-3xl mx-auto">
                    <p className="text-2xl text-gray-300 font-sans leading-relaxed">
                        XFTerminal aims to be the <span className="text-white font-bold">gold standard for on-chain intelligence</span>, providing a unified, high-performance desktop entry point for the Solana ecosystem.
                    </p>
                    <p className="mt-6 text-lg text-gray-500 font-sans leading-relaxed">
                        By merging real-time data streaming, decentralized messaging, and MEV-protected execution into a familiar Bloomberg-style interface, XFTerminal empowers professional analysts and traders with institutional-grade tools previously unavailable in the decentralized world.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-20">
                <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 shadow-2xl">
                    <img src={`${import.meta.env.BASE_URL}images/terminal-capture-1.png`} alt="XFTerminal Interface 1" className="w-full h-auto" />
                </div>
                <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 shadow-2xl">
                    <img src={`${import.meta.env.BASE_URL}images/terminal-capture-2.png`} alt="XFTerminal Interface 2" className="w-full h-auto" />
                </div>
            </div>

            <div className="max-w-4xl mx-auto text-center border-t border-gray-900 pt-16">
                <h2 className="text-4xl font-bold mb-8 font-heading text-white">The Bloomberg of Solana</h2>
                <div className="space-y-6 text-xl text-gray-400 font-sans leading-relaxed">
                    <p>
                        XFTerminal is specifically engineered to bring the <span className="text-red-500 font-semibold">legendary Bloomberg Terminal experience</span> to the Solana ecosystem. We focus on high-density information flow, sub-second data accuracy, and professional-grade execution tools that give power users a distinct edge.
                    </p>
                    <p>
                        Just as Bloomberg revolutionized traditional finance by unifying fragmented data markets, XFTerminal aims to be the <span className="text-white font-bold">essential command center</span> for the next generation of decentralized institutional markets.
                    </p>
                </div>
            </div>
        </div>
    );
}

