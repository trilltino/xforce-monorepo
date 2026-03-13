import sqlite3
import os

def init_db():
    conn = sqlite3.connect('news.db')
    cursor = conn.cursor()
    
    # Create sources table
    cursor.execute('''
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
    )
    ''')
    
    # Create articles table
    cursor.execute('''
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
        tags TEXT,
        sentiment_score REAL,
        sentiment_label TEXT CHECK(sentiment_label IN ('positive', 'negative', 'neutral')),
        keywords TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE CASCADE
    )
    ''')
    
    # Create indexes
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category)')
    
    conn.commit()
    conn.close()
    print("Database initialized successfully at news.db")

if __name__ == "__main__":
    init_db()
