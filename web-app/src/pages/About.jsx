export default function About() {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center mb-12">
                <div className="relative mb-4 w-48 h-48">
                    {/* Profile image */}
                    <img
                        src="/xforcesolutions/images/tino.webp"
                        alt="Tino"
                        className="w-full h-full rounded-full object-cover border-4 border-white dark:border-white shadow-2xl"
                        loading="eager"
                    />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-heading mb-4">Tino</h2>

                {/* Social Media Links */}
                <div className="flex items-center justify-center mt-3">
                    <a
                        href="https://www.linkedin.com/in/valentine-i-b0619b2b6/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-300 hover:scale-110 transition-all duration-200 px-8"
                        aria-label="LinkedIn Profile"
                    >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                    <a
                        href="https://github.com/trilltino"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-300 hover:scale-110 transition-all duration-200 px-8"
                        aria-label="GitHub Profile"
                    >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    <a
                        href="https://x.com/StellarEuropa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-300 hover:scale-110 transition-all duration-200 px-8"
                        aria-label="X (Twitter) Profile"
                    >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* About Text */}
            <div className="mb-8">
                <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 font-sans">
                        I'm an Open Source Software Engineer specializing in Rust for distributed systems and blockchain infrastructure. I build full-stack applications using Leptos, Axum, and Tauri, with focus on P2P protocols and decentralized architecture.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 font-sans">
                        After graduating in Law from the University of Warwick, I pivoted to software engineering and taught myself Rust through building real systems. I've contributed to IETF protocol implementations, built P2P networking layers, and developed Solana smart contracts.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 font-sans">
                        Currently active in Solana Superteam UK, where I contribute to ecosystem growth through developer education and open-source tooling. My work spans protocol-level engineering, DeFi infrastructure, and making decentralized technologies more accessible to developers worldwide.
                    </p>
                </div>
            </div>
        </div>
    );
}
