import React from 'react';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="pdf-container">
      {/* PAGE 1: BLOOMBERG REPLICA */}
      <div className="pdf-page transition-all duration-300">
        {/* TOP LEFT HEADER */}
        <div className="absolute top-[60px] left-[60px]">
          <p className="text-[14.5px] font-[400] text-gray-500 tracking-tight">
            A Terminal Professional Services Offering
          </p>
        </div>

        {/* MAIN CENTERED TEXT */}
        <div className="absolute top-[35%] left-[60px] w-full max-w-[550px]">
          <h1 className="text-[72px] font-[900] leading-[1.02] tracking-[-0.035em] m-0 text-inherit">
            Getting started on the <br />
            <span className="text-red-500">XF</span>Terminal
          </h1>
        </div>

        {/* BOTTOM RIGHT LOGO AREA (ROTATED) */}
        <div className="absolute bottom-[200px] right-[60px]">
          <div className="transform rotate-[270deg] origin-bottom-right translate-x-full">
            <div className="text-right">
              <span className="block text-[58px] font-[900] tracking-[-0.04em] leading-[0.9] text-inherit">
                <span className="text-red-500">XF</span>Terminal
              </span>
              <span className="block text-[34px] font-[300] tracking-[-0.015em] leading-[1.2] opacity-80 mt-2 text-inherit">
                for Professionals
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 2: SOLANA MARKET CONCEPTS (SMC) */}
      <div className="pdf-page transition-all duration-300 flex flex-col p-24">
        <div className="flex-1">
          <h2 className="text-[64px] font-[900] leading-[0.95] tracking-tighter mb-12 text-inherit">
            Solana Market <br /> Concepts (SMC)
          </h2>

          <div className="w-24 h-2 bg-[#ff9900] mb-16"></div>

          <div className="grid grid-cols-1 gap-14 max-w-2xl">
            <p className="text-2xl font-medium leading-relaxed text-inherit opacity-90">
              Master the mechanics of Solana markets and liquidity with the SMC certification.
              This comprehensive guide provides a masterclass in using the terminal to analyze
              on-chain market dynamics with over 70 terminal-integrated functions built for
              professional-grade Solana analysis.
            </p>

            <div className="space-y-12 mt-4">
              <div className="border-l-[6px] border-[#ff9900] pl-10">
                <h3 className="text-3xl font-[900] uppercase tracking-wider mb-2">Learn the language of Solana</h3>
                <p className="text-xl opacity-70 leading-snug">Master Program Derived Addresses (PDAs), Cross-Program Invocations (CPI), and the Anchor framework.</p>
              </div>

              <div className="border-l-[6px] border-[#ff9900] pl-10">
                <h3 className="text-3xl font-[900] uppercase tracking-wider mb-2">SVM Inner Workings</h3>
                <p className="text-xl opacity-70 leading-snug">Deep dive into Sealevel (parallel execution), Pipelining, and localized fee markets.</p>
              </div>

              <div className="border-l-[6px] border-[#ff9900] pl-10">
                <h3 className="text-3xl font-[900] uppercase tracking-wider mb-2">Terminal Certified</h3>
                <p className="text-xl opacity-70 leading-snug">Demonstrate your comfort with the gold standard platform for on-chain intelligence.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-12 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center opacity-40">
          <div className="text-base font-[900] tracking-[0.2em] uppercase"><span className="text-red-500">XF</span>Terminal | SMC PRO</div>
          <div className="text-base font-black text-inherit">PAGE 02</div>
        </div>
      </div>
    </div>
  );
};

export default App;
