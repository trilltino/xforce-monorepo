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
                title = entry.get("title", "")
                # Debug: Print headline to terminal
                print(f"[HEADLINE] [RSS Scraper] [{self.name}] {title}")
                
                article = {
                    "external_id": self._generate_id(entry.get("link", "")),
                    "title": title,
                    "content": self._extract_content(entry),
                    "url": entry.get("link", ""),
                    "author": self._extract_author(entry),
                    "published_at": self._parse_date(entry),
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
        if hasattr(entry, "content") and entry.content:
            return entry.content[0].value
        elif hasattr(entry, "summary") and entry.summary:
            return entry.summary
        return ""

    def _extract_author(self, entry) -> str:
        """Extract author from feed entry."""
        if hasattr(entry, "author") and entry.author:
            return entry.author
        elif hasattr(entry, "author_detail") and entry.author_detail:
            return entry.author_detail.get("name", "")
        return ""

    def _parse_date(self, entry) -> datetime:
        """Parse date string to datetime."""
        try:
            if hasattr(entry, "published_parsed") and entry.published_parsed:
                return datetime(*entry.published_parsed[:6])
            elif hasattr(entry, "updated_parsed") and entry.updated_parsed:
                return datetime(*entry.updated_parsed[:6])
        except:
            pass
        return datetime.now()

    def _extract_image(self, entry) -> str:
        """Extract image URL from feed entry."""
        if hasattr(entry, "media_content") and entry.media_content:
            for media in entry.media_content:
                if media.get("type", "").startswith("image"):
                    return media.get("url", "")
        elif hasattr(entry, "links") and entry.links:
            for link in entry.links:
                if link.get("type", "").startswith("image"):
                    return link.get("href", "")
        return ""

