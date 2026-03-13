import sqlite3
import json
from typing import List, Dict, Any
import polars as pl
from datetime import datetime
import os

class DatabaseWriter:
    def __init__(self, database_url: str):
        # Handle sqlite:/// prefix
        if database_url.startswith("sqlite:///"):
            self.db_path = database_url.replace("sqlite:///", "")
        else:
            self.db_path = database_url
        
        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row

    def write_articles(self, articles_df: pl.DataFrame, source_id: int) -> int:
        """Write articles to SQLite database."""
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
                    # Debug: Print when skipping duplicate
                    title = row.get("title", "")
                    print(f"[DEBUG] Skipping duplicate article: {title}")
                    continue

                # Debug: Print headline before inserting
                title = row.get("title", "")
                print(f"[HEADLINE] [DB Writer] [Inserting] [SourceID:{source_id}] {title}")
                
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
                    title,
                    row.get("content"),
                    row.get("url", ""),
                    row.get("author"),
                    row.get("published_at"),
                    datetime.now().isoformat(),
                    row.get("category"),
                    json.dumps(row.get("tags", [])),
                    row.get("sentiment_score"),
                    row.get("sentiment_label"),
                    json.dumps(row.get("keywords", [])),
                    row.get("image_url"),
                ))
                inserted_count += 1
                print(f"[DEBUG] Successfully inserted article: {title}")
            except Exception as e:
                print(f"Error inserting article: {e}")
                continue

        self.conn.commit()

        # Update source last_scraped_at
        cursor.execute(
            "UPDATE sources SET last_scraped_at = ? WHERE id = ?",
            (datetime.now().isoformat(), source_id)
        )
        self.conn.commit()

        return inserted_count

    def get_or_create_source(self, source_config: Dict[str, Any]) -> int:
        """Get or create source in database."""
        cursor = self.conn.cursor()
        
        cursor.execute("SELECT id FROM sources WHERE name = ?", (source_config["name"],))
        result = cursor.fetchone()
        
        if result:
            return result[0]
        
        cursor.execute("""
            INSERT INTO sources (
                name, url, type, endpoint, api_key, enabled, scrape_interval_minutes
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            source_config["name"],
            source_config.get("url", ""),
            source_config["type"],
            source_config.get("endpoint", ""),
            source_config.get("api_key", os.getenv(source_config.get("api_key_env", ""), "")),
            source_config.get("enabled", True),
            source_config.get("scrape_interval_minutes", 15),
        ))
        self.conn.commit()
        return cursor.lastrowid

