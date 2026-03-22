import { useState } from 'react';

const cards = [
    {
        title: "XForce Terminal: Professional-Grade DeFi Trading Terminal",
        subtitle: "Grant Request: 10,000 USDC",
        content: `XForce Terminal is a DeFi trading terminal for Solana, built as a solo open-source project. It provides a Bloomberg-style native desktop interface for Solana DeFi, built end-to-end in Rust.

Security is non-custodial: private keys never leave the device, with all transaction signing handled locally. The extensible contract plugin architecture allows easy integration of new Solana programs and DeFi protocols without modifying core code.

The terminal will deliver a professional trading interface with real-time price feeds, candlestick charts, and portfolio tracking integrating with Jupiter aggregator. Furthermore, the custom batch swap router contract executes multiple swaps atomically in a single transaction, reducing fees by up to 90% for complex trades. Beyond trading, XForce Terminal includes SociaFI features through a built-in messaging system using the Braid protocol (CRDT-based) for decentralized, conflict-free messaging between traders.

REST APIs will enable developers to build automated trading strategies, copy-trading systems, and algorithmic trading bots in any programming language.`
    },
    {
        title: "Public Goods Contribution & DeFi Innovation",
        subtitle: "Open-Source Infrastructure for Solana",
        content: `XForce Terminal is the first end-to-end Rust DeFi trading terminal for Solana, built entirely in Rust from Solana programs (Anchor) to the native desktop GUI (egui/eframe) to the backend API (Axum) and web components (Leptos/WASM). This unified stack enables type safety, performance, and code reuse across the entire application. The codebase uses idiomatic Rust patterns, production-level documentation, and a modular architecture with reusable libraries (lib-solana, lib-core, lib-web) that can be published to crates.io and shared across the ecosystem.

This is a novel use of Rust in a language that exponentially is increasing in its use, demand and popularity - by showing the rust ecosystem what is truly possible we can continuously inspire more dev simply by upholding the "Art of the Possible".

XForce Terminal includes SociaFI features through a built-in messaging system using the Braid protocol (CRDT-based) for decentralized, conflict-free messaging between traders, enabling copy-trading and signal sharing without centralized intermediaries. Using braid.org HTTP protocol any prospective or current app that wants to build a social layer can now do so by looking at this code as a reference - Braid makes chat apps, simple, cheap and scalable all while taking advantage and teaching the forefront of computer software programming CRDTS.

The platform serves as developer infrastructure through a comprehensive REST API that enables developers to build automated trading strategies, copy-trading systems, and algorithmic trading bots in any programming language. The extensible contract plugin architecture allows easy integration of new Solana programs and DeFi protocols without modifying core code. AI assistance is integrated using rust-genai, supporting multiple providers (DeepSeek, OpenAI, Anthropic, Gemini) for market analysis, trading strategy guidance, and real-time token information—bringing AI-powered trading support directly into the terminal interface.

As fully open-source XForce Terminal serves as public infrastructure for the Solana DeFi ecosystem. The reusable Rust libraries provide production-ready Solana integration patterns that other developers can adopt, reducing duplication and improving ecosystem code quality. The CRDT messaging implementation offers a reference for decentralized communication in DeFi applications, while the comprehensive REST API democratizes access to sophisticated DeFi tools for trading bot development and algorithmic strategies.

By providing both end-user tools and developer infrastructure, XForce Terminal bridges the gap between professional trading needs and open-source accessibility, ensuring that advanced DeFi capabilities are available to all rather than locked behind proprietary platforms. Every component is designed to be reusable, extensible, and educational, establishing patterns and best practices that benefit the entire Solana developer community.`
    },
    {
        title: "Competitive Analysis",
        subtitle: "Unique Position in the Solana Ecosystem",
        content: `XForce Terminal is the only native desktop application in the Solana DeFi trading space, the only Crypto specific trading terminal, the only one in Rust - but that's not because it can be done but because it's time for the ecosystem to apply the mature frameworks to solve production as proof.

The Terminal combines a Bloomberg-style terminal interface with non-custodial security, AI assistance, and social features delivering sub-50ms latency and <10% CPU usage through its Rust-based native architecture. The platform is fully non-custodial—private keys never leave the user's device—and integrates Jupiter aggregator and Pyth Network oracles for optimal pricing.

As an Apache 2.0 licensed open-source project, XForce Terminal embodies FOSS DeFi principles of transparency and verifiability, serving as a public good that enables developers to build upon the codebase, researchers to audit security, and traders to customize without vendor lock-in.

By providing professional-grade, non-custodial trading tools as free and open-source software, XForce Terminal democratizes access to institutional-quality infrastructure while strengthening the decentralized finance ecosystem through community collaboration and transparency.`
    }
];

export default function Proposal() {
    const [currentCard, setCurrentCard] = useState(0);
    const totalCards = cards.length;

    const goToNext = () => {
        setCurrentCard((prev) => (prev + 1) % totalCards);
    };

    const goToPrev = () => {
        setCurrentCard((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
    };

    const goToCard = (idx) => {
        setCurrentCard(idx);
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Proposal
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 font-sans">
                    XForce Terminal: Professional-Grade DeFi Trading Terminal for Solana
                </p>
            </div>

            {/* Card Container */}
            <div className="relative">
                {/* Navigation Buttons */}
                <button
                    onClick={goToPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
                    aria-label="Previous card"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
                    aria-label="Next card"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Card Display */}
                <div className="relative overflow-hidden rounded-2xl">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentCard * 100}%)` }}
                    >
                        {cards.map((card, idx) => (
                            <div key={idx} className="w-full flex-shrink-0 px-2">
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 min-h-[600px] flex flex-col">
                                    {/* Card Header */}
                                    <div className="mb-6">
                                        <h2 className="text-3xl md:text-4xl font-bold mb-3 font-heading text-gray-900 dark:text-white">
                                            {card.title}
                                        </h2>
                                        <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold shadow-lg">
                                            {card.subtitle}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex-grow overflow-y-auto">
                                        <div className="prose prose-lg dark:prose-invert max-w-none">
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line font-sans">
                                                {card.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Indicator Dots */}
                <div className="flex justify-center mt-8 space-x-3">
                    {cards.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToCard(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentCard === idx
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                                    : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'
                                }`}
                            aria-label={`Go to card ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Card Counter */}
                <div className="text-center mt-6">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-sans">
                        {currentCard + 1} / {totalCards}
                    </span>
                </div>
            </div>
        </div>
    );
}
