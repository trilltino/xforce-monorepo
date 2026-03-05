import { create } from 'zustand';
import { Connection, PublicKey } from '@solana/web3.js';

interface WalletState {
  // Connection
  connection: Connection | null;
  
  // Wallet state
  connected: boolean;
  publicKey: PublicKey | null;
  balance: number;
  
  // Actions
  setConnection: (connection: Connection) => void;
  setConnected: (connected: boolean) => void;
  setPublicKey: (publicKey: PublicKey | null) => void;
  setBalance: (balance: number) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  connection: null,
  connected: false,
  publicKey: null,
  balance: 0,
  
  setConnection: (connection) => set({ connection }),
  setConnected: (connected) => set({ connected }),
  setPublicKey: (publicKey) => set({ publicKey }),
  setBalance: (balance) => set({ balance }),
  disconnect: () => set({ 
    connected: false, 
    publicKey: null, 
    balance: 0 
  }),
}));
