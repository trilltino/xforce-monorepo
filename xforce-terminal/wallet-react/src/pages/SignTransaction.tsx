import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function SignTransaction() {
  const { publicKey, signTransaction } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'signing' | 'success' | 'error'>('idle');
  const [signature, setSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSign = async () => {
    if (!publicKey || !signTransaction) return;

    setStatus('signing');
    setError(null);

    try {
      const connection = new Connection('https://api.devnet.solana.com');
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipient),
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      transaction.feePayer = publicKey;
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      const signed = await signTransaction(transaction);
      const sig = await connection.sendRawTransaction(signed.serialize());
      
      setSignature(sig);
      setStatus('success');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Transaction failed');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Transaction</h1>

        {status === 'success' ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <p className="text-green-400 mb-4">Transaction signed and sent!</p>
            {signature && (
              <p className="font-mono text-xs text-gray-500 break-all mb-6">
                Signature: {signature}
              </p>
            )}
            <Link to="/status" className="wallet-btn-primary inline-block">
              Back to Status
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Recipient Address</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter Solana address..."
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Amount (SOL)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                step="0.001"
                min="0"
                className="input"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSign}
              disabled={status === 'signing' || !recipient || !amount}
              className="wallet-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'signing' ? 'Signing...' : 'Sign & Send'}
            </button>

            <Link
              to="/status"
              className="block text-center text-gray-500 hover:text-white transition-colors"
            >
              ← Cancel
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
