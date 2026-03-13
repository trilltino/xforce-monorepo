import { useState } from 'react';
import { useTerminalStore } from '../stores/terminalStore';
import { useWalletCommands } from '../hooks/useTauri';

export function Wallet() {
  const { wallet, setWallet } = useTerminalStore();
  const { connectWallet, disconnectWallet } = useWalletCommands();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const result = await connectWallet();
      setWallet({
        connected: true,
        publicKey: result.public_key,
        balance: result.balance,
      });
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      setWallet({
        connected: false,
        publicKey: null,
        balance: 0,
      });
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="panel max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-6 text-terminal-accent">Wallet</h2>

        {wallet.connected ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-terminal-accent/20 flex items-center justify-center text-2xl">
                ◉
              </div>
              <div>
                <p className="text-terminal-muted text-sm">Connected</p>
                <p className="font-mono text-terminal-text">
                  {wallet.publicKey && formatAddress(wallet.publicKey)}
                </p>
              </div>
            </div>

            <div className="p-4 bg-terminal-bg border border-terminal-border rounded-lg">
              <p className="text-terminal-muted text-xs uppercase font-bold mb-1">Portfolio Balance</p>
              <p className="text-4xl font-bold font-mono">
                {wallet.balance.toFixed(4)} <span className="text-terminal-muted">SOL</span>
              </p>
            </div>

            <button
              onClick={handleDisconnect}
              className="btn-danger w-full"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-terminal-border flex items-center justify-center text-3xl mx-auto">
              ○
            </div>
            
            <div>
              <p className="text-terminal-muted mb-4">
                Connect your Solana wallet to start trading
              </p>
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="btn-primary w-full"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            </div>

            <div className="text-xs text-terminal-muted">
              <p>Supports keypair files</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
