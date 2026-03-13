import { useTerminalStore, type Screen } from '../stores/terminalStore';

const NAV_ITEMS: { id: Screen; label: string; icon: string }[] = [
  { id: 'terminal', label: 'Terminal', icon: '>' },
  { id: 'prices', label: 'Prices', icon: '$' },
  { id: 'social', label: 'Social-Fi', icon: '@' },
  { id: 'wallet', label: 'Wallet', icon: 'W' },
  { id: 'settings', label: 'Settings', icon: '*' },
];

export function Sidebar() {
  const { currentScreen, setScreen } = useTerminalStore();

  return (
    <aside className="w-60 m-4 mr-0 flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold text-terminal-accent flex items-center gap-2">
          <span className="text-2xl">X</span>
          Force
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
    </aside>
  );
}
