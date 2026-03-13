import { useTerminalStore } from '../stores/terminalStore';

export function StatusBar() {
  const { isLoadingPrices, prices } = useTerminalStore();

  const solPrice = prices.find(p => p.symbol === 'SOL');

  return (
    <footer className="h-8 bg-terminal-bg flex items-center px-4 text-xs">
      <div className="flex items-center gap-6 w-full">
        {isLoadingPrices ? (
          <span className="text-terminal-muted italic">Updating price feed...</span>
        ) : (
          solPrice && (
            <div className="flex items-center gap-4">
              <span className="font-mono">
                SOL: <span className="text-terminal-text">${solPrice.price.toFixed(2)}</span>
                  <span className="ml-2 font-bold tracking-tighter">
                    {solPrice.change_24h >= 0 ? '+' : '-'} {Math.abs(solPrice.change_24h).toFixed(2)}%
                </span>
              </span>
            </div>
          )
        )}
      </div>
    </footer>
  );
}
