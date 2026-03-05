import { useState } from 'react';
import { ArticleList } from '../components/ArticleList';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { useArticles, useSearchArticles } from '../hooks/useArticles';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: articles, isLoading, error } = useArticles({ limit: 20 });
  const { 
    data: searchResults, 
    isLoading: isSearching, 
    error: searchError 
  } = useSearchArticles(searchQuery);

  const displayArticles = searchQuery ? searchResults : articles;
  const isDisplayLoading = searchQuery ? isSearching : isLoading;
  const displayError = searchQuery ? searchError : error;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Crypto & Financial News
        </h1>
        <p className="text-gray-600">
          Stay updated with the latest cryptocurrency and financial news
        </p>
      </header>

      <div className="space-y-6 mb-8">
        <SearchBar onSearch={setSearchQuery} initialValue={searchQuery} />
        <CategoryFilter />
      </div>

      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Search results for: <span className="text-primary-600">"{searchQuery}"</span>
          </h2>
        </div>
      )}

      <ArticleList 
        articles={displayArticles || []} 
        isLoading={isDisplayLoading}
        error={displayError}
      />
    </div>
  );
}
