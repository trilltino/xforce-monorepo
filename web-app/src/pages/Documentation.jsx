export default function Documentation() {
    return (
        <div className="max-w-6xl mx-auto py-8">
            <h1 className="text-4xl font-bold text-center mb-8 font-heading text-gray-900 dark:text-white">Documentation</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 font-sans">
                Documentation for XFTerminal.
            </p>

            {/* Images side by side */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <a
                    href="https://docs.google.com/document/d/1X1Tfeagb8pR02tN1AD_JAo2ut1I_Q6G2Z_yDgRidqBo/edit?tab=t.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                >
                    <img
                        src="/xforcesolutions/images/xfterminal-cover.png"
                        alt="XFTerminal Cover"
                        className="w-full h-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-800"
                    />
                </a>
                <a
                    href="https://docs.google.com/document/d/1X1Tfeagb8pR02tN1AD_JAo2ut1I_Q6G2Z_yDgRidqBo/edit?tab=t.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                >
                    <div className="relative">
                        <img
                            src="/xforcesolutions/images/bloomberg-cover.png"
                            alt="Bloomberg Cover"
                            className="w-full h-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-800"
                        />
                        <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-3 rounded-lg">
                            <p className="text-sm font-semibold font-sans">WIP XFTerminal 'Getting Started'</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}
