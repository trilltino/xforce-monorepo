import { create } from 'zustand';

export interface PriceData {
  symbol: string;
  price: number;
  change_24h: number;
  volume_24h: number;
}

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logo_uri?: string;
}

export interface WalletState {
  connected: boolean;
  publicKey: string | null;
  balance: number;
}

export type Screen = 'terminal' | 'wallet' | 'settings';

interface TerminalState {
  // Navigation
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  
  // Market data
  prices: PriceData[];
  setPrices: (prices: PriceData[]) => void;
  selectedToken: string;
  setSelectedToken: (token: string) => void;
  
  // Token list
  tokens: TokenInfo[];
  setTokens: (tokens: TokenInfo[]) => void;
  
  // Wallet
  wallet: WalletState;
  setWallet: (wallet: WalletState) => void;
  
  // Swap state
  swapFrom: TokenInfo | null;
  swapTo: TokenInfo | null;
  swapAmount: string;
  setSwapFrom: (token: TokenInfo | null) => void;
  setSwapTo: (token: TokenInfo | null) => void;
  setSwapAmount: (amount: string) => void;
  
  // Loading states
  isLoadingPrices: boolean;
  setIsLoadingPrices: (loading: boolean) => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
  currentScreen: 'terminal',
  setScreen: (screen) => set({ currentScreen: screen }),
  
  prices: [],
  setPrices: (prices) => set({ prices }),
  selectedToken: 'SOL',
  setSelectedToken: (token) => set({ selectedToken: token }),
  
  tokens: [],
  setTokens: (tokens) => set({ tokens }),
  
  wallet: {
    connected: false,
    publicKey: null,
    balance: 0,
  },
  setWallet: (wallet) => set({ wallet }),
  
  swapFrom: null,
  swapTo: null,
  swapAmount: '',
  setSwapFrom: (token) => set({ swapFrom: token }),
  setSwapTo: (token) => set({ swapTo: token }),
  setSwapAmount: (amount) => set({ swapAmount: amount }),
  
  isLoadingPrices: false,
  setIsLoadingPrices: (loading) => set({ isLoadingPrices: loading }),
}));
