import os
from dotenv import load_dotenv
from typing import List, Dict, Any

load_dotenv()

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///../news.db")

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

