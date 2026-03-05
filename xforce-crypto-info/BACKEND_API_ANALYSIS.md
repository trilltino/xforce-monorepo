# Backend API Call Analysis

## Summary

The backend is **NOT** making internal HTTP API calls. Instead:

1. **Frontend uses Server Functions** (not REST API endpoints)
2. **Server Functions access database directly** (no HTTP calls)
3. **Only external HTTP calls** are for fetching RSS feeds

## Current Architecture

### Frontend Components → Server Functions → Database

```
Frontend Component
    ↓
Server Function (e.g., get_latest_articles)
    ↓
app_state.repository.find_latest_articles()
    ↓
Direct SQL query to PostgreSQL database
```

### What's Actually Happening:

#### 1. Server Functions (Used by Frontend)
- ✅ `get_latest_articles()` → Direct DB access via `repository.find_latest_articles()`
- ✅ `get_article_by_id()` → Direct DB access via `repository.find_article_by_id()`
- ✅ `get_articles_by_category()` → Direct DB access via `repository.find_articles_by_category()`
- ✅ `search_articles()` → Direct DB access via `repository.search_articles()`
- ✅ `get_free_news_sources()` → **Makes external HTTP calls** to RSS feeds via `fetch_news_from_source()`

#### 2. REST API Routes (Defined but NOT used by frontend)
These routes are still registered but the frontend doesn't call them:
- `/api/news/latest` → `handlers::news::get_latest_news` (direct DB access)
- `/api/news/category/{category}` → `handlers::news::get_news_by_category` (direct DB access)
- `/api/news/search` → `handlers::news::search_news` (direct DB access)
- `/api/news/article/{id}` → `handlers::news::get_article_by_id` (direct DB access)
- `/api/news/free-sources` → `handlers::news::get_free_news_sources` (external HTTP calls)

## External HTTP Calls

**Only one place makes external HTTP calls:**
- `fetch_news_from_source()` in `news-service/src/fetchers/rss_fetcher.rs`
- Uses `reqwest::Client` to fetch RSS feeds from external sources
- Called by both:
  - Server function: `get_free_news_sources()`
  - REST API handler: `handlers::news::get_free_news_sources()`

## Conclusion

✅ **No internal API calls** - Server functions access database directly
✅ **No HTTP overhead** - Direct database queries are more efficient
✅ **Only external calls** - RSS feed fetching uses HTTP (as expected)
⚠️ **REST API routes unused** - Can be removed if not needed for external clients

