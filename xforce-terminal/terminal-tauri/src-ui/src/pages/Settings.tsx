import { useState } from 'react';

export function Settings() {
  const [rpcUrl, setRpcUrl] = useState('https://api.devnet.solana.com');
  const [theme, setTheme] = useState('dark');
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <div className="h-full p-4">
      <h2 className="text-2xl font-bold mb-6 text-terminal-accent">Settings</h2>

      <div className="panel max-w-2xl space-y-6 p-6">
        {/* RPC Configuration */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Solana RPC URL
          </label>
          <input
            type="text"
            value={rpcUrl}
            onChange={(e) => setRpcUrl(e.target.value)}
            className="input w-full"
          />
          <p className="text-xs text-terminal-muted mt-1">
            The RPC endpoint used for blockchain interactions
          </p>
        </div>

        {/* Theme */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Theme
          </label>
          <div className="flex gap-2">
            {['dark', 'light'].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  theme === t
                    ? 'bg-terminal-accent text-white'
                    : 'bg-terminal-bg hover:bg-terminal-border'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Auto Update */}
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium">
              Auto-update Prices
            </label>
            <p className="text-xs text-terminal-muted">
              Automatically refresh market data every 5 seconds
            </p>
          </div>
          <button
            onClick={() => setAutoUpdate(!autoUpdate)}
            className={`w-12 h-6 rounded-full transition-colors ${
              autoUpdate ? 'bg-terminal-accent' : 'bg-terminal-border'
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                autoUpdate ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Buttons */}
        <div className="pt-4 border-t border-terminal-border flex gap-3">
          <button className="btn-primary">Save Changes</button>
          <button className="btn-secondary">Reset to Defaults</button>
        </div>
      </div>

      {/* About */}
      <div className="panel max-w-2xl mt-6 p-6">
        <h3 className="font-semibold mb-2">About XForce Terminal</h3>
        <p className="text-terminal-muted text-sm">
          Version 0.1.0 (Tauri Edition)
        </p>
        <p className="text-terminal-muted text-sm mt-1">
          A professional DeFi trading terminal for Solana
        </p>
      </div>
    </div>
  );
}
