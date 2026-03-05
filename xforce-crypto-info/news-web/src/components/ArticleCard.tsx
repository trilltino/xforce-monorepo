import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import type { Article } from '../types/article';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const sentimentClass = article.sentiment_label?.toLowerCase() || 'neutral';
  
  const getExcerpt = (content: string | null) => {
    if (!content) return '';
    return content.length > 200 ? `${content.slice(0, 200)}...` : content;
  };

  return (
    <article className="article-card">
      <h2>
        <Link to={`/news/${article.id}`} className="hover:text-primary-600 transition-colors">
          {article.title}
        </Link>
      </h2>
      
      <div className="meta">
        <span>{article.author || 'Unknown'}</span>
        <span>•</span>
        <span>{article.category || 'General'}</span>
        {article.sentiment_label && (
          <span className={`sentiment-${sentimentClass}`}>
            {article.sentiment_label}
          </span>
        )}
      </div>

      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <p className="text-gray-600 leading-relaxed">
        {getExcerpt(article.content)}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <Link
          to={`/news/${article.id}`}
          className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
        >
          Read more →
        </Link>
        {article.published_at && (
          <time className="text-sm text-gray-400">
            {formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
          </time>
        )}
      </div>
    </article>
  );
}
