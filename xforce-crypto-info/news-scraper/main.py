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
        print(f"[DEBUG] Scraping {source_config['name']}...")
        
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
                print(f"[DEBUG] No articles found for {source_config['name']}")
                return
            
            print(f"[DEBUG] Scraped {len(articles)} articles from {source_config['name']}")

            # Process articles with Polars
            articles_df = self.data_processor.process_articles(articles)
            
            # Analyze sentiment
            articles_df = self.sentiment_analyzer.analyze_batch(articles_df)
            
            # Write to database
            print(f"[DEBUG] Writing {len(articles_df)} articles to database from {source_config['name']}")
            inserted_count = self.db_writer.write_articles(articles_df, source_id)
            print(f"[DEBUG] Inserted {inserted_count} articles from {source_config['name']}")
            
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

