import { useParams, Link } from 'react-router-dom';
import { ArticleList } from '../components/ArticleList';
import { CategoryFilter } from '../components/CategoryFilter';
import { useArticlesByCategory } from '../hooks/useArticles';

export function Category() {
  const { category } = useParams<{ category: string }>();
  
  const { data: articles, isLoading, error } = useArticlesByCategory(category || null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="text-primary-600 hover:underline mb-4 inline-block">
        ← Back to home
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Category: <span className="capitalize">{category}</span>
        </h1>
      </header>

      <div className="mb-8">
        <CategoryFilter />
      </div>

      <ArticleList 
        articles={articles || []} 
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
