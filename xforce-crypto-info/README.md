# XForce Crypto Info

Crypto news aggregation and analysis service with React frontend and Python scraper backend.

## Overview

XForce Crypto Info aggregates cryptocurrency news from multiple RSS feeds and APIs, performs sentiment analysis, and presents the information through a modern React dashboard. The service helps traders stay informed about market-moving events.

## Features

- RSS feed aggregation from 10+ sources
- Real-time news updates
- Sentiment analysis of articles
- PostgreSQL storage for historical data
- Category-based filtering
- Search functionality
- Free news endpoint for unauthenticated users

## Project Structure

```
xforce-crypto-info/
├── news-web/              # React frontend dashboard
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Route pages
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   └── package.json
├── news-scraper/          # Python news scraper
│   ├── scrapers/          # RSS/API scrapers
│   ├── processors/        # Data processing
│   └── writers/           # Database writers
├── ref/                   # Reference implementations
│   ├── axum/
│   ├── leptos/
│   ├── polars/
│   ├── pyo3/
│   └── sqlx/
└── Cargo.toml            # Rust workspace
```

## Components

### News Web (React)
Frontend dashboard for browsing and searching crypto news.

```bash
cd news-web
npm install
npm run dev  # http://localhost:5173
```

Features:
- Article cards with sentiment indicators
- Category filtering (Bitcoin, Ethereum, DeFi, etc.)
- Real-time search
- Article detail view
- Free news section

### News Scraper (Python)
Background service for collecting news from multiple sources.

```bash
cd news-scraper
pip install -r requirements.txt
python main.py
```

Features:
- RSS feed parsing
- API integration (CryptoCompare, etc.)
- Sentiment analysis using NLTK/VADER
- PostgreSQL storage
- Duplicate detection

## API Endpoints

```
GET /api/articles              # List all articles
GET /api/articles/:id          # Get single article
GET /api/articles/search?q=    # Search articles
GET /api/categories            # List categories
GET /api/free-news             # Free tier news feed
```

## Configuration

### News Web
Environment variables in `.env`:
```env
VITE_API_URL=http://localhost:8000
```

### News Scraper
Configuration in `config.py`:
```python
RSS_FEEDS = [
    "https://cointelegraph.com/rss",
    "https://coindesk.com/feed",
    # ...
]

DB_CONNECTION = "postgresql://user:pass@localhost/crypto_news"
```

## Documentation

- `CRYPTO_NEWS_SERVICE_PLAN.md` - Service architecture and planning
- `BACKEND_API_ANALYSIS.md` - API design analysis

## Development

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 14+

### Frontend Development

```bash
cd news-web
npm install
npm run dev
```

### Scraper Development

```bash
cd news-scraper
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

## Database Schema

### Articles
- id, title, content, summary, url, source
- category, sentiment_score, published_at, created_at

### Sources
- id, name, url, type (rss/api), active, last_fetch

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
