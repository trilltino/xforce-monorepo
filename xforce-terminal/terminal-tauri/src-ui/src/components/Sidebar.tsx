import { useTerminalStore, type Screen } from '../stores/terminalStore';

const NAV_ITEMS: { id: Screen; label: string; icon: string }[] = [
  { id: 'terminal', label: 'Terminal', icon: '◈' },
  { id: 'wallet', label: 'Wallet', icon: '◉' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
];

export function Sidebar() {
  const { currentScreen, setScreen, wallet } = useTerminalStore();

  return (
    <aside className="w-60 panel m-4 mr-0 flex flex-col">
      <div className="p-4 border-b border-terminal-border">
        <h1 className="text-xl font-bold text-terminal-accent flex items-center gap-2">
          <span className="text-2xl">◈</span>
          XForce
        </h1>
        <p className="text-xs text-terminal-muted mt-1">DeFi Terminal</p>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`nav-item w-full ${currentScreen === item.id ? 'active' : ''}`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-terminal-border">
        {wallet.connected ? (
          <div className="text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-terminal-success animate-pulse"></span>
              <span className="text-terminal-success">Connected</span>
            </div>
            <p className="text-terminal-muted font-mono text-xs truncate">
              {wallet.publicKey}
            </p>
            <p className="text-terminal-text font-semibold mt-1">
              {wallet.balance.toFixed(4)} SOL
            </p>
          </div>
        ) : (
          <div className="text-sm text-terminal-muted">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-terminal-muted"></span>
              <span>Disconnected</span>
            </div>
            <button 
              onClick={() => setScreen('wallet')}
              className="btn-primary w-full mt-2 text-xs"
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
