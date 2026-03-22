export default function Terminal() {
    return (
        <div className="max-w-7xl mx-auto py-16 px-4">
            <div className="text-center mb-16">
                <h1 className="text-6xl font-black mb-6 font-heading tracking-tighter">
                    <span className="text-red-600">XF</span>TERMINAL
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 hover:border-red-500/50 transition-all duration-500">
                    <img src="/images/xfterminal-capture-1.png" alt="XFTerminal Interface 1" className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-left">
                        <p className="text-red-500 font-mono text-xs mb-1 tracking-widest uppercase">Capture 01</p>
                        <h3 className="text-white font-bold text-lg">Real-Time Surveillance</h3>
                    </div>
                </div>
                <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 hover:border-red-500/50 transition-all duration-500">
                    <img src="/images/xfterminal-capture-2.png" alt="XFTerminal Interface 2" className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-left">
                        <p className="text-red-500 font-mono text-xs mb-1 tracking-widest uppercase">Capture 02</p>
                        <h3 className="text-white font-bold text-lg">Institutional Execution</h3>
                    </div>
                </div>
                <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 hover:border-red-500/50 transition-all duration-500">
                    <img src="/images/xfterminal-capture-3.png" alt="XFTerminal Interface 3" className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-left">
                        <p className="text-red-500 font-mono text-xs mb-1 tracking-widest uppercase">Capture 03</p>
                        <h3 className="text-white font-bold text-lg">On-Chain Intelligence</h3>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-gray-900 pt-16 text-center">
                <button className="px-12 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transform hover:-translate-y-1">
                    Download Professional Edition
                </button>
            </div>
        </div>
    );
}

