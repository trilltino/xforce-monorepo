import { useState } from 'react';
import { useTerminalStore } from '../stores/terminalStore';
import { useSwapCommands } from '../hooks/useTauri';

export function SwapPanel() {
  const { 
    swapFrom, 
    swapTo, 
    swapAmount, 
    setSwapAmount, 
    tokens,
    wallet 
  } = useTerminalStore();
  
  const { getSwapQuote, executeSwap } = useSwapCommands();
  const [quote, setQuote] = useState<{
    input_amount: number;
    output_amount: number;
    price_impact_pct: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetQuote = async () => {
    if (!swapFrom || !swapTo || !swapAmount) return;
    
    setIsLoading(true);
    try {
      const result = await getSwapQuote({
        input_mint: swapFrom.address,
        output_mint: swapTo.address,
        amount: parseFloat(swapAmount) * Math.pow(10, swapFrom.decimals),
        slippage_bps: 50,
      });
      setQuote(result);
    } catch (error) {
      console.error('Failed to get quote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = async () => {
    if (!quote) return;
    
    try {
      const signature = await executeSwap(quote);
      console.log('Swap executed:', signature);
      setQuote(null);
      setSwapAmount('');
    } catch (error) {
      console.error('Swap failed:', error);
    }
  };

  return (
    <div className="panel h-full flex flex-col">
      <div className="p-3 border-b border-terminal-border font-semibold text-terminal-accent">
        Swap Tokens
      </div>
      
      <div className="p-4 space-y-4 flex-1">
        {/* From Token */}
        <div>
          <label className="text-xs text-terminal-muted mb-1 block">From</label>
          <select 
            className="input w-full"
            value={swapFrom?.address || ''}
            onChange={(e) => {
              const token = tokens.find(t => t.address === e.target.value);
              // setSwapFrom(token || null);
            }}
          >
            <option value="">Select token</option>
            {tokens.map(t => (
              <option key={t.address} value={t.address}>
                {t.symbol} - {t.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={swapAmount}
            onChange={(e) => setSwapAmount(e.target.value)}
            placeholder="0.0"
            className="input w-full mt-2"
          />
        </div>

        {/* Swap Arrow */}
        <div className="flex justify-center">
          <button className="p-2 rounded-lg bg-terminal-bg hover:bg-terminal-border transition-colors">
            ⇅
          </button>
        </div>

        {/* To Token */}
        <div>
          <label className="text-xs text-terminal-muted mb-1 block">To</label>
          <select 
            className="input w-full"
            value={swapTo?.address || ''}
            onChange={(e) => {
              const token = tokens.find(t => t.address === e.target.value);
              // setSwapTo(token || null);
            }}
          >
            <option value="">Select token</option>
            {tokens.map(t => (
              <option key={t.address} value={t.address}>
                {t.symbol} - {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quote Display */}
        {quote && (
          <div className="p-3 bg-terminal-bg rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-terminal-muted">Expected Output</span>
              <span>{(quote.output_amount / 1e6).toFixed(6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-terminal-muted">Price Impact</span>
              <span className={quote.price_impact_pct > 1 ? 'text-terminal-danger' : 'text-terminal-success'}>
                {quote.price_impact_pct.toFixed(2)}%
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        {!wallet.connected ? (
          <button className="btn-secondary w-full" disabled>
            Connect Wallet to Swap
          </button>
        ) : quote ? (
          <button 
            onClick={handleSwap}
            className="btn-success w-full"
          >
            Confirm Swap
          </button>
        ) : (
          <button 
            onClick={handleGetQuote}
            disabled={!swapFrom || !swapTo || !swapAmount || isLoading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {isLoading ? 'Getting Quote...' : 'Get Quote'}
          </button>
        )}
      </div>
    </div>
  );
}
