export default function Guide() {
    const images = [
        {
            src: '/xfterminal/images/xfterminal-standard.png',
            alt: 'XFTerminal Professional Guide',
            label: 'The XFTerminal Standard'
        },
        {
            src: '/xfterminal/images/bloomberg-cover.png',
            alt: 'Bloomberg Professional Services',
            label: 'The Institutional Benchmark'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading">
                    <span className="text-red-500">XF</span>Terminal Guide
                </h1>
                <p className="text-xl text-gray-400 font-sans max-w-3xl mx-auto">
                    The XFTerminal Guide is designed to bridge the gap between traditional financial analysis 
                    and the Solana ecosystem. This masterclass covers on-chain market dynamics, 
                    liquidity analysis, and professional-grade terminal integrations, 
                    mirroring the gold standard of institutional trading tools.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {images.map((img, index) => (
                    <div key={index} className="space-y-4">
                        <div className="bg-gray-900 border border-primary-900/30 rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] aspect-[3/4]">
                            <img 
                                src={img.src} 
                                alt={img.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-center text-primary-400 font-bold tracking-wider uppercase text-sm">
                            {img.label}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg text-center">
                <h2 className="text-3xl font-bold text-primary-400 mb-6 font-heading">The Masterclass Experience</h2>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    <div className="space-y-2">
                        <h3 className="text-white font-bold text-lg">Market Mechanics</h3>
                        <p className="text-gray-400 text-sm">Understand depth, slippage, and liquidity profiling directly on-chain.</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-white font-bold text-lg">Terminal Mastery</h3>
                        <p className="text-gray-400 text-sm">Learn to leverage 70+ integrated functions for lightning-fast analysis.</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-white font-bold text-lg">Institutional Edge</h3>
                        <p className="text-gray-400 text-sm">Apply professional workflows used by top financial institutions to DeFi.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
