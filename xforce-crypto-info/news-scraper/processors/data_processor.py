import polars as pl
from typing import List, Dict, Any, Optional
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
        """Process articles with Polars DataFrame using lazy evaluation for performance."""
        if not articles:
            return pl.DataFrame()

        # Convert to Polars DataFrame
        df = pl.DataFrame(articles)

        # Use lazy evaluation for better performance with large datasets
        df = (
            df.lazy()
            .pipe(self.clean_articles_lazy)
            .pipe(self.categorize_articles_lazy)
            .pipe(self.extract_keywords_lazy)
            .pipe(self.add_metadata_lazy)
            .collect()
        )
        
        # Deduplicate (needs eager evaluation)
        df = self.deduplicate_articles(df)

        return df

    def clean_articles_lazy(self, df: pl.LazyFrame) -> pl.LazyFrame:
        """Clean article data using Polars lazy operations."""
        return df.with_columns([
            # Clean HTML tags from content using string operations
            pl.col("content")
                .map_elements(
                    lambda x: self._strip_html(x) if x else "",
                    return_dtype=pl.String
                )
                .alias("content"),
            # Ensure title is not empty
            pl.col("title").fill_null("").str.strip_chars().alias("title"),
            # Ensure URL is not empty
            pl.col("url").fill_null("").str.strip_chars().alias("url"),
            # Calculate content length
            pl.col("content")
                .map_elements(
                    lambda x: len(x.split()) if x else 0,
                    return_dtype=pl.UInt32
                )
                .alias("word_count"),
        ])

    def categorize_articles_lazy(self, df: pl.LazyFrame) -> pl.LazyFrame:
        """Categorize articles based on keywords using Polars lazy operations."""
        bitcoin_keywords = self.bitcoin_keywords
        crypto_keywords = self.crypto_keywords
        financial_keywords = self.financial_keywords
        
        def get_category(title: str, content: str) -> str:
            if not title:
                return "general"
            text = (title + " " + (content or "")).lower()
            if any(keyword in text for keyword in bitcoin_keywords):
                return "bitcoin"
            elif any(keyword in text for keyword in crypto_keywords):
                return "crypto"
            elif any(keyword in text for keyword in financial_keywords):
                return "financial"
            return "general"

        return df.with_columns([
            pl.struct(["title", "content"])
                .map_elements(
                    lambda x: get_category(x["title"], x.get("content", "")),
                    return_dtype=pl.String
                )
                .alias("category")
        ])

    def extract_keywords_lazy(self, df: pl.LazyFrame) -> pl.LazyFrame:
        """Extract keywords using Polars lazy operations."""
        all_keywords = self.crypto_keywords + self.bitcoin_keywords + self.financial_keywords
        
        def extract_keywords(text: str) -> List[str]:
            if not text:
                return []
            text_lower = text.lower()
            keywords = []
            for keyword in all_keywords:
                if keyword in text_lower:
                    keywords.append(keyword)
            return list(set(keywords))

        return df.with_columns([
            pl.col("title")
                .map_elements(
                    lambda x: extract_keywords(x or ""),
                    return_dtype=pl.List(pl.String)
                )
                .alias("keywords")
        ])

    def add_metadata_lazy(self, df: pl.LazyFrame) -> pl.LazyFrame:
        """Add metadata columns using Polars lazy operations."""
        return df.with_columns([
            # Ensure published_at is a datetime
            pl.col("published_at")
                .cast(pl.String)
                .str.to_datetime(strict=False)
                .alias("published_at_dt")
        ]).with_columns([
            # Extract domain from URL
            pl.col("url")
                .str.extract(r"https?://([^/]+)", 1)
                .alias("domain"),
            # Check if article has image
            pl.col("image_url")
                .is_not_null()
                .alias("has_image"),
            # Extract year, month, day from published_at if available
            pl.col("published_at_dt").dt.year().alias("published_year"),
            pl.col("published_at_dt").dt.month().alias("published_month"),
            pl.col("published_at_dt").dt.day().alias("published_day"),
        ])


    def deduplicate_articles(self, df: pl.DataFrame) -> pl.DataFrame:
        """Remove duplicate articles based on URL using Polars."""
        return df.unique(subset=["url"], keep="first")

    def _strip_html(self, text: str) -> str:
        """Strip HTML tags from text."""
        if not text:
            return ""
        text = re.sub(r'<[^>]+>', '', text)
        text = re.sub(r'\s+', ' ', text)
        return text.strip()

