import axios from 'axios';
import type { Article, FreeNewsItem, ArticleFilters } from '../types/article';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const newsApi = {
  // Get latest articles
  async getLatest(filters: ArticleFilters = {}): Promise<Article[]> {
    const { data } = await api.get('/articles', { params: filters });
    return data;
  },

  // Get article by ID
  async getById(id: number): Promise<Article | null> {
    const { data } = await api.get(`/articles/${id}`);
    return data;
  },

  // Get articles by category
  async getByCategory(category: string, filters: Omit<ArticleFilters, 'category'> = {}): Promise<Article[]> {
    const { data } = await api.get(`/articles/category/${category}`, { params: filters });
    return data;
  },

  // Search articles
  async search(query: string, filters: Omit<ArticleFilters, 'search'> = {}): Promise<Article[]> {
    const { data } = await api.get('/articles/search', { params: { q: query, ...filters } });
    return data;
  },

  // Get free news from RSS sources
  async getFreeNews(): Promise<FreeNewsItem[]> {
    const { data } = await api.get('/free-news');
    return data;
  },

  // Get available categories
  async getCategories(): Promise<string[]> {
    const { data } = await api.get('/categories');
    return data;
  },
};
