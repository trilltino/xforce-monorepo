import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';
import { useTerminalStore } from '../stores/terminalStore';
import { useMarketCommands } from '../hooks/useTauri';

export function Chart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const { selectedToken } = useTerminalStore();
  const { getCandles } = useMarketCommands();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#12121a' },
        textColor: '#e0e0e0',
      },
      grid: {
        vertLines: { color: '#1e1e2e' },
        horzLines: { color: '#1e1e2e' },
      },
      rightPriceScale: {
        borderColor: '#1e1e2e',
      },
      timeScale: {
        borderColor: '#1e1e2e',
        timeVisible: true,
      },
    });

    // Create candlestick series
    const series = chart.addCandlestickSeries({
      upColor: '#10b981',
      downColor: '#ef4444',
      borderUpColor: '#10b981',
      borderDownColor: '#ef4444',
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    chartRef.current = chart;
    seriesRef.current = series;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  // Fetch and update candle data
  useEffect(() => {
    const updateCandles = async () => {
      if (!seriesRef.current) return;

      try {
        const candles = await getCandles(selectedToken, '1h', 100);
        const chartData: CandlestickData[] = candles.map(c => ({
          time: c.timestamp as unknown as string,
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
        }));
        
        seriesRef.current.setData(chartData);
        chartRef.current?.timeScale().fitContent();
      } catch (error) {
        console.error('Failed to fetch candles:', error);
      }
    };

    updateCandles();
  }, [selectedToken, getCandles]);

  return (
    <div className="panel h-full flex flex-col">
      <div className="p-3 border-b border-terminal-border font-semibold text-terminal-accent flex items-center justify-between">
        <span>{selectedToken}/USD</span>
        <div className="flex gap-2">
          {['1m', '5m', '15m', '1h', '4h', '1d'].map((tf) => (
            <button
              key={tf}
              className="px-2 py-1 text-xs rounded hover:bg-terminal-bg transition-colors"
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartContainerRef} className="flex-1" />
    </div>
  );
}
