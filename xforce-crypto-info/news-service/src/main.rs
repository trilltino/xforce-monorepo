use axum::{
    extract::{Query, State},
    routing::get,
    Router,
    response::IntoResponse,
    http::StatusCode,
    Json,
};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::{sqlite::SqlitePool, FromRow};
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;
use tracing::{info, error};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, FromRow)]
struct Article {
    id: i64,
    source_id: i64,
    external_id: Option<String>,
    title: String,
    content: Option<String>,
    url: String,
    author: Option<String>,
    published_at: Option<DateTime<Utc>>,
    scraped_at: DateTime<Utc>,
    category: Option<String>,
    tags: Option<String>,
    sentiment_score: Option<f64>,
    sentiment_label: Option<String>,
    keywords: Option<String>,
    image_url: Option<String>,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
struct ArticleFilters {
    category: Option<String>,
    search: Option<String>,
    limit: Option<i64>,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter("info")
        .init();

    info!("Starting Crypto News Service Backend (SQLite Mode)...");

    // Robust path resolution for news.db in monorepo
    let database_url = std::env::var("DATABASE_URL").unwrap_or_else(|_| {
        let mut path = std::env::current_dir().unwrap_or_default();
        // If we're in 'news-service', the DB is in the parent 'xforce-crypto-info'
        if path.ends_with("news-service") {
            path.pop();
        }
        path.push("news.db");
        let path_str = path.to_string_lossy();
        format!("sqlite:{}?mode=rwc", path_str)
    });
    
    info!("Attempting to connect to database at {}", database_url);
    let pool = SqlitePool::connect(&database_url).await.map_err(|e| {
        error!("Failed to connect to SQLite at {}: {}", database_url, e);
        e
    })?;
    info!("Successfully connected to database");

    let app = Router::new()
        .route("/", get(root))
        .route("/api/health", get(health_check))
        .route("/api/articles", get(get_articles))
        .route("/api/free-news", get(get_free_news))
        .route("/api/categories", get(get_categories))
        .layer(CorsLayer::permissive())
        .with_state(pool);

    let port: u16 = std::env::var("PORT")
        .unwrap_or_else(|_| "3002".to_string())
        .parse()?;
    let addr = SocketAddr::from(([127, 0, 0, 1], port));
    
    info!("Server listening on {}", addr);
    
    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}

async fn root() -> impl IntoResponse {
    (StatusCode::OK, "Crypto News Service API is running")
}

async fn health_check() -> impl IntoResponse {
    (StatusCode::OK, "OK")
}

async fn get_articles(
    State(pool): State<SqlitePool>,
    Query(filters): Query<ArticleFilters>,
) -> Result<Json<Vec<Article>>, (StatusCode, String)> {
    let limit = filters.limit.unwrap_or(20);
    
    let articles = if let Some(ref category) = filters.category {
        if category == "All" {
            sqlx::query_as::<_, Article>("SELECT * FROM articles ORDER BY published_at DESC LIMIT ?")
                .bind(limit)
                .fetch_all(&pool)
                .await
        } else {
            sqlx::query_as::<_, Article>("SELECT * FROM articles WHERE category = ? ORDER BY published_at DESC LIMIT ?")
                .bind(category)
                .bind(limit)
                .fetch_all(&pool)
                .await
        }
    } else {
        sqlx::query_as::<_, Article>("SELECT * FROM articles ORDER BY published_at DESC LIMIT ?")
            .bind(limit)
            .fetch_all(&pool)
            .await
    }.map_err(|e| {
        error!("Database error: {}", e);
        (StatusCode::INTERNAL_SERVER_ERROR, e.to_string())
    })?;

    Ok(Json(articles))
}

async fn get_free_news(State(pool): State<SqlitePool>) -> Result<Json<Value>, (StatusCode, String)> {
    let articles = sqlx::query_as::<_, Article>("SELECT * FROM articles WHERE category = 'Free News' OR category = 'general' ORDER BY published_at DESC LIMIT 10")
        .fetch_all(&pool)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    
    let news = articles.into_iter().map(|a| json!({
        "title": a.title,
        "timestamp": a.published_at,
        "source": "Crypto News",
        "url": a.url
    })).collect::<Vec<_>>();

    Ok(Json(json!(news)))
}

async fn get_categories(State(pool): State<SqlitePool>) -> Result<Json<Vec<String>>, (StatusCode, String)> {
    let categories = sqlx::query_scalar::<_, String>("SELECT DISTINCT category FROM articles WHERE category IS NOT NULL")
        .fetch_all(&pool)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    
    Ok(Json(categories))
}
