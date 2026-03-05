import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletStore } from '../stores/walletStore';

export function Connect() {
  const { connected, publicKey } = useWallet();
  const navigate = useNavigate();
  const { setConnected, setPublicKey } = useWalletStore();

  useEffect(() => {
    if (connected && publicKey) {
      setConnected(true);
      setPublicKey(publicKey);
      navigate('/status');
    }
  }, [connected, publicKey, navigate, setConnected, setPublicKey]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          XForce Wallet
        </h1>
        <p className="text-gray-400 mb-8">
          Connect your Solana wallet to access the terminal
        </p>

        <div className="space-y-4">
          <div className="flex justify-center">
            <WalletMultiButton className="wallet-btn-primary" />
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-space-800 text-gray-500">or</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/setup')}
            className="wallet-btn-secondary w-full"
          >
            Create New Wallet
          </button>
        </div>

        <div className="mt-8 p-4 bg-space-900/50 rounded-lg">
          <p className="text-sm text-gray-500">
            Supported wallets: Phantom, Solflare, Backpack, and more
          </p>
        </div>
      </div>
    </div>
  );
}
