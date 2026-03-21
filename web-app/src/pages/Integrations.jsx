import React from 'react';
import { motion } from 'framer-motion';

export default function Integrations() {
  const integrations = [
    {
      title: "Astralane IRIS — High-Speed Transaction Sender",
      description: "XFTerminal integrates Astralane's IRIS transaction sender as the primary submission layer for all trade execution. IRIS bypasses standard public RPC broadcast, routing transactions directly through optimised validator infrastructure for sub-second landing times. For HFT strategies and time-sensitive batch swaps, the difference between IRIS and standard RPC submission is the difference between a fill and a miss.",
      details: "Connection: Rust library integration\nFunction: Optimised transaction landing with minimal propagation latency\nWhy: Built specifically for high-frequency Solana trading, not retrofitted from general-purpose RPC tooling",
      type: "Rust library integration",
      what: "Optimised transaction landing with minimal propagation latency for sub-second execution",
      why: "Built specifically for high-frequency Solana trading, not retrofitted from general-purpose RPC tooling"
    },
    {
      title: "SPL Token Programs — Core Token Infrastructure",
      description: "Every token operation in XFTerminal — transfers, swaps, associated token account creation, metadata resolution, and governance interactions — runs through the battle-tested SPL program suite. The terminal's lib-solana crate wraps SPL interactions into reusable, audited primitives that any developer building on the stack can inherit directly.",
      details: "Connection: On-chain program CPI and client-side instruction construction\nFunction: Token, Associated Token Account, Token Metadata, Token 2022, Governance\nWhy: Industry standard, fully audited, and the only correct foundation for production token operations on Solana",
      type: "On-chain program CPI and client-side instruction construction",
      what: "Token operations, Associated Token Accounts, Token Metadata, Token 2022, and Governance interactions",
      why: "Industry standard, fully audited, and the only correct foundation for production token operations on Solana"
    },
    {
      title: "Yellowstone Geyser — Real-Time Validator Data Pipeline",
      description: "XFTerminal replaces conventional RPC polling with a Yellowstone Geyser gRPC pipeline connected directly to validator infrastructure. Account updates, transaction confirmations, and program state changes are streamed in real time — sub-100ms delivery versus the 2-5 second delays typical of polling-based dashboards. A micro-indexing filter layer ensures only user-relevant accounts are subscribed, keeping the data pipeline lean. Shadow state reconciliation against RPC confirms consistency.",
      details: "Connection: gRPC streaming via Tonic in Rust\nFunction: Real-time account updates, transaction confirmations, market state streaming\nWhy: The only data architecture that matches the speed of Solana itself — polling is not acceptable for production trading infrastructure",
      type: "gRPC streaming via Tonic in Rust",
      what: "Real-time account updates, transaction confirmations, and market state streaming with sub-100ms delivery",
      why: "The only data architecture that matches the speed of Solana itself — polling is not acceptable for production trading infrastructure"
    },
    {
      title: "Jupiter — DEX Aggregation and Liquidity Routing",
      description: "XFTerminal integrates Jupiter as the primary liquidity layer for swap execution. Jupiter's routing engine queries every major Solana DEX in real time, finding the optimal path across fragmented liquidity pools and minimising slippage on complex trades. The terminal's Pinocchio batch swap router sits on top of Jupiter routing — atomic multi-hop execution in a single transaction, constructed at the instruction level for maximum compute efficiency. Jupiter also serves as the tertiary fallback in the price feed chain when Geyser and Pyth feeds are unavailable.",
      details: "Connection: HTTP API for routing quotes, on-chain instruction construction for execution\nFunction: Optimal DEX routing, price discovery, liquidity aggregation across all major Solana markets\nWhy: Deepest liquidity coverage on Solana with a routing engine that no single DEX can match",
      type: "HTTP API for routing quotes, on-chain instruction construction for execution",
      what: "Optimal DEX routing, price discovery, and liquidity aggregation across all major Solana markets",
      why: "Deepest liquidity coverage on Solana with a routing engine that no single DEX can match",
      image: "/xfterminal/images/jupiter.webp"
    },
    {
      title: "Pinocchio — Below-Framework Smart Contract Development",
      description: "XFTerminal's batch swap router is built in Pinocchio — the below-framework Solana programming model that removes the Anchor SDK entirely. Zero-copy account deserialization via bytemuck, direct SVM syscalls, no-std compilation, and manual account discriminator validation deliver a 30% compute unit reduction versus the equivalent Anchor implementation. Every CU saved is a fee reduction passed directly to the user on every trade. The Pinocchio contracts are open source and documented as a public reference implementation for the Solana developer community.",
      details: "Connection: On-chain program deployment and CPI from terminal client\nFunction: Batch swap router, vault operations, custom trading program logic\nWhy: Anchor is a development convenience. Pinocchio is what you use when performance is the requirement",
      type: "On-chain program deployment and CPI from terminal client",
      what: "Batch swap router, vault operations, and custom trading program logic with 30% CU reduction",
      why: "Anchor is a development convenience. Pinocchio is what you use when performance is the requirement",
      image: "/xfterminal/images/pinocchio.webp"
    },
    {
      title: "Pyth Crosschain — Institutional Price Oracle",
      description: "XFTerminal integrates Pyth Network as the secondary price feed in the multi-source fallback chain, sitting behind Geyser and ahead of Jupiter aggregator quotes. Pyth provides sub-second price updates sourced from institutional market makers and exchanges across multiple chains — not derived from on-chain DEX activity, which can be manipulated. For risk management, liquidation thresholds, and any trading logic that requires a price reference independent of Solana DEX state, Pyth is the correct source.",
      details: "Connection: On-chain price account reads and off-chain Price Service API\nFunction: Real-time cross-chain price feeds for thousands of assets\nWhy: Institutional-grade data sourced from off-chain market makers — the reliability layer when on-chain feeds are insufficient",
      type: "On-chain price account reads and off-chain Price Service API",
      what: "Real-time cross-chain price feeds for thousands of assets with sub-second updates",
      why: "Institutional-grade data sourced from off-chain market makers — the reliability layer when on-chain feeds are insufficient",
      image: "/xfterminal/images/pyth-crosschain.webp"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-black text-center mb-8"
        >
          <span className="text-red-500">XForce</span>
          <span className="text-white ml-4">Integrations</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-400 text-center mb-12 max-w-4xl mx-auto"
        >
          How Everything Works Together - Explained Simply
        </motion.p>

        <div className="grid gap-8 max-w-6xl mx-auto">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-primary-600 transition-colors duration-200"
            >
              <h3 className="text-2xl font-bold text-primary-400 mb-4">
                {integration.title}
              </h3>
              
              <p className="text-gray-300 mb-4 text-lg">
                {integration.description}
              </p>
              
              <p className="text-gray-400 mb-6">
                {integration.details}
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-primary-400 font-semibold mb-2">Type of connection:</h4>
                  <p className="text-gray-300">{integration.type}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-primary-400 font-semibold mb-2">What it does:</h4>
                  <p className="text-gray-300">{integration.what}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-primary-400 font-semibold mb-2">Why it's good:</h4>
                  <p className="text-gray-300">{integration.why}</p>
                </div>
              </div>
              
              {integration.image && (
                <img
                  src={integration.image}
                  alt={integration.title}
                  className="w-20 h-20 mx-auto rounded-lg border border-gray-700 object-cover"
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
