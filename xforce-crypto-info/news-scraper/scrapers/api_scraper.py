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
                title = item.get("title", "")
                # Debug: Print headline to terminal
                print(f"[HEADLINE] [API Scraper] [NewsAPI] [{self.name}] {title}")
                
                article = {
                    "external_id": self._generate_id(item.get("url", "")),
                    "title": title,
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
                title = item.get("title", "")
                # Debug: Print headline to terminal
                print(f"[HEADLINE] [API Scraper] [CryptoCompare] [{self.name}] {title}")
                
                article = {
                    "external_id": str(item.get("id", "")),
                    "title": title,
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
            if date_str:
                # Remove 'Z' and replace with +00:00 for timezone
                date_str = date_str.replace("Z", "+00:00")
                return datetime.fromisoformat(date_str)
        except:
            pass
        return datetime.now()

    def _parse_timestamp(self, timestamp: int) -> datetime:
        """Parse Unix timestamp to datetime."""
        try:
            if timestamp:
                return datetime.fromtimestamp(timestamp)
        except:
            pass
        return datetime.now()

