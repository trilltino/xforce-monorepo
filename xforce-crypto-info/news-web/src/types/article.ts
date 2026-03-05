export interface Article {
  id: number;
  source_id: number;
  external_id: string | null;
  title: string;
  content: string | null;
  url: string;
  author: string | null;
  published_at: string | null;
  scraped_at: string;
  category: string | null;
  tags: string[] | null;
  sentiment_score: number | null;
  sentiment_label: string | null;
  keywords: string[] | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface FreeNewsItem {
  title: string;
  timestamp: string;
  source: string;
  url: string;
}

export interface ArticleFilters {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export type SentimentLabel = 'positive' | 'negative' | 'neutral';
