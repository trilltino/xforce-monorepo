// Copyright (c) 2024 XFTerminal
// SPDX-License-Identifier: Apache-2.0

/**
 * Pyth Price Panel Component
 * 
 * A searchable, categorized price panel for Solana tokens powered by Pyth Network oracle.
 * Displays real-time prices for tokens organized by category (Layer1, DEX, Lending, etc.)
 */

import { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Token categories with display names and emojis
const CATEGORIES = [
  { id: 'layer1', name: 'Layer 1 / Native' },
  { id: 'dex', name: 'DEX / AMM / Trading' },
  { id: 'lending', name: 'Lending / Borrowing' },
  { id: 'liquidStaking', name: 'Liquid Staking' },
  { id: 'meme', name: 'Meme Coins' },
  { id: 'gaming', name: 'Gaming / Metaverse' },
  { id: 'ai', name: 'AI / Tech' },
  { id: 'stablecoin', name: 'Stablecoins' },
  { id: 'infrastructure', name: 'Infrastructure' },
  { id: 'dao', name: 'DAOs / Governance' },
  { id: 'other', name: 'Other Notable' },
];

// Complete token registry - Pyth price feeds only
// Source: https://pyth.network/developers/price-feed-ids#solana-mainnet-beta
const TOKEN_REGISTRY = [
  // Layer 1 / Native
  { symbol: 'SOL', name: 'Solana', category: 'layer1', pythId: '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d' },
  { symbol: 'BTC', name: 'Bitcoin', category: 'layer1', pythId: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43' },
  { symbol: 'ETH', name: 'Ethereum', category: 'layer1', pythId: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace' },

  // Stablecoins (Pyth)
  { symbol: 'USDC', name: 'USD Coin', category: 'stablecoin', pythId: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a' },

  // DEX Core (Pyth only)
  { symbol: 'JUP', name: 'Jupiter', category: 'dex', pythId: '0x0a0408d619e9380abad35060f9192039ed5042fa6f82301d0e48bb52be830996' },
  { symbol: 'RAY', name: 'Raydium', category: 'dex', pythId: '0x91568baa8beb53db23eb3fb7f22c6e8bd303d103919e19733f2bb642d3e7987a' },
  { symbol: 'ORCA', name: 'Orca', category: 'dex', pythId: '0x37505261e557e251290b8c8899453064e8d760ed5c65a779726f2490980da74c' },
  { symbol: 'DRIFT', name: 'Drift Protocol', category: 'dex', pythId: '0x5c1690b27bb02446db17cdda13ccc2c1d609ad6d2ef5bf4983a85ea8b6f19d07' },

  // Liquid Staking (Pyth only)
  { symbol: 'JTO', name: 'Jito', category: 'liquidStaking', pythId: '0xb43660a5f790c69354b0729a5ef9d50d68f1df92107540210b9cccba1f947cc2' },

  // Meme Coins (Pyth only)
  { symbol: 'BONK', name: 'Bonk', category: 'meme', pythId: '0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419' },
  { symbol: 'WIF', name: 'Dogwifhat', category: 'meme', pythId: '0x4ca4beeca86f0d164160323817a4e42b10010a724c2217c6ee41b54cd4cc61fc' },
  { symbol: 'MOODENG', name: 'Moo Deng', category: 'meme', pythId: '0xffff73128917a90950cd0473fd2551d7cd274fd5a6cc45641881bbcc6ee73417' },
  { symbol: 'PNUT', name: 'Peanut the Squirrel', category: 'meme', pythId: '0x116da895807f81f6b5c5f01b109376e7f6834dc8b51365ab7cdfa66634340e54' },
  { symbol: 'GOAT', name: 'Goatseus Maximus', category: 'meme', pythId: '0xf7731dc812590214d3eb4343bfb13d1b4cfa9b1d4e020644b5d5d8e07d60c66c' },

  // Infrastructure (Pyth only)
  { symbol: 'PYTH', name: 'Pyth Network', category: 'infrastructure', pythId: '0x0bbf28e9a841a1cc788f6a361b17ca072d0ea3098a1e5df1c3922d06719579ff' },
  { symbol: 'LINK', name: 'Chainlink', category: 'infrastructure', pythId: '0x8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221' },
];

// API keys and endpoints
const PYTH_API_KEY = import.meta.env.VITE_PYTH_API_KEY || '';
const PYTH_HERMES_URL = 'https://hermes.pyth.network/v2/updates/price/latest';
const BACKEND_URL = 'http://localhost:3001';
const WS_URL = 'ws://localhost:3001/api/ws/prices';

interface TokenPrice {
  symbol: string;
  name: string;
  category: string;
  price: number | null;
  change24h: number | null;
  loading: boolean;
  error: string | null;
}

/**
 * ZERO-MOCK POLICY:
 * This component is strictly prohibited from generating or displaying synthetic/mocked price data.
 * All historical data MUST come from the backend CandleAggregator or Pyth Network.
 * If data is unavailable, a loading or "No Data" state must be displayed instead.
 */

// Fetch historical price data from backend
async function fetchTokenHistory(
  symbol: string,
  timeframe: '1h' | '24h' | '7d' | '30d' = '24h'
): Promise<Array<{ timestamp: number; price: number }>> {
  try {
    // Map timeframe for backend
    const tfMap: Record<string, string> = {
      '1h': '1m',
      '24h': '1h',
      '7d': '4h',
      '30d': '1d'
    };

    const response = await fetch(`${BACKEND_URL}/api/market/candles?symbol=${symbol}&timeframe=${tfMap[timeframe] || '1h'}&limit=100`);
    if (!response.ok) throw new Error('Failed to fetch candles');
    
    const data = await response.json();
    return data.map((c: any) => ({
      timestamp: c.timestamp,
      price: c.close
    }));
  } catch (error) {
    console.error(`[ZERO-MOCK] Failed to fetch real history for ${symbol}:`, error);
    return [];
  }
}

// Format price for display
function formatPrice(price: number | null): string {
  if (price === null) return '—';
  if (price >= 1000) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(6)}`;
}

// Format chart data for Recharts
function formatChartData(historicalData: Array<{ timestamp: number; price: number }>) {
  return historicalData.map(point => ({
    time: new Date(point.timestamp * 1000).toLocaleTimeString(),
    price: point.price,
    timestamp: point.timestamp
  }));
}

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
        <p className="text-gray-300 text-sm">{`Time: ${label}`}</p>
        <p className="text-white font-semibold">{`Price: ${formatPrice(data.price)}`}</p>
      </div>
    );
  }
  return null;
};

// Main Pyth Price Panel Component
export default function PythPricePanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [prices, setPrices] = useState<Map<string, { price: number; conf: number }>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chart state
  const [selectedToken, setSelectedToken] = useState<TokenPrice | null>(null);
  const [chartTimeframe, setChartTimeframe] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [historicalData, setHistoricalData] = useState<Array<{ timestamp: number; price: number }>>([]);
  const [chartLoading, setChartLoading] = useState(false);

  // WebSocket for real-time updates
  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout>;
    let reconnectAttempts = 0;
    const MAX_RECONNECT_ATTEMPTS = 3;

    function connect() {
      if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.log('[WS] Max reconnect attempts reached, using REST fallback');
        return;
      }
      
      console.log('[WS] Connecting to price stream...');
      try {
        ws = new WebSocket(WS_URL);

        ws.onopen = () => {
          console.log('[WS] Connected successfully');
          reconnectAttempts = 0;
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            if (message.type === 'price_update') {
              const { symbol, price } = message.data;
              // Update prices map
              setPrices(prev => {
                const next = new Map(prev);
                // Find the token in registry to get its Pyth ID or mint
                const token = TOKEN_REGISTRY.find(t => t.symbol === symbol);
                if (token) {
                  const key = token.pythId;
                  next.set(key, { price, conf: 0 });
                }
                return next;
              });
            }
          } catch (err) {
            console.error('[WS] Parse error:', err);
          }
        };

        ws.onclose = () => {
          reconnectAttempts++;
          if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
            console.log(`[WS] Connection closed, reconnecting... (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);
            reconnectTimeout = setTimeout(connect, 2000);
          } else {
            console.log('[WS] Connection closed, max attempts reached');
          }
        };

        ws.onerror = (err) => {
          console.error('[WS] Error:', err);
          ws?.close();
        };
      } catch (err) {
        console.error('[WS] Failed to create WebSocket:', err);
      }
    }

    connect();

    return () => {
      if (ws) ws.close();
      clearTimeout(reconnectTimeout);
    };
  }, []);

  // Fetch all prices once on mount as fallback
  useEffect(() => {
    async function fetchPrices() {
      setLoading(true);
      setError(null);

      const priceMap = new Map<string, { price: number; conf: number }>();

      // Get unique Pyth IDs and filter out invalid/dummy lengths
      const uniquePythIds = [...new Set(TOKEN_REGISTRY.map(t => t.pythId))];
      const validPythIds = uniquePythIds.filter(id => /^0x[0-9a-fA-F]{64}$/.test(id));

      try {
        // Fetch in batches of 10
        for (let i = 0; i < validPythIds.length; i += 10) {
          const batch = validPythIds.slice(i, i + 10);
          const idsParam = batch.map(id => `ids[]=${encodeURIComponent(id)}`).join('&');
          let url = `${PYTH_HERMES_URL}?${idsParam}`;
          if (PYTH_API_KEY) {
            url += `&api_key=${PYTH_API_KEY}`;
          }

          try {
            const response = await fetch(url);

            if (!response.ok) {
              console.error(`Batch fetch failed for Pyth: ${response.status} ${response.statusText}`);
              continue;
            }

            const data = await response.json();

            // V2 Format parsing: { parsed: [ { id, price: { price, expo, conf } } ] }
            if (data && Array.isArray(data.parsed)) {
              data.parsed.forEach((item: any) => {
                if (item?.price) {
                  const rawPrice = parseFloat(item.price.price);
                  const expo = item.price.expo;
                  const price = rawPrice * Math.pow(10, expo);
                  const fullId = item.id.startsWith('0x') ? item.id : `0x${item.id}`;
                  priceMap.set(fullId, { price, conf: parseFloat(item.price.conf) });
                }
              });
            }
          } catch (batchErr) {
            console.error('Batch error:', batchErr);
          }
        }

        setPrices(priceMap);
      } catch (err) {
        console.error('Failed to fetch prices:', err);
        setError('Failed to fetch prices from Pyth Network');
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, []);

  // Fetch historical data when token is selected
  useEffect(() => {
    if (selectedToken) {
      fetchHistoricalData();
    }
  }, [selectedToken, chartTimeframe]);

  // Function to fetch historical data
  const fetchHistoricalData = async () => {
    if (!selectedToken) return;
    setChartLoading(true);
    try {
      const data = await fetchTokenHistory(selectedToken.symbol, chartTimeframe);
      // STRICT: No mock fallback allowed per institutional requirements
      setHistoricalData(data);
    } catch (error) {
      console.error('[ZERO-MOCK] Error fetching historical sequence:', error);
      setHistoricalData([]);
    } finally {
      setChartLoading(false);
    }
  };

  // Function to open chart for a token
  const openChart = (token: TokenPrice) => {
    setSelectedToken(token);
  };

  // Function to close chart
  const closeChart = () => {
    setSelectedToken(null);
    setHistoricalData([]);
  };

  // Get token prices with current price data
  const tokenPrices: TokenPrice[] = useMemo(() => {
    return TOKEN_REGISTRY.map(token => {
      const priceData = prices.get(token.pythId);
      return {
        symbol: token.symbol,
        name: token.name,
        category: token.category,
        price: priceData?.price ?? null,
        change24h: null, // Would need historical data for this
        loading: false,
        error: null,
      };
    });
  }, [prices]);

  // Filter and group tokens
  const filteredAndGrouped = useMemo(() => {
    let filtered = tokenPrices;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t =>
        t.symbol.toLowerCase().includes(query) ||
        t.name.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    // Group by category
    const groups = CATEGORIES.map(cat => ({
      ...cat,
      tokens: filtered.filter(t => t.category === cat.id),
    })).filter(g => g.tokens.length > 0);

    return groups;
  }, [tokenPrices, searchQuery, selectedCategory]);

  // Calculate total tokens
  const totalTokens = TOKEN_REGISTRY.length;
  const availablePrices = prices.size;

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold">PY</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Pyth Price Feeds</h2>
            <p className="text-xs text-gray-400">
              {availablePrices}/{totalTokens} tokens available
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {loading && (
            <div className="animate-spin w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full" />
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 p-4 overflow-x-auto border-b border-gray-700">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${selectedCategory === null
            ? 'bg-purple-500 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${selectedCategory === cat.id
              ? 'bg-purple-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            {cat.name.split('/')[0]}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-4 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Token List */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && prices.size === 0 ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
          </div>
        ) : filteredAndGrouped.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">No tokens found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAndGrouped.map(category => (
              <div key={category.id}>
                <h3 className="text-sm font-medium text-gray-400 mb-3">
                  {category.name} ({category.tokens.length})
                </h3>
                <div className="grid gap-2">
                  {category.tokens.map(token => (
                    <div
                      key={token.symbol}
                      className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors cursor-pointer"
                      onClick={() => openChart(token)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                          {token.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium">{token.symbol}</p>
                          <p className="text-xs text-gray-400">{token.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-medium">
                          {token.price !== null ? formatPrice(token.price) : '—'}
                        </p>
                        {token.change24h !== null && (
                          <p className={`text-xs ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-700 text-xs text-gray-500 flex items-center justify-between">
        <span>Powered by Pyth Network</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          Live Stream (500ms)
        </span>
      </div>

      {/* Chart Modal */}
      {selectedToken && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Chart Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold">PY</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{selectedToken.symbol} Price Chart</h2>
                  <p className="text-sm text-gray-400">{selectedToken.name}</p>
                </div>
              </div>
              <button
                onClick={closeChart}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-2 p-4 border-b border-gray-700">
              {[
                { id: '1h', label: '1H' },
                { id: '24h', label: '24H' },
                { id: '7d', label: '7D' },
                { id: '30d', label: '30D' }
              ].map(timeframe => (
                <button
                  key={timeframe.id}
                  onClick={() => setChartTimeframe(timeframe.id as any)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${chartTimeframe === timeframe.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="p-4">
              {chartLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
                </div>
              ) : historicalData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formatChartData(historicalData)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="time"
                        stroke="#9CA3AF"
                        fontSize={12}
                        tick={{ fill: '#9CA3AF' }}
                      />
                      <YAxis
                        stroke="#9CA3AF"
                        fontSize={12}
                        tick={{ fill: '#9CA3AF' }}
                        tickFormatter={(value) => `$${value.toFixed(2)}`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, fill: '#8B5CF6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-sm">No historical data available</p>
                </div>
              )}
            </div>

            {/* Current Price Info */}
            <div className="p-4 border-t border-gray-700 bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Current Price</p>
                  <p className="text-lg font-semibold">{formatPrice(selectedToken.price)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Data Points</p>
                  <p className="text-lg font-semibold">{historicalData.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
