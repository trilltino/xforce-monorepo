from main import NewsScraperService

if __name__ == "__main__":
    service = NewsScraperService()
    print("Starting one-time scrape...")
    service.scrape_all_sources()
    print("One-time scrape completed.")
