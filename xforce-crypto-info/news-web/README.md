# News Web

React frontend for XForce Crypto Info news aggregation service.

## Overview

A modern React dashboard for browsing cryptocurrency news articles with real-time updates, sentiment analysis indicators, and category filtering.

## Features

- Article browsing with infinite scroll
- Category filtering (Bitcoin, Ethereum, DeFi, NFT, etc.)
- Real-time search functionality
- Sentiment analysis indicators
- Responsive design for mobile and desktop
- Free news section for unauthenticated users
- Article detail view with related articles

## Project Structure

```
news-web/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleList.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── FreeNewsCard.tsx
│   │   └── SearchBar.tsx
│   ├── pages/              # Route-level components
│   │   ├── Home.tsx
│   │   ├── Category.tsx
│   │   ├── ArticleDetail.tsx
│   │   └── FreeNews.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useArticles.ts
│   ├── services/           # API integration
│   │   └── newsApi.ts
│   ├── types/              # TypeScript definitions
│   │   └── article.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── public/                 # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Access at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output in `dist/` directory.

## API Integration

The frontend communicates with the news API at configurable endpoints:

```typescript
// services/newsApi.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

### Endpoints Used

- `GET /api/articles` - Fetch paginated articles
- `GET /api/articles/:id` - Fetch single article
- `GET /api/articles/search?q=` - Search articles
- `GET /api/categories` - Fetch categories
- `GET /api/free-news` - Fetch free tier articles

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client

## Component Documentation

### ArticleCard
Displays article preview with title, summary, source, and sentiment indicator.

### ArticleList
Renders a list of ArticleCard components with infinite scroll.

### CategoryFilter
Horizontal scrollable list of category buttons for filtering.

### SearchBar
Real-time search input with debouncing.

## State Management

Uses React hooks for state management:
- `useState` for component state
- `useEffect` for side effects
- Custom `useArticles` hook for data fetching

## Styling

Tailwind CSS configuration:
- Custom colors for sentiment indicators (positive/negative/neutral)
- Responsive breakpoints
- Dark mode support
