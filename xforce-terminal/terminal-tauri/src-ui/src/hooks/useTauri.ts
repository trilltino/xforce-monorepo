import { invoke } from '@tauri-apps/api/core';
import { useCallback } from 'react';

// Wallet commands
export function useWalletCommands() {
  const connectWallet = useCallback(async (keypairPath?: string) => {
    return invoke<{ public_key: string; balance: number }>('connect_wallet', { keypairPath });
  }, []);

  const disconnectWallet = useCallback(async () => {
    return invoke<void>('disconnect_wallet');
  }, []);

  const getBalance = useCallback(async () => {
    return invoke<number>('get_wallet_balance');
  }, []);

  return { connectWallet, disconnectWallet, getBalance };
}

// Market commands
export function useMarketCommands() {
  const getPrices = useCallback(async () => {
    return invoke<Array<{
      symbol: string;
      price: number;
      change_24h: number;
      volume_24h: number;
    }>>('get_prices');
  }, []);

  const getTokenList = useCallback(async () => {
    return invoke<Array<{
      address: string;
      symbol: string;
      name: string;
      decimals: number;
      logo_uri?: string;
    }>>('get_token_list');
  }, []);

  const getCandles = useCallback(async (symbol: string, timeframe: string, limit?: number) => {
    return invoke<Array<{
      timestamp: number;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
    }>>('get_candles', { symbol, timeframe, limit });
  }, []);

  return { getPrices, getTokenList, getCandles };
}

// Swap commands
export function useSwapCommands() {
  const getSwapQuote = useCallback(async (params: {
    input_mint: string;
    output_mint: string;
    amount: number;
    slippage_bps?: number;
  }) => {
    return invoke<{
      input_amount: number;
      output_amount: number;
      price_impact_pct: number;
      route: string[];
      min_output_amount: number;
    }>('get_swap_quote', { request: params });
  }, []);

  const executeSwap = useCallback(async (quote: unknown, priorityFee?: number) => {
    return invoke<string>('execute_swap', { 
      request: { quote, priority_fee: priorityFee } 
    });
  }, []);

  return { getSwapQuote, executeSwap };
}
