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

export type Screen = 'terminal' | 'wallet' | 'social' | 'settings' | 'prices' | 'reader';

export interface CustomTheme {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  panelColor: string;
  fontFamily: string;
  fontSize: number;
}

interface TerminalState {
  // Navigation
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  isLightMode: boolean;
  setIsLightMode: (light: boolean) => void;
  
  // Custom theme
  customTheme: CustomTheme;
  setCustomTheme: (theme: CustomTheme) => void;
  resetTheme: () => void;
  
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
  
  // Reader
  activeArticleUrl: string | null;
  setArticleUrl: (url: string | null) => void;
}

const defaultDarkTheme: CustomTheme = {
  backgroundColor: '#0a0a0a',
  textColor: '#00ff41',
  accentColor: '#00ff41',
  panelColor: '#111111',
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 14,
};

const defaultLightTheme: CustomTheme = {
  backgroundColor: '#ffffff',
  textColor: '#1a1a1a',
  accentColor: '#0066cc',
  panelColor: '#f5f5f5',
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 14,
};

export const useTerminalStore = create<TerminalState>((set, get) => ({
  currentScreen: 'terminal',
  setScreen: (screen) => set({ currentScreen: screen }),
  isAuthenticated: false,
  setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
  isLightMode: false,
  setIsLightMode: (light) => {
    set({ isLightMode: light });
    if (light) {
      set({ customTheme: defaultLightTheme });
    } else {
      set({ customTheme: defaultDarkTheme });
    }
  },

  customTheme: defaultDarkTheme,
  setCustomTheme: (theme) => set({ customTheme: theme }),
  resetTheme: () => set({ customTheme: get().isLightMode ? defaultLightTheme : defaultDarkTheme }),

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

  activeArticleUrl: null,
  setArticleUrl: (url) => set({ activeArticleUrl: url }),
}));
