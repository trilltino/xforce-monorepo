# News Scraper

Python-based news aggregation service for XForce Crypto Info.

## Overview

Background service that collects cryptocurrency news from multiple RSS feeds and APIs, performs sentiment analysis, and stores articles in PostgreSQL.

## Features

- RSS feed aggregation from 10+ sources
- API integration (CryptoCompare, NewsAPI)
- Sentiment analysis using NLTK/VADER
- PostgreSQL storage with duplicate detection
- Configurable fetch intervals
- Category classification
- Error handling and logging

## Project Structure

```
news-scraper/
├── config.py               # Configuration settings
├── main.py                 # Entry point
├── requirements.txt        # Python dependencies
├── scrapers/               # Data collection modules
│   ├── __init__.py
│   ├── rss_scraper.py      # RSS feed parser
│   └── api_scraper.py      # API integrations
├── processors/             # Data processing
│   ├── __init__.py
│   ├── data_processor.py   # Article processing
│   └── sentiment_analyzer.py # Sentiment analysis
└── writers/                # Database operations
    ├── __init__.py
    └── db_writer.py        # PostgreSQL writer
```

## Installation

### Prerequisites
- Python 3.9+
- PostgreSQL 14+

### Setup

```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Unix/Mac)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Configuration

Edit `config.py`:

```python
# Database
DB_HOST = "localhost"
DB_NAME = "crypto_news"
DB_USER = "user"
DB_PASSWORD = "password"

# RSS Feeds
RSS_FEEDS = [
    "https://cointelegraph.com/rss",
    "https://coindesk.com/feed",
    "https://decrypt.co/feed",
]

# API Keys
CRYPTOCOMPARE_API_KEY = "your-api-key"
```

## Running

```bash
python main.py
```

The scraper runs continuously, fetching news at configured intervals.

## Modules

### scrapers/rss_scraper.py
Parses RSS feeds and extracts article metadata.

### scrapers/api_scraper.py
Fetches news from external APIs.

### processors/data_processor.py
Cleans and normalizes article data.

### processors/sentiment_analyzer.py
Analyzes article sentiment using VADER.

### writers/db_writer.py
Writes processed articles to PostgreSQL.

## Database Schema

### articles
- id (SERIAL PRIMARY KEY)
- title (VARCHAR)
- content (TEXT)
- summary (TEXT)
- url (VARCHAR UNIQUE)
- source (VARCHAR)
- category (VARCHAR)
- sentiment_score (FLOAT)
- published_at (TIMESTAMP)
- created_at (TIMESTAMP)

## Dependencies

- `feedparser` - RSS feed parsing
- `requests` - HTTP requests
- `psycopg2` - PostgreSQL adapter
- `nltk` - Natural language processing
- `python-dotenv` - Environment variables
