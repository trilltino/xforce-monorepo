import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Keypair } from '@solana/web3.js';

export function WalletSetup() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'select' | 'create' | 'import'>('select');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [newWallet, setNewWallet] = useState<{publicKey: string; seedPhrase: string} | null>(null);

  const generateWallet = () => {
    const keypair = Keypair.generate();
    const seed = Array(12).fill(0).map(() => {
      const words = ['apple', 'banana', 'cherry', 'date', 'elder', 'fig', 'grape', 'honey', 'ice', 'juice', 'kiwi', 'lemon'];
      return words[Math.floor(Math.random() * words.length)];
    }).join(' ');
    
    setNewWallet({
      publicKey: keypair.publicKey.toBase58(),
      seedPhrase: seed,
    });
  };

  const importWallet = () => {
    // In real implementation, validate and import from seed phrase
    console.log('Importing wallet with seed:', seedPhrase);
    navigate('/status');
  };

  if (mode === 'select') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Wallet Setup</h1>
          
          <div className="space-y-4">
            <button
              onClick={() => { setMode('create'); generateWallet(); }}
              className="wallet-btn-primary w-full text-left flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue text-xl">+</div>
              <div>
                <div className="font-semibold">Create New Wallet</div>
                <div className="text-sm text-gray-400">Generate a new wallet with seed phrase</div>
              </div>
            </button>

            <button
              onClick={() => setMode('import')}
              className="wallet-btn-secondary w-full text-left flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple text-xl">↓</div>
              <div>
                <div className="font-semibold">Import Wallet</div>
                <div className="text-sm text-gray-400">Restore from seed phrase</div>
              </div>
            </button>
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-6 text-gray-500 hover:text-white transition-colors w-full"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'create' && newWallet) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2 text-center">New Wallet Created</h1>
          <p className="text-red-400 text-sm text-center mb-6">
            Save this seed phrase securely. Never share it with anyone!
          </p>

          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
            <p className="font-mono text-sm break-words leading-relaxed">
              {newWallet.seedPhrase}
            </p>
          </div>

          <div className="p-4 bg-space-900/50 rounded-lg mb-6">
            <p className="text-sm text-gray-500 mb-1">Public Key</p>
            <p className="font-mono text-sm text-neon-blue break-all">
              {newWallet.publicKey}
            </p>
          </div>

          <button
            onClick={() => navigate('/status')}
            className="wallet-btn-primary w-full"
          >
            I&apos;ve Saved My Seed Phrase
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'import') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Import Wallet</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Seed Phrase (12 or 24 words)
              </label>
              <textarea
                value={seedPhrase}
                onChange={(e) => setSeedPhrase(e.target.value)}
                placeholder="Enter your seed phrase separated by spaces..."
                className="input h-32 resize-none"
              />
            </div>

            <button
              onClick={importWallet}
              disabled={seedPhrase.trim().split(' ').length < 12}
              className="wallet-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Import Wallet
            </button>
          </div>

          <button
            onClick={() => setMode('select')}
            className="mt-6 text-gray-500 hover:text-white transition-colors w-full"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return null;
}
