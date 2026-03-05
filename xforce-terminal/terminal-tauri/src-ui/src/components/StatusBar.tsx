import { useTerminalStore } from '../stores/terminalStore';

export function StatusBar() {
  const { isLoadingPrices, prices } = useTerminalStore();

  const solPrice = prices.find(p => p.symbol === 'SOL');

  return (
    <footer className="h-8 bg-terminal-panel border-t border-terminal-border flex items-center px-4 text-xs">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terminal-success animate-pulse"></span>
          <span className="text-terminal-success">Online</span>
        </div>
        
        {isLoadingPrices ? (
          <span className="text-terminal-muted">Updating prices...</span>
        ) : (
          solPrice && (
            <div className="flex items-center gap-4">
              <span className="font-mono">
                SOL: <span className="text-terminal-text">${solPrice.price.toFixed(2)}</span>
                <span className={solPrice.change_24h >= 0 ? 'text-terminal-success ml-1' : 'text-terminal-danger ml-1'}>
                  {solPrice.change_24h >= 0 ? '+' : ''}{solPrice.change_24h.toFixed(2)}%
                </span>
              </span>
            </div>
          )
        )}
      </div>

      <div className="ml-auto text-terminal-muted">
        XForce Terminal v0.1.0
      </div>
    </footer>
  );
}
