import { useState } from 'react';
import { Boxes, Network, Github } from 'lucide-react';

export default function Projects() {
  const [expandedCategory, setExpandedCategory] = useState('defi');

  const toggleCategory = (key) => {
    setExpandedCategory(expandedCategory === key ? null : key);
  };

  const projects = {
    defi: {
      title: 'DeFi & Solana',
      icon: <Boxes size={20} />,
      repos: [
        { name: 'XFChess', desc: 'Fully decentralized on-chain chess engine and game implementation on Solana.', tech: ['Rust', 'Solana', 'WASM'], link: 'https://github.com/trilltino/XFChess' },
        { name: 'xforce-terminal-contracts', desc: 'Atomic batch token swaps on Solana with Jupiter integration and slippage protection.', tech: ['Rust', 'Anchor', 'Solana'], link: 'https://github.com/trilltino/xforce-terminal-contracts' },
        { name: 'anchor-vault', desc: 'Secure lamport storage vault using PDAs and Cross-Program Invocation on Solana.', tech: ['Rust', 'Anchor', 'Solana'], link: 'https://github.com/trilltino/anchor-vault' },
        { name: 'xforce-monorepo', desc: 'Full-stack Solana ecosystem including trading terminal, smart contracts, and sentiment analysis.', tech: ['Rust', 'Solana', 'Tauri', 'TypeScript'], link: 'https://github.com/trilltino/xforce-monorepo' },
        { name: 'xforce-terminal', desc: 'Desktop trading terminal with real-time charts and multi-wallet Solana support.', tech: ['Rust', 'Solana', 'Tauri', 'React'], link: 'https://github.com/trilltino/xforce-terminal' },
        { name: 'pinocchio_vault_challenge', desc: 'Ultra-low compute Solana vault implementation using the Pinocchio no-std framework.', tech: ['Rust', 'Solana', 'No-Std'], link: 'https://github.com/trilltino/pinocchio_vault_challenge' },
        { name: 'anchor_escrow_challenge', desc: 'Secure escrow program implementation using the Anchor framework on Solana.', tech: ['Rust', 'Anchor', 'Solana'], link: 'https://github.com/trilltino/anchor_escrow_challenge' },
        { name: 'solana-spl-token-challenges', desc: 'Comprehensive suite of SPL token management and integration challenges.', tech: ['Rust', 'Solana', 'SPL'], link: 'https://github.com/trilltino/solana-spl-token-challenges' },
      ]
    },
    p2p: {
      title: 'P2P & Decentralized Systems',
      icon: <Network size={20} />,
      repos: [
        { name: 'braid-reborn', desc: 'Full-stack Rust implementation of the Braid protocol with CRDT sync and Iroh P2P transport.', tech: ['Rust', 'Tokio', 'Iroh', 'CRDT'], link: 'https://github.com/trilltino/braid-reborn' },
        { name: 'xf_braid', desc: 'Real-time P2P chat (XFMail) using the BraidFS protocol and custom Braid-HTTP client.', tech: ['Rust', 'Leptos', 'Axum', 'WASM'], link: 'https://github.com/trilltino/xf_braid' },
        { name: 'link-ide-extension', desc: 'VS Code extension for P2P collaborative development featuring chat and file sharing.', tech: ['TypeScript', 'Rust', 'Iroh', 'VS Code API'], link: 'https://github.com/trilltino/link-ide-extension' },
        { name: 'monorepo', desc: 'Git-based version control system designed specifically for AI agent coordination.', tech: ['Rust', 'Git'], link: 'https://github.com/trilltino/monorepo' },
        { name: 'braid_iroh', desc: 'Experimental implementation of the Braid protocol over the Iroh network stack.', tech: ['Rust', 'Iroh', 'QUIC'], link: 'https://github.com/trilltino/braid_iroh' },
        { name: 'braidfs-nfs', desc: 'NFS bridge enabling legacy filesystem access to the Braid decentralized network.', tech: ['Rust', 'NFS'], link: 'https://github.com/trilltino/braidfs-nfs' },
      ]
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center font-heading text-gray-900 dark:text-white">
        Proof of <span className="text-primary-500">Work</span>
      </h1>

      {/* Community Track Record */}
      <div className="mb-6 p-6 rounded-2xl border border-primary-500/20 bg-primary-500/5">
        <h3 className="text-lg font-semibold mb-3 text-primary-500">Community Track Record</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Led the European Ambassador Program for Stellar — 15 events across 6 nations, 600 attendees, 60 volunteers, $67,420 budget. No direct authority. All delivered.
        </p>
      </div>

      {/* Open Source Recognition */}
      <div className="mb-6 p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
        <h3 className="text-lg font-semibold mb-3 text-primary-500">Open Source Recognition</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          adz — creator of p2panda, the Rust P2P framework — starred this work unprompted. Peer validation from someone who builds in the same space professionally.
        </p>
      </div>

      {/* Protocol Engineering */}
      <div className="mb-8 p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
        <h3 className="text-lg font-semibold mb-3 text-primary-500">Protocol Engineering</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Contributed to the Braid IETF draft — implementing all 6 required spec sections, 5,668 tests, and cross-language interoperability documentation between Rust and JavaScript implementations. This is the evidence package required to advance Braid from Internet-Draft to RFC status.
        </p>
      </div>

      {/* Repository Categories */}
      <div className="space-y-4">
        {Object.entries(projects).map(([key, category]) => (
          <div key={key} className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-5 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors text-left"
              onClick={() => toggleCategory(key)}
            >
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/10 text-primary-500">
                  {category.icon}
                </span>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">{category.title}</span>
                <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                  {category.repos.length} repos
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform text-gray-500 ${expandedCategory === key ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {expandedCategory === key && (
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
                <div className="grid md:grid-cols-2 gap-4">
                  {category.repos.map((repo, idx) => (
                    <a
                      key={idx}
                      href={repo.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary-500/50 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">{repo.name}</h4>
                        <Github size={16} className="text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{repo.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {repo.tech.map((t, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 text-xs font-medium rounded ${
                              t === 'Solana'
                                ? 'bg-purple-500/10 text-purple-500'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
