import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWalletStore } from '../stores/walletStore';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';

export function Status() {
  const { publicKey, connected, disconnect } = useWallet();
  const { balance, setBalance, setConnection } = useWalletStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (connected && publicKey) {
      const connection = new Connection(
        import.meta.env.VITE_SOLANA_RPC || 'https://api.devnet.solana.com'
      );
      setConnection(connection);

      // Fetch balance
      connection.getBalance(publicKey).then((lamports) => {
        setBalance(lamports / LAMPORTS_PER_SOL);
        setIsLoading(false);
      });
    }
  }, [connected, publicKey, setBalance, setConnection]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center">
          <p className="text-gray-400 mb-4">Wallet not connected</p>
          <Link to="/" className="wallet-btn-primary inline-block">
            Connect Wallet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Wallet Status</h1>

        <div className="space-y-4">
          <div className="p-4 bg-space-900/50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Public Key</p>
            <p className="font-mono text-neon-blue">
              {publicKey ? formatAddress(publicKey.toBase58()) : 'N/A'}
            </p>
          </div>

          <div className="p-4 bg-space-900/50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Balance</p>
            <p className="text-2xl font-bold">
              {isLoading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                <>
                  {balance.toFixed(4)} <span className="text-neon-green">SOL</span>
                </>
              )}
            </p>
          </div>

          <div className="p-4 bg-space-900/50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Network</p>
            <p className="text-gray-300">Devnet</p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Link
            to="/sign"
            className="wallet-btn-primary block text-center"
          >
            Sign Transaction
          </Link>
          
          <button
            onClick={() => disconnect()}
            className="wallet-btn-secondary w-full"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
