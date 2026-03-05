import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { Terminal } from './pages/Terminal';
import { Wallet } from './pages/Wallet';
import { Settings } from './pages/Settings';
import { useTerminalStore } from './stores/terminalStore';
import { useMarketCommands } from './hooks/useTauri';

function App() {
  const { currentScreen, setTokens } = useTerminalStore();
  const { getTokenList } = useMarketCommands();

  // Load token list on mount
  useEffect(() => {
    const loadTokens = async () => {
      try {
        const tokens = await getTokenList();
        setTokens(tokens);
      } catch (error) {
        console.error('Failed to load token list:', error);
      }
    };

    loadTokens();
  }, [getTokenList, setTokens]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'terminal':
        return <Terminal />;
      case 'wallet':
        return <Wallet />;
      case 'settings':
        return <Settings />;
      default:
        return <Terminal />;
    }
  };

  return (
    <Layout>
      {renderScreen()}
    </Layout>
  );
}

export default App;
