import { useEffect } from 'react';
import { useTerminalStore } from '../stores/terminalStore';
import { useMarketCommands } from '../hooks/useTauri';

export function PriceTable() {
  const { prices, setPrices, setIsLoadingPrices, selectedToken, setSelectedToken } = useTerminalStore();
  const { getPrices } = useMarketCommands();

  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoadingPrices(true);
      try {
        const data = await getPrices();
        setPrices(data);
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      } finally {
        setIsLoadingPrices(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000); // Update every 5s
    return () => clearInterval(interval);
  }, [getPrices, setPrices, setIsLoadingPrices]);

  return (
    <div className="panel h-full overflow-auto">
      <div className="p-3 border-b border-terminal-border font-semibold text-terminal-accent flex items-center justify-between">
        <span>Live Prices</span>
        <span className="text-xs text-terminal-muted font-normal">
          Auto-update: 5s
        </span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-terminal-border">
            <th className="table-header">Token</th>
            <th className="table-header text-right">Price</th>
            <th className="table-header text-right">24h Change</th>
            <th className="table-header text-right">Volume</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr
              key={price.symbol}
              onClick={() => setSelectedToken(price.symbol)}
              className={`cursor-pointer transition-colors ${
                selectedToken === price.symbol
                  ? 'bg-terminal-accent/10'
                  : 'hover:bg-terminal-panel'
              }`}
            >
              <td className="table-cell font-semibold">{price.symbol}</td>
              <td className="table-cell text-right font-mono">
                ${price.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
              </td>
              <td className={`table-cell text-right font-mono ${
                price.change_24h >= 0 ? 'price-up' : 'price-down'
              }`}>
                {price.change_24h >= 0 ? '+' : ''}{price.change_24h.toFixed(2)}%
              </td>
              <td className="table-cell text-right font-mono text-terminal-muted">
                ${(price.volume_24h / 1e9).toFixed(2)}B
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
