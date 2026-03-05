import { Link, useLocation } from 'react-router-dom';

const CATEGORIES = [
  { name: 'All', path: '/' },
  { name: 'Crypto', path: '/category/crypto' },
  { name: 'Bitcoin', path: '/category/bitcoin' },
  { name: 'Financial', path: '/category/financial' },
  { name: 'Free News', path: '/free-news' },
];

export function CategoryFilter() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => (
        <Link
          key={category.path}
          to={category.path}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPath === category.path
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
