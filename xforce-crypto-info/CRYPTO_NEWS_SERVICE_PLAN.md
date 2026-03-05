# Crypto and Financial News Service - Implementation Plan

## Overview

Create a separate news service with Rust Axum API server and Python scraper using Polars for data processing. The service will scrape crypto and financial news from multiple sources, store in SQLite/PostgreSQL, and expose REST APIs for the terminal app to consume.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Terminal App (egui)                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  NewsApiClient (reqwest)                                 │  │
│  │  - get_latest_news()                                     │  │
│  │  - get_news_by_category()                                │  │
│  │  - search_news()                                         │  │
│  └──────────────────────┬───────────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────────────┘
                          │ HTTP/JSON
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│              News Service (Rust Axum)                           │
│              http://127.0.0.1:3003                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  REST API Endpoints                                       │  │
│  │  - GET /api/news/latest                                  │  │
│  │  - GET /api/news/category/{category}                     │  │
│  │  - GET /api/news/search?q={query}                        │  │
│  │  - GET /api/news/sources                                 │  │
│  │  - GET /api/news/sentiment/{article_id}                  │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│  ┌──────────────────────▼───────────────────────────────────┐  │
│  │  Database Layer (SQLx + SQLite/PostgreSQL)               │  │
│  │  - News articles table                                   │  │
│  │  - Sources table                                         │  │
│  │  - Sentiment analysis table                              │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                          ▲
                          │ Database writes
                          │
┌─────────────────────────────────────────────────────────────────┐
│              News Scraper (Python)                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Scrapers:                                                │  │
│  │  - RSS Feeds (feedparser)                                │  │
│  │  - Web Scraping (BeautifulSoup, Scrapy)                  │  │
│  │  - API Clients (requests)                                │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│  ┌──────────────────────▼───────────────────────────────────┐  │
│  │  Data Processing (Polars)                                │  │
│  │  - Clean and normalize data                              │  │
│  │  - Extract metadata                                      │  │
│  │  - Sentiment analysis                                    │  │
│  │  - Deduplication                                         │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│  ┌──────────────────────▼───────────────────────────────────┐  │
│  │  Database Writer                                         │  │
│  │  - Insert news articles                                  │  │
│  │  - Update source status                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Phase 1: Database Schema Design

### 1.1 Create Database Migrations

**File**: `news-service/migrations/001_create_sources.sql`
```sql
CREATE TABLE IF NOT EXISTS sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('rss', 'api', 'scraper')),
    endpoint TEXT,
    api_key TEXT,
    enabled BOOLEAN DEFAULT 1,
    last_scraped_at TIMESTAMP,
    scrape_interval_minutes INTEGER DEFAULT 15,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sources_enabled ON sources(enabled);
CREATE INDEX idx_sources_type ON sources(type);
```

**File**: `news-service/migrations/002_create_articles.sql`
```sql
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id INTEGER NOT NULL,
    external_id TEXT,
    title TEXT NOT NULL,
    content TEXT,
    url TEXT UNIQUE NOT NULL,
    author TEXT,
    published_at TIMESTAMP,
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category TEXT,
    tags TEXT,  -- JSON array
    sentiment_score REAL,
    sentiment_label TEXT CHECK(sentiment_label IN ('positive', 'negative', 'neutral')),
    keywords TEXT,  -- JSON array
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE CASCADE
);

CREATE INDEX idx_articles_source_id ON articles(source_id);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_external_id ON articles(external_id);
CREATE INDEX idx_articles_url ON articles(url);
CREATE INDEX idx_articles_sentiment ON articles(sentiment_label);
```

**File**: `news-service/migrations/003_create_sentiment_analysis.sql`
```sql
CREATE TABLE IF NOT EXISTS sentiment_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER NOT NULL,
    model TEXT NOT NULL,
    score REAL NOT NULL,
    label TEXT NOT NULL CHECK(label IN ('positive', 'negative', 'neutral')),
    confidence REAL,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

CREATE INDEX idx_sentiment_article_id ON sentiment_analysis(article_id);
CREATE INDEX idx_sentiment_label ON sentiment_analysis(label);
```

## Phase 2: Rust News Service (Axum)

### 2.1 Create News Service Crate

**File**: `news-service/Cargo.toml`
```toml
[package]
name = "news-service"
version = "0.1.0"
edition = "2021"

[dependencies]
# Web framework
axum = "0.8.6"
tokio = { workspace = true, features = ["full"] }
tower = "0.5.2"
tower-http = { version = "0.6.6", features = ["cors", "trace"] }

# Database
sqlx = { version = "0.8.6", features = ["runtime-tokio", "sqlite", "postgres", "chrono", "migrate"] }

# Serialization
serde = { workspace = true }
serde_json = "1.0"
chrono = { workspace = true }

# Logging
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter"] }

# Error handling
anyhow = "1.0"
thiserror = "2.0.17"

# Environment
dotenvy = "0.15"

# HTTP client (for health checks, etc.)
reqwest = { workspace = true }

[[bin]]
name = "news-service"
path = "src/main.rs"
```

### 2.2 Database Models

**File**: `news-service/src/database/models.rs`
```rust
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, FromRow, Serialize)]
pub struct Source {
    pub id: i64,
    pub name: String,
    pub url: String,
    pub r#type: String,  // "rss", "api", "scraper"
    pub endpoint: Option<String>,
    pub api_key: Option<String>,
    pub enabled: bool,
    pub last_scraped_at: Option<DateTime<Utc>>,
    pub scrape_interval_minutes: i32,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, FromRow, Serialize)]
pub struct Article {
    pub id: i64,
    pub source_id: i64,
    pub external_id: Option<String>,
    pub title: String,
    pub content: Option<String>,
    pub url: String,
    pub author: Option<String>,
    pub published_at: Option<DateTime<Utc>>,
    pub scraped_at: DateTime<Utc>,
    pub category: Option<String>,
    pub tags: Option<String>,  // JSON array
    pub sentiment_score: Option<f64>,
    pub sentiment_label: Option<String>,
    pub keywords: Option<String>,  // JSON array
    pub image_url: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl Article {
    pub fn parse_tags(&self) -> Vec<String> {
        self.tags.as_ref()
            .and_then(|t| serde_json::from_str::<Vec<String>>(t).ok())
            .unwrap_or_default()
    }

    pub fn parse_keywords(&self) -> Vec<String> {
        self.keywords.as_ref()
            .and_then(|k| serde_json::from_str::<Vec<String>>(k).ok())
            .unwrap_or_default()
    }
}

#[derive(Debug, Clone, FromRow, Serialize)]
pub struct SentimentAnalysis {
    pub id: i64,
    pub article_id: i64,
    pub model: String,
    pub score: f64,
    pub label: String,
    pub confidence: Option<f64>,
    pub analyzed_at: DateTime<Utc>,
    pub created_at: DateTime<Utc>,
}
```

### 2.3 Database Repository

**File**: `news-service/src/database/repository.rs`
```rust
use crate::database::models::{Article, Source, SentimentAnalysis};
use sqlx::SqlitePool;
use anyhow::Result;
use chrono::Utc;

pub struct NewsRepository {
    pool: SqlitePool,
}

impl NewsRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    pub async fn find_latest_articles(&self, limit: i64, offset: i64) -> Result<Vec<Article>> {
        let articles = sqlx::query_as::<_, Article>(
            "SELECT * FROM articles ORDER BY published_at DESC LIMIT ? OFFSET ?"
        )
        .bind(limit)
        .bind(offset)
        .fetch_all(&self.pool)
        .await?;
        Ok(articles)
    }

    pub async fn find_articles_by_category(
        &self,
        category: &str,
        limit: i64,
        offset: i64,
    ) -> Result<Vec<Article>> {
        let articles = sqlx::query_as::<_, Article>(
            "SELECT * FROM articles WHERE category = ? ORDER BY published_at DESC LIMIT ? OFFSET ?"
        )
        .bind(category)
        .bind(limit)
        .bind(offset)
        .fetch_all(&self.pool)
        .await?;
        Ok(articles)
    }

    pub async fn search_articles(
        &self,
        query: &str,
        limit: i64,
        offset: i64,
    ) -> Result<Vec<Article>> {
        let search_pattern = format!("%{}%", query);
        let articles = sqlx::query_as::<_, Article>(
            "SELECT * FROM articles 
             WHERE title LIKE ? OR content LIKE ? 
             ORDER BY published_at DESC 
             LIMIT ? OFFSET ?"
        )
        .bind(&search_pattern)
        .bind(&search_pattern)
        .bind(limit)
        .bind(offset)
        .fetch_all(&self.pool)
        .await?;
        Ok(articles)
    }

    pub async fn find_article_by_id(&self, id: i64) -> Result<Option<Article>> {
        let article = sqlx::query_as::<_, Article>(
            "SELECT * FROM articles WHERE id = ?"
        )
        .bind(id)
        .fetch_optional(&self.pool)
        .await?;
        Ok(article)
    }

    pub async fn find_sources(&self) -> Result<Vec<Source>> {
        let sources = sqlx::query_as::<_, Source>(
            "SELECT * FROM sources ORDER BY name"
        )
        .fetch_all(&self.pool)
        .await?;
        Ok(sources)
    }

    pub async fn find_source_by_id(&self, id: i64) -> Result<Option<Source>> {
        let source = sqlx::query_as::<_, Source>(
            "SELECT * FROM sources WHERE id = ?"
        )
        .bind(id)
        .fetch_optional(&self.pool)
        .await?;
        Ok(source)
    }

    pub async fn count_articles(&self) -> Result<i64> {
        let count: (i64,) = sqlx::query_as(
            "SELECT COUNT(*) FROM articles"
        )
        .fetch_one(&self.pool)
        .await?;
        Ok(count.0)
    }

    pub async fn count_articles_by_category(&self, category: &str) -> Result<i64> {
        let count: (i64,) = sqlx::query_as(
            "SELECT COUNT(*) FROM articles WHERE category = ?"
        )
        .bind(category)
        .fetch_one(&self.pool)
        .await?;
        Ok(count.0)
    }

    pub async fn count_search_results(&self, query: &str) -> Result<i64> {
        let search_pattern = format!("%{}%", query);
        let count: (i64,) = sqlx::query_as(
            "SELECT COUNT(*) FROM articles WHERE title LIKE ? OR content LIKE ?"
        )
        .bind(&search_pattern)
        .bind(&search_pattern)
        .fetch_one(&self.pool)
        .await?;
        Ok(count.0)
    }

    pub async fn get_sentiment(&self, article_id: i64) -> Result<Option<SentimentAnalysis>> {
        let sentiment = sqlx::query_as::<_, SentimentAnalysis>(
            "SELECT * FROM sentiment_analysis WHERE article_id = ? ORDER BY analyzed_at DESC LIMIT 1"
        )
        .bind(article_id)
        .fetch_optional(&self.pool)
        .await?;
        Ok(sentiment)
    }
}
```

### 2.4 API Handlers

**File**: `news-service/src/handlers/news.rs`
```rust
use crate::database::repository::NewsRepository;
use crate::types::{NewsResponse, PaginationQuery, SearchQuery, CategoryQuery, ErrorResponse};
use axum::{extract::{Query, Path, State}, http::StatusCode, Json};
use std::sync::Arc;

pub async fn get_latest_news(
    State(repo): State<Arc<NewsRepository>>,
    Query(params): Query<PaginationQuery>,
) -> Result<(StatusCode, Json<NewsResponse>), (StatusCode, Json<ErrorResponse>)> {
    let limit = params.limit.unwrap_or(20);
    let offset = params.offset.unwrap_or(0);

    match repo.find_latest_articles(limit, offset).await {
        Ok(articles) => {
            let total = repo.count_articles().await.unwrap_or(0);
            let response = NewsResponse {
                articles,
                total,
                limit,
                offset,
            };
            Ok((StatusCode::OK, Json(response)))
        }
        Err(e) => {
            let error = ErrorResponse {
                error: format!("Failed to fetch articles: {}", e),
            };
            Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error)))
        }
    }
}

pub async fn get_news_by_category(
    State(repo): State<Arc<NewsRepository>>,
    Path(category): Path<String>,
    Query(params): Query<PaginationQuery>,
) -> Result<(StatusCode, Json<NewsResponse>), (StatusCode, Json<ErrorResponse>)> {
    let limit = params.limit.unwrap_or(20);
    let offset = params.offset.unwrap_or(0);

    match repo.find_articles_by_category(&category, limit, offset).await {
        Ok(articles) => {
            let total = repo.count_articles_by_category(&category).await.unwrap_or(0);
            let response = NewsResponse {
                articles,
                total,
                limit,
                offset,
            };
            Ok((StatusCode::OK, Json(response)))
        }
        Err(e) => {
            let error = ErrorResponse {
                error: format!("Failed to fetch articles: {}", e),
            };
            Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error)))
        }
    }
}

pub async fn search_news(
    State(repo): State<Arc<NewsRepository>>,
    Query(params): Query<SearchQuery>,
) -> Result<(StatusCode, Json<NewsResponse>), (StatusCode, Json<ErrorResponse>)> {
    let query = params.q.unwrap_or_default();
    if query.is_empty() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: "Search query is required".to_string(),
            }),
        ));
    }

    let limit = params.limit.unwrap_or(20);
    let offset = params.offset.unwrap_or(0);

    match repo.search_articles(&query, limit, offset).await {
        Ok(articles) => {
            let total = repo.count_search_results(&query).await.unwrap_or(0);
            let response = NewsResponse {
                articles,
                total,
                limit,
                offset,
            };
            Ok((StatusCode::OK, Json(response)))
        }
        Err(e) => {
            let error = ErrorResponse {
                error: format!("Failed to search articles: {}", e),
            };
            Err((StatusCode::INTERNAL_SERVER_ERROR, Json(error)))
        }
    }
}

pub async fn get_article_by_id(
    State(repo): State<Arc<NewsRepository>>,
    Path(id): Path<i64>,
) -> Result<(StatusCode, Json<crate::database::models::Article>), (StatusCode, Json<ErrorResponse>)> {
    match repo.find_article_by_id(id).await {
        Ok(Some(article)) => Ok((StatusCode::OK, Json(article))),
        Ok(None) => Err((
            StatusCode::NOT_FOUND,
            Json(ErrorResponse {
                error: "Article not found".to_string(),
            }),
        )),
        Err(e) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ErrorResponse {
                error: format!("Failed to fetch article: {}", e),
            }),
        )),
    }
}

pub async fn get_sources(
    State(repo): State<Arc<NewsRepository>>,
) -> Result<(StatusCode, Json<Vec<crate::database::models::Source>>), (StatusCode, Json<ErrorResponse>)> {
    match repo.find_sources().await {
        Ok(sources) => Ok((StatusCode::OK, Json(sources))),
        Err(e) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ErrorResponse {
                error: format!("Failed to fetch sources: {}", e),
            }),
        )),
    }
}

pub async fn get_sentiment(
    State(repo): State<Arc<NewsRepository>>,
    Path(article_id): Path<i64>,
) -> Result<(StatusCode, Json<crate::database::models::SentimentAnalysis>), (StatusCode, Json<ErrorResponse>)> {
    match repo.get_sentiment(article_id).await {
        Ok(Some(sentiment)) => Ok((StatusCode::OK, Json(sentiment))),
        Ok(None) => Err((
            StatusCode::NOT_FOUND,
            Json(ErrorResponse {
                error: "Sentiment analysis not found".to_string(),
            }),
        )),
        Err(e) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ErrorResponse {
                error: format!("Failed to fetch sentiment: {}", e),
            }),
        )),
    }
}
```

### 2.5 API Types

**File**: `news-service/src/types.rs`
```rust
use serde::{Deserialize, Serialize};
use crate::database::models::Article;

#[derive(Debug, Serialize)]
pub struct NewsResponse {
    pub articles: Vec<Article>,
    pub total: i64,
    pub limit: i64,
    pub offset: i64,
}

#[derive(Debug, Serialize)]
pub struct ErrorResponse {
    pub error: String,
}

#[derive(Debug, Deserialize)]
pub struct PaginationQuery {
    pub limit: Option<i64>,
    pub offset: Option<i64>,
}

#[derive(Debug, Deserialize)]
pub struct SearchQuery {
    pub q: Option<String>,
    pub limit: Option<i64>,
    pub offset: Option<i64>,
}

#[derive(Debug, Deserialize)]
pub struct CategoryQuery {
    pub category: Option<String>,
    pub limit: Option<i64>,
    pub offset: Option<i64>,
}
```

### 2.6 Main Server

**File**: `news-service/src/main.rs`
```rust
use axum::{http::{HeaderValue, Method}, Router};
use news_service::database::{create_pool, repository::NewsRepository};
use news_service::handlers;
use std::sync::Arc;
use tower_http::cors::CorsLayer;
use tracing::{info, error};

mod database;
mod handlers;
mod types;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize logging
    tracing_subscriber::fmt::init();

    // Load environment variables
    dotenvy::dotenv().ok();

    // Create database pool
    let pool = database::create_pool().await?;
    info!("Database connection established");

    // Run migrations
    sqlx::migrate!("./migrations")
        .run(&pool)
        .await?;
    info!("Database migrations completed");

    // Create repository
    let repository = Arc::new(NewsRepository::new(pool));

    // Configure CORS
    const ALLOWED_ORIGINS: &[&str] = &[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3002",
        "http://127.0.0.1:3002",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ];

    let origins: Vec<HeaderValue> = ALLOWED_ORIGINS
        .iter()
        .filter_map(|origin| origin.parse().ok())
        .collect();

    let cors = CorsLayer::new()
        .allow_origin(origins)
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([axum::http::header::CONTENT_TYPE]);

    // Create router
    let app = Router::new()
        .route("/api/news/latest", axum::routing::get(handlers::get_latest_news))
        .route("/api/news/category/:category", axum::routing::get(handlers::get_news_by_category))
        .route("/api/news/search", axum::routing::get(handlers::search_news))
        .route("/api/news/article/:id", axum::routing::get(handlers::get_article_by_id))
        .route("/api/news/sources", axum::routing::get(handlers::get_sources))
        .route("/api/news/sentiment/:article_id", axum::routing::get(handlers::get_sentiment))
        .route("/health", axum::routing::get(|| async { "OK" }))
        .layer(cors)
        .with_state(repository);

    // Start server
    let port = std::env::var("PORT")
        .unwrap_or_else(|_| "3003".to_string())
        .parse::<u16>()?;
    let addr = format!("0.0.0.0:{}", port);

    info!("News service starting on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(&addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}
```

### 2.7 Database Module

**File**: `news-service/src/database/mod.rs`
```rust
pub mod models;
pub mod repository;

use sqlx::{SqlitePool, sqlite::SqliteConnectOptions};
use std::env;

pub type DbPool = SqlitePool;

pub async fn create_pool() -> anyhow::Result<DbPool> {
    let database_url = env::var("DATABASE_URL")
        .unwrap_or_else(|_| "sqlite:news.db".to_string());

    let options = database_url
        .parse::<SqliteConnectOptions>()?
        .create_if_missing(true);

    let pool = SqlitePool::connect_with(options).await?;

    Ok(pool)
}
```

## Phase 3: Python News Scraper

### 3.1 Python Project Structure

**File**: `news-scraper/requirements.txt`
```
polars>=1.0.0
requests>=2.31.0
beautifulsoup4>=4.12.0
feedparser>=6.0.10
sqlalchemy>=2.0.0
python-dotenv>=1.0.0
aiohttp>=3.9.0
lxml>=5.0.0
textblob>=0.17.1
schedule>=1.2.0
psycopg2-binary>=2.9.0
```

### 3.2 Scraper Configuration

**File**: `news-scraper/config.py`
```python
import os
from dotenv import load_dotenv
from typing import List, Dict, Any

load_dotenv()

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///news.db")

# API keys
NEWSAPI_KEY = os.getenv("NEWSAPI_KEY", "")
CRYPTOCOMPARE_API_KEY = os.getenv("CRYPTOCOMPARE_API_KEY", "")

# Scrape configuration
SCRAPE_INTERVAL_MINUTES = int(os.getenv("SCRAPE_INTERVAL_MINUTES", "15"))
MAX_ARTICLES_PER_SOURCE = int(os.getenv("MAX_ARTICLES_PER_SOURCE", "50"))

# News sources configuration
SOURCES = [
    {
        "name": "CoinDesk",
        "type": "rss",
        "url": "https://www.coindesk.com",
        "endpoint": "https://www.coindesk.com/feed/",
        "category": "crypto",
        "enabled": True,
        "scrape_interval_minutes": 15,
    },
    {
        "name": "CoinTelegraph",
        "type": "rss",
        "url": "https://cointelegraph.com",
        "endpoint": "https://cointelegraph.com/rss",
        "category": "crypto",
        "enabled": True,
        "scrape_interval_minutes": 15,
    },
    {
        "name": "Bitcoin Magazine",
        "type": "rss",
        "url": "https://bitcoinmagazine.com",
        "endpoint": "https://bitcoinmagazine.com/.rss/full/",
        "category": "bitcoin",
        "enabled": True,
        "scrape_interval_minutes": 15,
    },
    {
        "name": "NewsAPI Crypto",
        "type": "api",
        "url": "https://newsapi.org",
        "endpoint": "https://newsapi.org/v2/everything",
        "api_key_env": "NEWSAPI_KEY",
        "category": "crypto",
        "enabled": bool(NEWSAPI_KEY),
        "scrape_interval_minutes": 30,
    },
    {
        "name": "CryptoCompare News",
        "type": "api",
        "url": "https://www.cryptocompare.com",
        "endpoint": "https://min-api.cryptocompare.com/data/v2/news/",
        "api_key_env": "CRYPTOCOMPARE_API_KEY",
        "category": "crypto",
        "enabled": True,
        "scrape_interval_minutes": 30,
    },
]
```

### 3.3 RSS Feed Scraper

**File**: `news-scraper/scrapers/rss_scraper.py`
```python
import feedparser
import requests
from typing import List, Dict, Any
from datetime import datetime
import hashlib

class RSSScraper:
    def __init__(self, source_config: Dict[str, Any]):
        self.name = source_config["name"]
        self.endpoint = source_config["endpoint"]
        self.category = source_config.get("category", "crypto")
        self.url = source_config.get("url", "")

    def scrape_feed(self) -> List[Dict[str, Any]]:
        """Scrape RSS feed and return list of articles."""
        try:
            feed = feedparser.parse(self.endpoint)
            articles = []

            for entry in feed.entries[:50]:  # Limit to 50 articles
                article = {
                    "external_id": self._generate_id(entry.get("link", "")),
                    "title": entry.get("title", ""),
                    "content": self._extract_content(entry),
                    "url": entry.get("link", ""),
                    "author": self._extract_author(entry),
                    "published_at": self._parse_date(entry.get("published", "")),
                    "category": self.category,
                    "image_url": self._extract_image(entry),
                    "source_name": self.name,
                }
                articles.append(article)

            return articles
        except Exception as e:
            print(f"Error scraping {self.name}: {e}")
            return []

    def _generate_id(self, url: str) -> str:
        """Generate unique ID from URL."""
        return hashlib.md5(url.encode()).hexdigest()

    def _extract_content(self, entry) -> str:
        """Extract article content from feed entry."""
        if "content" in entry:
            return entry.content[0].value
        elif "summary" in entry:
            return entry.summary
        return ""

    def _extract_author(self, entry) -> str:
        """Extract author from feed entry."""
        if "author" in entry:
            return entry.author
        elif "author_detail" in entry:
            return entry.author_detail.get("name", "")
        return ""

    def _parse_date(self, date_str: str) -> datetime:
        """Parse date string to datetime."""
        try:
            if "published_parsed" in date_str:
                return datetime(*date_str.published_parsed[:6])
            elif "updated_parsed" in date_str:
                return datetime(*date_str.updated_parsed[:6])
        except:
            pass
        return datetime.now()

    def _extract_image(self, entry) -> str:
        """Extract image URL from feed entry."""
        if "media_content" in entry:
            for media in entry.media_content:
                if media.get("type", "").startswith("image"):
                    return media.get("url", "")
        elif "links" in entry:
            for link in entry.links:
                if link.get("type", "").startswith("image"):
                    return link.get("href", "")
        return ""
```

### 3.4 API Client Scraper

**File**: `news-scraper/scrapers/api_scraper.py`
```python
import requests
import os
from typing import List, Dict, Any
from datetime import datetime
import hashlib

class APIScraper:
    def __init__(self, source_config: Dict[str, Any]):
        self.name = source_config["name"]
        self.endpoint = source_config["endpoint"]
        self.category = source_config.get("category", "crypto")
        self.api_key = os.getenv(source_config.get("api_key_env", ""))

    def scrape_newsapi(self, query: str = "cryptocurrency OR bitcoin") -> List[Dict[str, Any]]:
        """Scrape news from NewsAPI."""
        if not self.api_key:
            return []

        try:
            url = self.endpoint
            params = {
                "q": query,
                "apiKey": self.api_key,
                "sortBy": "publishedAt",
                "language": "en",
                "pageSize": 50,
            }
            response = requests.get(url, params=params, timeout=30)
            response.raise_for_status()
            data = response.json()

            articles = []
            for item in data.get("articles", []):
                article = {
                    "external_id": self._generate_id(item.get("url", "")),
                    "title": item.get("title", ""),
                    "content": item.get("description", ""),
                    "url": item.get("url", ""),
                    "author": item.get("author", ""),
                    "published_at": self._parse_date(item.get("publishedAt", "")),
                    "category": self.category,
                    "image_url": item.get("urlToImage", ""),
                    "source_name": item.get("source", {}).get("name", self.name),
                }
                articles.append(article)

            return articles
        except Exception as e:
            print(f"Error scraping NewsAPI: {e}")
            return []

    def scrape_cryptocompare(self) -> List[Dict[str, Any]]:
        """Scrape news from CryptoCompare API."""
        try:
            url = self.endpoint
            params = {"lang": "EN"}
            if self.api_key:
                params["api_key"] = self.api_key

            response = requests.get(url, params=params, timeout=30)
            response.raise_for_status()
            data = response.json()

            articles = []
            for item in data.get("Data", []):
                article = {
                    "external_id": str(item.get("id", "")),
                    "title": item.get("title", ""),
                    "content": item.get("body", ""),
                    "url": item.get("url", ""),
                    "author": item.get("source", ""),
                    "published_at": self._parse_timestamp(item.get("published_on", 0)),
                    "category": self.category,
                    "image_url": item.get("imageurl", ""),
                    "source_name": self.name,
                }
                articles.append(article)

            return articles
        except Exception as e:
            print(f"Error scraping CryptoCompare: {e}")
            return []

    def _generate_id(self, url: str) -> str:
        """Generate unique ID from URL."""
        return hashlib.md5(url.encode()).hexdigest()

    def _parse_date(self, date_str: str) -> datetime:
        """Parse ISO date string to datetime."""
        try:
            return datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        except:
            return datetime.now()

    def _parse_timestamp(self, timestamp: int) -> datetime:
        """Parse Unix timestamp to datetime."""
        try:
            return datetime.fromtimestamp(timestamp)
        except:
            return datetime.now()
```

### 3.5 Data Processing with Polars

**File**: `news-scraper/processors/data_processor.py`
```python
import polars as pl
from typing import List, Dict, Any
import re
from datetime import datetime

class DataProcessor:
    def __init__(self):
        self.crypto_keywords = [
            "bitcoin", "btc", "ethereum", "eth", "crypto", "cryptocurrency",
            "blockchain", "defi", "nft", "solana", "sol", "cardano", "ada",
            "binance", "coinbase", "trading", "investment", "market"
        ]
        self.bitcoin_keywords = ["bitcoin", "btc", "satoshi", "halving"]
        self.financial_keywords = ["stock", "market", "trading", "investment", "finance"]

    def process_articles(self, articles: List[Dict[str, Any]]) -> pl.DataFrame:
        """Process articles with Polars DataFrame."""
        if not articles:
            return pl.DataFrame()

        # Convert to DataFrame
        df = pl.DataFrame(articles)

        # Clean data
        df = self.clean_articles(df)
        
        # Categorize articles
        df = self.categorize_articles(df)
        
        # Extract keywords
        df = self.extract_keywords(df)
        
        # Deduplicate
        df = self.deduplicate_articles(df)

        return df

    def clean_articles(self, df: pl.DataFrame) -> pl.DataFrame:
        """Clean article data."""
        return df.with_columns([
            # Clean HTML tags from content
            pl.col("content").map_elements(
                lambda x: self._strip_html(x) if x else "",
                return_dtype=pl.Utf8
            ).alias("content"),
            # Ensure title is not empty
            pl.col("title").fill_null("").alias("title"),
            # Ensure URL is not empty
            pl.col("url").fill_null("").alias("url"),
        ])

    def categorize_articles(self, df: pl.DataFrame) -> pl.DataFrame:
        """Categorize articles based on keywords."""
        def get_category(title: str, content: str) -> str:
            text = (title + " " + (content or "")).lower()
            
            if any(keyword in text for keyword in self.bitcoin_keywords):
                return "bitcoin"
            elif any(keyword in text for keyword in self.crypto_keywords):
                return "crypto"
            elif any(keyword in text for keyword in self.financial_keywords):
                return "financial"
            return "general"

        return df.with_columns([
            pl.struct(["title", "content"]).map_elements(
                lambda x: get_category(x["title"], x.get("content", "")),
                return_dtype=pl.Utf8
            ).alias("category")
        ])

    def extract_keywords(self, df: pl.DataFrame) -> pl.DataFrame:
        """Extract keywords from title and content."""
        def extract_keywords(text: str) -> List[str]:
            if not text:
                return []
            text_lower = text.lower()
            keywords = []
            for keyword in self.crypto_keywords + self.bitcoin_keywords + self.financial_keywords:
                if keyword in text_lower:
                    keywords.append(keyword)
            return list(set(keywords))

        return df.with_columns([
            pl.col("title").map_elements(
                lambda x: extract_keywords(x or ""),
                return_dtype=pl.List(pl.Utf8)
            ).alias("keywords")
        ])

    def deduplicate_articles(self, df: pl.DataFrame) -> pl.DataFrame:
        """Remove duplicate articles based on URL."""
        return df.unique(subset=["url"], keep="first")

    def _strip_html(self, text: str) -> str:
        """Strip HTML tags from text."""
        if not text:
            return ""
        # Simple HTML tag removal
        text = re.sub(r'<[^>]+>', '', text)
        # Clean up whitespace
        text = re.sub(r'\s+', ' ', text)
        return text.strip()
```

### 3.6 Sentiment Analysis

**File**: `news-scraper/processors/sentiment_analyzer.py`
```python
from textblob import TextBlob
import polars as pl
from typing import Dict, Any

class SentimentAnalyzer:
    def __init__(self):
        self.model = "textblob"

    def analyze_sentiment(self, text: str) -> Dict[str, Any]:
        """Analyze sentiment of text."""
        if not text:
            return {
                "score": 0.0,
                "label": "neutral",
                "confidence": 0.0,
            }

        blob = TextBlob(text)
        polarity = blob.sentiment.polarity

        # Categorize sentiment
        if polarity > 0.1:
            label = "positive"
        elif polarity < -0.1:
            label = "negative"
        else:
            label = "neutral"

        # Confidence based on polarity magnitude
        confidence = abs(polarity)

        return {
            "score": float(polarity),
            "label": label,
            "confidence": float(confidence),
        }

    def analyze_batch(self, df: pl.DataFrame) -> pl.DataFrame:
        """Analyze sentiment for batch of articles."""
        def analyze_row(title: str, content: str) -> Dict[str, Any]:
            text = f"{title} {content or ''}"
            return self.analyze_sentiment(text)

        return df.with_columns([
            pl.struct(["title", "content"]).map_elements(
                lambda x: analyze_row(x["title"], x.get("content", "")),
                return_dtype=pl.Struct([
                    pl.Field("score", pl.Float64),
                    pl.Field("label", pl.Utf8),
                    pl.Field("confidence", pl.Float64),
                ])
            ).alias("sentiment")
        ]).with_columns([
            pl.col("sentiment").struct.field("score").alias("sentiment_score"),
            pl.col("sentiment").struct.field("label").alias("sentiment_label"),
            pl.col("sentiment").struct.field("confidence").alias("sentiment_confidence"),
        ]).drop("sentiment")
```

### 3.7 Database Writer

**File**: `news-scraper/writers/db_writer.py`
```python
import sqlite3
import json
from typing import List, Dict, Any
import polars as pl
from datetime import datetime
import os

class DatabaseWriter:
    def __init__(self, database_url: str):
        self.database_url = database_url
        if database_url.startswith("sqlite"):
            # Extract SQLite path
            db_path = database_url.replace("sqlite:///", "").replace("sqlite:", "")
            self.conn = sqlite3.connect(db_path, check_same_thread=False)
            self.conn.row_factory = sqlite3.Row
        else:
            raise ValueError(f"Unsupported database URL: {database_url}")

    def write_articles(self, articles_df: pl.DataFrame, source_id: int) -> int:
        """Write articles to database."""
        if articles_df.is_empty():
            return 0

        cursor = self.conn.cursor()
        inserted_count = 0

        for row in articles_df.iter_rows(named=True):
            try:
                # Check if article already exists
                cursor.execute(
                    "SELECT id FROM articles WHERE url = ? OR external_id = ?",
                    (row.get("url", ""), row.get("external_id", ""))
                )
                if cursor.fetchone():
                    continue  # Skip duplicate

                # Insert article
                cursor.execute("""
                    INSERT INTO articles (
                        source_id, external_id, title, content, url, author,
                        published_at, scraped_at, category, tags, sentiment_score,
                        sentiment_label, keywords, image_url
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    source_id,
                    row.get("external_id"),
                    row.get("title", ""),
                    row.get("content"),
                    row.get("url", ""),
                    row.get("author"),
                    row.get("published_at"),
                    datetime.now(),
                    row.get("category"),
                    json.dumps(row.get("tags", [])),
                    row.get("sentiment_score"),
                    row.get("sentiment_label"),
                    json.dumps(row.get("keywords", [])),
                    row.get("image_url"),
                ))
                inserted_count += 1
            except Exception as e:
                print(f"Error inserting article: {e}")
                continue

        self.conn.commit()

        # Update source last_scraped_at
        cursor.execute(
            "UPDATE sources SET last_scraped_at = ? WHERE id = ?",
            (datetime.now(), source_id)
        )
        self.conn.commit()

        return inserted_count

    def get_or_create_source(self, source_config: Dict[str, Any]) -> int:
        """Get or create source in database."""
        cursor = self.conn.cursor()
        
        # Check if source exists
        cursor.execute("SELECT id FROM sources WHERE name = ?", (source_config["name"],))
        result = cursor.fetchone()
        
        if result:
            return result[0]
        
        # Create new source
        cursor.execute("""
            INSERT INTO sources (
                name, url, type, endpoint, api_key, enabled, scrape_interval_minutes
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            source_config["name"],
            source_config.get("url", ""),
            source_config["type"],
            source_config.get("endpoint", ""),
            source_config.get("api_key", ""),
            source_config.get("enabled", True),
            source_config.get("scrape_interval_minutes", 15),
        ))
        self.conn.commit()
        
        return cursor.lastrowid
```

### 3.8 Main Scraper Service

**File**: `news-scraper/main.py`
```python
import schedule
import time
from config import SOURCES, DATABASE_URL, SCRAPE_INTERVAL_MINUTES
from scrapers.rss_scraper import RSSScraper
from scrapers.api_scraper import APIScraper
from processors.data_processor import DataProcessor
from processors.sentiment_analyzer import SentimentAnalyzer
from writers.db_writer import DatabaseWriter
import polars as pl

class NewsScraperService:
    def __init__(self):
        self.data_processor = DataProcessor()
        self.sentiment_analyzer = SentimentAnalyzer()
        self.db_writer = DatabaseWriter(DATABASE_URL)

    def scrape_source(self, source_config: dict):
        """Scrape a single source."""
        print(f"Scraping {source_config['name']}...")
        
        try:
            # Get or create source in database
            source_id = self.db_writer.get_or_create_source(source_config)
            
            # Scrape articles based on source type
            if source_config["type"] == "rss":
                scraper = RSSScraper(source_config)
                articles = scraper.scrape_feed()
            elif source_config["type"] == "api":
                scraper = APIScraper(source_config)
                if "newsapi" in source_config["name"].lower():
                    articles = scraper.scrape_newsapi()
                elif "cryptocompare" in source_config["name"].lower():
                    articles = scraper.scrape_cryptocompare()
                else:
                    articles = []
            else:
                print(f"Unknown source type: {source_config['type']}")
                return

            if not articles:
                print(f"No articles found for {source_config['name']}")
                return

            # Process articles with Polars
            articles_df = self.data_processor.process_articles(articles)
            
            # Analyze sentiment
            articles_df = self.sentiment_analyzer.analyze_batch(articles_df)
            
            # Write to database
            inserted_count = self.db_writer.write_articles(articles_df, source_id)
            print(f"Inserted {inserted_count} articles from {source_config['name']}")
            
        except Exception as e:
            print(f"Error scraping {source_config['name']}: {e}")

    def scrape_all_sources(self):
        """Scrape all enabled sources."""
        print("Starting scrape cycle...")
        for source_config in SOURCES:
            if source_config.get("enabled", True):
                self.scrape_source(source_config)
            else:
                print(f"Skipping {source_config['name']} (disabled)")
        print("Scrape cycle completed")

    def run(self):
        """Run scraper with scheduling."""
        # Run immediately
        self.scrape_all_sources()
        
        # Schedule periodic scraping
        schedule.every(SCRAPE_INTERVAL_MINUTES).minutes.do(self.scrape_all_sources)
        
        print(f"Scraper scheduled to run every {SCRAPE_INTERVAL_MINUTES} minutes")
        
        # Run scheduler
        while True:
            schedule.run_pending()
            time.sleep(60)  # Check every minute

if __name__ == "__main__":
    service = NewsScraperService()
    service.run()
```

## Phase 4: Terminal App Integration

### 4.1 Add News API Client

**File**: `terminal/src/services/news_api.rs`
```rust
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

const NEWS_API_BASE_URL: &str = "http://127.0.0.1:3003";

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Article {
    pub id: i64,
    pub source_id: i64,
    pub external_id: Option<String>,
    pub title: String,
    pub content: Option<String>,
    pub url: String,
    pub author: Option<String>,
    pub published_at: Option<String>,
    pub scraped_at: String,
    pub category: Option<String>,
    pub tags: Option<String>,
    pub sentiment_score: Option<f64>,
    pub sentiment_label: Option<String>,
    pub keywords: Option<String>,
    pub image_url: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Source {
    pub id: i64,
    pub name: String,
    pub url: String,
    pub r#type: String,
    pub endpoint: Option<String>,
    pub enabled: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewsResponse {
    pub articles: Vec<Article>,
    pub total: i64,
    pub limit: i64,
    pub offset: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ErrorResponse {
    pub error: String,
}

pub struct NewsApiClient {
    client: reqwest::Client,
}

impl NewsApiClient {
    pub fn new() -> Self {
        let client = reqwest::Client::builder()
            .timeout(std::time::Duration::from_secs(10))
            .build()
            .unwrap_or_else(|_| reqwest::Client::new());

        Self { client }
    }

    pub async fn get_latest_news(
        &self,
        limit: Option<u64>,
        offset: Option<u64>,
    ) -> Result<NewsResponse, String> {
        let mut url = format!("{}/api/news/latest", NEWS_API_BASE_URL);
        let mut query_params = vec![];

        if let Some(limit) = limit {
            query_params.push(("limit", limit.to_string()));
        }
        if let Some(offset) = offset {
            query_params.push(("offset", offset.to_string()));
        }

        if !query_params.is_empty() {
            url.push('?');
            url.push_str(&query_params.iter().map(|(k, v)| format!("{}={}", k, v)).collect::<Vec<_>>().join("&"));
        }

        let response = self.client.get(&url).send().await.map_err(|e| format!("Network error: {}", e))?;

        if response.status().is_success() {
            response.json::<NewsResponse>().await.map_err(|e| format!("Parse error: {}", e))
        } else {
            let error: ErrorResponse = response.json().await.unwrap_or_else(|_| ErrorResponse {
                error: "Unknown error".to_string(),
            });
            Err(error.error)
        }
    }

    pub async fn get_news_by_category(
        &self,
        category: &str,
        limit: Option<u64>,
        offset: Option<u64>,
    ) -> Result<NewsResponse, String> {
        let mut url = format!("{}/api/news/category/{}", NEWS_API_BASE_URL, category);
        let mut query_params = vec![];

        if let Some(limit) = limit {
            query_params.push(("limit", limit.to_string()));
        }
        if let Some(offset) = offset {
            query_params.push(("offset", offset.to_string()));
        }

        if !query_params.is_empty() {
            url.push('?');
            url.push_str(&query_params.iter().map(|(k, v)| format!("{}={}", k, v)).collect::<Vec<_>>().join("&"));
        }

        let response = self.client.get(&url).send().await.map_err(|e| format!("Network error: {}", e))?;

        if response.status().is_success() {
            response.json::<NewsResponse>().await.map_err(|e| format!("Parse error: {}", e))
        } else {
            let error: ErrorResponse = response.json().await.unwrap_or_else(|_| ErrorResponse {
                error: "Unknown error".to_string(),
            });
            Err(error.error)
        }
    }

    pub async fn search_news(
        &self,
        query: &str,
        limit: Option<u64>,
        offset: Option<u64>,
    ) -> Result<NewsResponse, String> {
        let mut url = format!("{}/api/news/search", NEWS_API_BASE_URL);
        let mut query_params = vec![("q", query.to_string())];

        if let Some(limit) = limit {
            query_params.push(("limit", limit.to_string()));
        }
        if let Some(offset) = offset {
            query_params.push(("offset", offset.to_string()));
        }

        url.push('?');
        url.push_str(&query_params.iter().map(|(k, v)| format!("{}={}", k, v)).collect::<Vec<_>>().join("&"));

        let response = self.client.get(&url).send().await.map_err(|e| format!("Network error: {}", e))?;

        if response.status().is_success() {
            response.json::<NewsResponse>().await.map_err(|e| format!("Parse error: {}", e))
        } else {
            let error: ErrorResponse = response.json().await.unwrap_or_else(|_| ErrorResponse {
                error: "Unknown error".to_string(),
            });
            Err(error.error)
        }
    }

    pub async fn get_article_by_id(&self, id: u64) -> Result<Article, String> {
        let url = format!("{}/api/news/article/{}", NEWS_API_BASE_URL, id);

        let response = self.client.get(&url).send().await.map_err(|e| format!("Network error: {}", e))?;

        if response.status().is_success() {
            response.json::<Article>().await.map_err(|e| format!("Parse error: {}", e))
        } else {
            let error: ErrorResponse = response.json().await.unwrap_or_else(|_| ErrorResponse {
                error: "Unknown error".to_string(),
            });
            Err(error.error)
        }
    }

    pub async fn get_sources(&self) -> Result<Vec<Source>, String> {
        let url = format!("{}/api/news/sources", NEWS_API_BASE_URL);

        let response = self.client.get(&url).send().await.map_err(|e| format!("Network error: {}", e))?;

        if response.status().is_success() {
            response.json::<Vec<Source>>().await.map_err(|e| format!("Parse error: {}", e))
        } else {
            let error: ErrorResponse = response.json().await.unwrap_or_else(|_| ErrorResponse {
                error: "Unknown error".to_string(),
            });
            Err(error.error)
        }
    }
}
```

### 4.2 Update Services Module

**File**: `terminal/src/services/mod.rs`
- Add `pub mod news_api;` and export `NewsApiClient`

### 4.3 Add News Screen to Terminal UI

**File**: `terminal/src/ui/screens/news.rs`
```rust
use crate::services::news_api::{NewsApiClient, Article};
use egui::{ScrollArea, RichText, Color32};

pub struct NewsScreen {
    api_client: NewsApiClient,
    articles: Vec<Article>,
    selected_article: Option<Article>,
    category: Option<String>,
    search_query: String,
    loading: bool,
    error: Option<String>,
}

impl NewsScreen {
    pub fn new() -> Self {
        Self {
            api_client: NewsApiClient::new(),
            articles: Vec::new(),
            selected_article: None,
            category: None,
            search_query: String::new(),
            loading: false,
            error: None,
        }
    }

    pub fn show(&mut self, ctx: &egui::Context, ui: &mut egui::Ui) {
        ui.heading("Crypto & Financial News");

        // Category filter
        ui.horizontal(|ui| {
            ui.label("Category:");
            if ui.button("All").clicked() {
                self.category = None;
                self.load_news();
            }
            if ui.button("Crypto").clicked() {
                self.category = Some("crypto".to_string());
                self.load_news_by_category("crypto");
            }
            if ui.button("Bitcoin").clicked() {
                self.category = Some("bitcoin".to_string());
                self.load_news_by_category("bitcoin");
            }
            if ui.button("Financial").clicked() {
                self.category = Some("financial".to_string());
                self.load_news_by_category("financial");
            }
        });

        // Search
        ui.horizontal(|ui| {
            ui.label("Search:");
            ui.text_edit_singleline(&mut self.search_query);
            if ui.button("Search").clicked() {
                self.search_news();
            }
        });

        // Error display
        if let Some(error) = &self.error {
            ui.colored_label(Color32::RED, error);
        }

        // Loading indicator
        if self.loading {
            ui.spinner();
        }

        // Articles list
        ScrollArea::vertical().show(ui, |ui| {
            for article in &self.articles {
                ui.group(|ui| {
                    ui.heading(&article.title);
                    if let Some(author) = &article.author {
                        ui.label(format!("By: {}", author));
                    }
                    if let Some(category) = &article.category {
                        ui.label(format!("Category: {}", category));
                    }
                    if let Some(sentiment) = &article.sentiment_label {
                        let color = match sentiment.as_str() {
                            "positive" => Color32::GREEN,
                            "negative" => Color32::RED,
                            _ => Color32::GRAY,
                        };
                        ui.colored_label(color, format!("Sentiment: {}", sentiment));
                    }
                    if ui.button("Read More").clicked() {
                        self.selected_article = Some(article.clone());
                    }
                });
                ui.add_space(10.0);
            }
        });

        // Article detail view
        if let Some(article) = &self.selected_article {
            egui::Window::new("Article")
                .collapsible(false)
                .show(ctx, |ui| {
                    ui.heading(&article.title);
                    if let Some(content) = &article.content {
                        ui.separator();
                        ScrollArea::vertical().show(ui, |ui| {
                            ui.label(content);
                        });
                    }
                    if ui.button("Close").clicked() {
                        self.selected_article = None;
                    }
                    if ui.button("Open in Browser").clicked() {
                        if let Err(e) = open::that(&article.url) {
                            self.error = Some(format!("Failed to open URL: {}", e));
                        }
                    }
                });
        }
    }

    fn load_news(&mut self) {
        // Implement async loading
        self.loading = true;
        // TODO: Use async runtime to load news
    }

    fn load_news_by_category(&mut self, category: &str) {
        // Implement async loading
        self.loading = true;
        // TODO: Use async runtime to load news by category
    }

    fn search_news(&mut self) {
        // Implement async search
        self.loading = true;
        // TODO: Use async runtime to search news
    }
}
```

## Phase 5: Workspace Configuration

### 5.1 Update Workspace

**File**: `Cargo.toml`
```toml
[workspace]
members = [
    "terminal",
    "backend",
    "shared",
    "wallet-web",
    "terminal-gui",
    "news-service",  # Add this
]
```

### 5.2 Environment Configuration

**File**: `news-service/.env.example`
```
DATABASE_URL=sqlite:news.db
PORT=3003
RUST_LOG=info
```

**File**: `news-scraper/.env.example`
```
DATABASE_URL=sqlite:///news.db
NEWSAPI_KEY=your_api_key_here
CRYPTOCOMPARE_API_KEY=your_api_key_here
SCRAPE_INTERVAL_MINUTES=15
MAX_ARTICLES_PER_SOURCE=50
```

## Phase 6: Implementation Checklist

- [ ] Phase 1: Database Schema
  - [ ] Create sources table migration
  - [ ] Create articles table migration
  - [ ] Create sentiment_analysis table migration
  - [ ] Test migrations

- [ ] Phase 2: Rust News Service
  - [ ] Create news-service crate
  - [ ] Implement database models
  - [ ] Implement repository
  - [ ] Implement API handlers
  - [ ] Implement main server
  - [ ] Test API endpoints

- [ ] Phase 3: Python Scraper
  - [ ] Set up Python project
  - [ ] Implement RSS scraper
  - [ ] Implement API scraper
  - [ ] Implement data processor (Polars)
  - [ ] Implement sentiment analyzer
  - [ ] Implement database writer
  - [ ] Implement main scraper service
  - [ ] Test scraping

- [ ] Phase 4: Terminal Integration
  - [ ] Add NewsApiClient
  - [ ] Add news screen UI
  - [ ] Integrate with app state
  - [ ] Test terminal integration

- [ ] Phase 5: Workspace Configuration
  - [ ] Update workspace Cargo.toml
  - [ ] Update start scripts
  - [ ] Create environment files

- [ ] Phase 6: Testing
  - [ ] Test news service APIs
  - [ ] Test Python scraper
  - [ ] Test terminal integration
  - [ ] End-to-end testing

## Success Criteria

1. News service compiles and runs on port 3003
2. Python scraper successfully scrapes from multiple sources
3. Articles are stored in database with proper schema
4. News service APIs return correct data
5. Terminal app can fetch and display news
6. Search and filtering work correctly
7. Sentiment analysis is performed on articles
8. Deduplication prevents duplicate articles
9. Scraper runs on schedule without errors
10. All services can run independently

## Risk Mitigation

- Start with SQLite for simplicity, can migrate to PostgreSQL later
- Use RSS feeds first (easier than web scraping)
- Implement basic sentiment analysis first, can improve later
- Test with small number of sources initially
- Handle rate limiting and respectful scraping
- Implement proper error handling and logging
- Use database transactions for data consistency
- Implement retry logic for failed scrapes

## Estimated Implementation Time

- Phase 1 (Database Schema): 15-30 minutes
- Phase 2 (Rust News Service): 2-4 hours
- Phase 3 (Python Scraper): 3-5 hours
- Phase 4 (Terminal Integration): 1-2 hours
- Phase 5 (Workspace Configuration): 30 minutes
- Phase 6 (Testing): 1-2 hours

**Total: 8-14 hours**

## Next Steps

1. Review and approve this plan
2. Start with Phase 1 (Database Schema)
3. Implement incrementally, testing each phase
4. Iterate based on feedback and testing results

