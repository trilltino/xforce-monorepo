import { Link } from 'react-router-dom';
import { FreeNewsCard } from '../components/FreeNewsCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { useFreeNews } from '../hooks/useArticles';

export function FreeNews() {
  const { data: items, isLoading, error } = useFreeNews();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="text-primary-600 hover:underline mb-4 inline-block">
        ← Back to home
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Free Crypto News Sources
        </h1>
        <p className="text-gray-600">
          Aggregated from multiple free RSS sources
        </p>
      </header>

      <div className="mb-8">
        <CategoryFilter />
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow-sm p-6">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700">Failed to load news. Please try again later.</p>
        </div>
      ) : items && items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <FreeNewsCard key={`${item.source}-${index}`} item={item} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">No news items found.</p>
        </div>
      )}
    </div>
  );
}
