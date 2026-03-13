import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Terminal } from './pages/Terminal';
import { Wallet } from './pages/Wallet';
import { Settings } from './pages/Settings';
import { Social } from './pages/Social';
import PythPricePanel from './components/PythPricePanel';
import { useTerminalStore } from './stores/terminalStore';
import { useMarketCommands } from './hooks/useTauri';

// Fallback token list when Jupiter API is unavailable
const FALLBACK_TOKENS = [
  { address: 'So11111111111111111111111111111111111111112', symbol: 'SOL', name: 'Solana', decimals: 9, logo_uri: '' },
  { address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', symbol: 'USDC', name: 'USD Coin', decimals: 6, logo_uri: '' },
  { address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', symbol: 'USDT', name: 'Tether', decimals: 6, logo_uri: '' },
  { address: '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh', symbol: 'BTC', name: 'Bitcoin', decimals: 8, logo_uri: '' },
  { address: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs', symbol: 'ETH', name: 'Ethereum', decimals: 8, logo_uri: '' },
  { address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', symbol: 'JUP', name: 'Jupiter', decimals: 6, logo_uri: '' },
  { address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', symbol: 'BONK', name: 'Bonk', decimals: 5, logo_uri: '' },
  { address: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm', symbol: 'WIF', name: 'Dogwifhat', decimals: 6, logo_uri: '' },
];

function App() {
  const { currentScreen, setTokens, isAuthenticated, isLightMode, customTheme } = useTerminalStore();
  const { getTokenList } = useMarketCommands();

  // Apply custom theme globally
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--terminal-bg', customTheme.backgroundColor);
    root.style.setProperty('--terminal-text', customTheme.textColor);
    root.style.setProperty('--terminal-accent', customTheme.accentColor);
    root.style.setProperty('--terminal-panel', customTheme.panelColor);
    root.style.setProperty('--terminal-font', customTheme.fontFamily);
    root.style.setProperty('--terminal-font-size', `${customTheme.fontSize}px`);
    document.body.style.fontFamily = customTheme.fontFamily;
    document.body.style.backgroundColor = customTheme.backgroundColor;
    document.body.style.color = customTheme.textColor;
  }, [customTheme]);

  // Load token list on mount
  useEffect(() => {
    const loadTokens = async () => {
      try {
        const tokens = await getTokenList();
        setTokens(tokens);
      } catch (error) {
        console.error('Failed to load token list from API, using fallback:', error);
        setTokens(FALLBACK_TOKENS);
      }
    };
    loadTokens();
  }, [getTokenList, setTokens]);

  // Apply light mode class to body
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'terminal':
        return <Terminal />;
      case 'prices':
        return <PythPricePanel />;
      case 'wallet':
        return <Wallet />;
      case 'social':
        return <Social />;
      case 'settings':
        return <Settings />;
      case 'reader':
        return <Reader />;
      default:
        return <Terminal />;
    }
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div style={{ 
      backgroundColor: customTheme.backgroundColor, 
      color: customTheme.textColor,
      fontFamily: customTheme.fontFamily,
      minHeight: '100vh'
    }}>
      <Layout>
        {renderScreen()}
      </Layout>
    </div>
  );
}

function Reader() {
  const { activeArticleUrl, setScreen, setArticleUrl, customTheme } = useTerminalStore();

  const handleBack = () => {
    setArticleUrl(null);
    setScreen('terminal');
  };

  if (!activeArticleUrl) {
    return (
      <div 
        className="flex flex-col items-center justify-center h-full font-mono uppercase"
        style={{ color: customTheme.textColor, opacity: 0.6 }}
      >
        <p>No article selected</p>
        <button 
          onClick={handleBack}
          className="mt-4 px-4 py-2 transition-colors"
          style={{ 
            border: `1px solid ${customTheme.accentColor}`,
            color: customTheme.accentColor
          }}
        >
          [ BACK TO DASHBOARD ]
        </button>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col h-full"
      style={{ backgroundColor: customTheme.backgroundColor }}
    >
      <div 
        className="p-2 flex justify-between items-center"
        style={{ 
          backgroundColor: customTheme.panelColor,
          borderBottom: `1px solid ${customTheme.accentColor}`
        }}
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="text-[10px] font-mono hover:underline uppercase"
            style={{ color: customTheme.accentColor }}
          >
            ← BACK
          </button>
          <span 
            className="text-[10px] font-mono truncate max-w-[400px]"
            style={{ color: customTheme.textColor, opacity: 0.6 }}
          >
            {activeArticleUrl}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span 
            className="text-[10px] animate-pulse font-mono"
            style={{ color: customTheme.accentColor }}
          >
            ● ENCRYPTED_VIEW
          </span>
        </div>
      </div>
      <div className="flex-1 w-full">
        <iframe 
          src={activeArticleUrl} 
          className="w-full h-full border-none"
          style={{ backgroundColor: customTheme.backgroundColor }}
          title="Article Content"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    </div>
  );
}

export default App;
