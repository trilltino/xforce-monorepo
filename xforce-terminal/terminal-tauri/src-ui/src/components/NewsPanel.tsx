import { useState, useEffect } from 'react';
import { useTerminalStore } from '../stores/terminalStore';

interface Article {
  id: number;
  title: string;
  source: string;
  url: string;
  published_at: string;
}

export function NewsPanel() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setScreen, setArticleUrl } = useTerminalStore();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3002/api/articles?limit=10');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load news articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (url: string) => {
    setArticleUrl(url);
    setScreen('reader');
  };

  return (
    <div className="flex flex-col h-full bg-terminal-bg">
      <div className="p-3 flex justify-between items-center bg-terminal-panel">
        <h2 className="text-terminal-accent font-bold uppercase tracking-wider text-xs flex items-center gap-2">
          <span className="w-2 h-2 bg-terminal-accent rounded-full animate-pulse"></span>
          Live Crypto Feed
        </h2>
        <span className="text-[10px] text-terminal-muted font-mono">10 ARTICLES</span>
      </div>

      <div className="flex-1 overflow-y-auto font-mono text-terminal-text">
        {loading ? (
          <div className="p-4 text-terminal-muted text-xs animate-pulse">
            LOADING SECURE FEED...
          </div>
        ) : error ? (
          <div className="p-4 text-terminal-danger text-xs uppercase">
            {error}
          </div>
        ) : articles.length === 0 ? (
          <div className="p-4 text-terminal-muted text-xs uppercase">
            NO ARTICLES FOUND
          </div>
        ) : (
          <div>
            {articles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article.url)}
                className="block p-3 hover:bg-terminal-accent hover:text-terminal-bg transition-colors group cursor-pointer"
              >
                <div className="flex justify-between items-start gap-4 mb-1">
                  <h3 className="text-xs font-bold leading-tight uppercase">
                    {article.title}
                  </h3>
                  <span className="text-[10px] whitespace-nowrap opacity-70 group-hover:opacity-100">
                    {new Date(article.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-tighter opacity-60 group-hover:opacity-100">
                  <span className="bg-terminal-border/20 px-1 rounded">NEWS</span>
                  <span>{article.source || 'CRYPTO_CORE'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
