import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useArticle } from '../hooks/useArticles';

export function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const articleId = id ? parseInt(id, 10) : null;
  
  const { data: article, isLoading, error } = useArticle(articleId);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700">Article not found or failed to load.</p>
          <Link to="/" className="text-primary-600 hover:underline mt-4 inline-block">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="text-primary-600 hover:underline mb-6 inline-block">
        ← Back to home
      </Link>

      <article className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span>{article.author || 'Unknown'}</span>
          <span>•</span>
          {article.published_at && (
            <time>{format(new Date(article.published_at), 'MMMM d, yyyy HH:mm')}</time>
          )}
          <span>•</span>
          <span>{article.category || 'General'}</span>
          {article.sentiment_label && (
            <>
              <span>•</span>
              <span className={`sentiment-${article.sentiment_label.toLowerCase()}`}>
                {article.sentiment_label}
              </span>
            </>
          )}
        </div>

        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {article.content || 'No content available.'}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            Read original article →
          </a>
        </div>
      </article>
    </div>
  );
}
