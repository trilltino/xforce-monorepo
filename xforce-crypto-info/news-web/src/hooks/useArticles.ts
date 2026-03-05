import { useQuery, useQueryClient } from '@tanstack/react-query';
import { newsApi } from '../services/newsApi';
import type { ArticleFilters } from '../types/article';

const ARTICLES_KEY = 'articles';

export function useArticles(filters: ArticleFilters = {}) {
  return useQuery({
    queryKey: [ARTICLES_KEY, filters],
    queryFn: () => newsApi.getLatest(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useArticle(id: number | null) {
  return useQuery({
    queryKey: [ARTICLES_KEY, 'detail', id],
    queryFn: () => (id ? newsApi.getById(id) : null),
    enabled: id !== null,
    staleTime: 1000 * 60 * 5,
  });
}

export function useArticlesByCategory(category: string | null) {
  return useQuery({
    queryKey: [ARTICLES_KEY, 'category', category],
    queryFn: () => (category ? newsApi.getByCategory(category) : []),
    enabled: category !== null,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSearchArticles(query: string) {
  return useQuery({
    queryKey: [ARTICLES_KEY, 'search', query],
    queryFn: () => (query ? newsApi.search(query) : []),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 1, // 1 minute for search results
  });
}

export function useFreeNews() {
  return useQuery({
    queryKey: [ARTICLES_KEY, 'free-news'],
    queryFn: () => newsApi.getFreeNews(),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePrefetchArticle() {
  const queryClient = useQueryClient();
  
  return (id: number) => {
    queryClient.prefetchQuery({
      queryKey: [ARTICLES_KEY, 'detail', id],
      queryFn: () => newsApi.getById(id),
      staleTime: 1000 * 60 * 5,
    });
  };
}
