import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from './pages/Home';
import { ArticleDetail } from './pages/ArticleDetail';
import { Category } from './pages/Category';
import { FreeNews } from './pages/FreeNews';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<ArticleDetail />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/free-news" element={<FreeNews />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
