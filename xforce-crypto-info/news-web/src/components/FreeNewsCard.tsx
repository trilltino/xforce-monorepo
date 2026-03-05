import { formatDistanceToNow } from 'date-fns';
import type { FreeNewsItem } from '../types/article';

interface FreeNewsCardProps {
  item: FreeNewsItem;
}

export function FreeNewsCard({ item }: FreeNewsCardProps) {
  return (
    <article className="article-card">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-600 transition-colors"
        >
          {item.title}
        </a>
      </h2>
      
      <div className="meta">
        <span className="text-primary-600 font-medium">{item.source}</span>
        <span>•</span>
        <time className="text-gray-400">
          {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
        </time>
      </div>

      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-primary-600 font-medium hover:text-primary-700 transition-colors"
      >
        Read original article →
      </a>
    </article>
  );
}
