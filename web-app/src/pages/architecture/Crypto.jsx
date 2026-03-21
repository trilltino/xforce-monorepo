import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';

const Section = ({ title, subtitle, children, delay = 0 }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="mb-12"
    >
        <h2 className="text-3xl font-bold text-white mb-2 font-heading">{title}</h2>
        {subtitle && (
            <p className="text-xl text-gray-400 mb-6 font-sans">{subtitle}</p>
        )}
        <div className="bg-black/40 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
            {children}
        </div>
    </motion.div>
);

export default function CryptoDetails() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl md:text-6xl font-black mb-4 font-heading tracking-tight">
                    <span className="text-red-500">xforce</span>
                    <span className="text-white">-crypto</span>
                </h1>
                <p className="text-xl text-gray-400 font-sans">
                    News Aggregation with Python
                </p>
            </motion.div>

            {/* Overview */}
            <Section title="What is this?" delay={0.1}>
                <p className="text-gray-300 text-lg mb-4 font-sans leading-relaxed">
                    The News Service is like having a <strong className="text-red-400">personal news assistant</strong> that reads hundreds of crypto websites 24/7. It finds relevant articles, figures out if they're positive or negative (sentiment analysis), and delivers them to your trading terminal so you can make informed decisions.
                </p>
                <p className="text-gray-400 font-sans">
                    Built with <strong className="text-white">Python</strong>, it uses RSS feeds, NLTK/VADER for sentiment analysis, and PostgreSQL for storage.
                </p>
            </Section>

            {/* RSS Scraper */}
            <Section title="RSS Scraping" subtitle="Collecting News from Multiple Sources" delay={0.2}>
                <CodeBlock 
                    title="RSS Scraper Class — The News Collector"
                    explanation="This is like a newsreader with superpowers. The RSSScraper connects to news websites, grabs the latest articles (up to 50 per source), and extracts key information."
                    language="python"
                    code={`import feedparser
import hashlib
from typing import List, Dict, Any

class RSSScraper:
    def __init__(self, source_config: Dict[str, Any]):
        # Setup: Name, URL, and category for this news source
        self.name = source_config["name"]
        self.endpoint = source_config["endpoint"]
        self.category = source_config.get("category", "crypto")

    def scrape_feed(self) -> List[Dict[str, Any]]:
        """Scrape RSS feed and return list of articles."""
        try:
            # Parse the RSS feed (like reading an XML file)
            feed = feedparser.parse(self.endpoint)
            articles = []

            # Process up to 50 articles from this source
            for entry in feed.entries[:50]:
                title = entry.get("title", "")
                print(f"[HEADLINE] [{self.name}] {title}")
                
                # Create article object with all relevant data
                article = {
                    "external_id": self._generate_id(entry.get("link", "")),
                    "title": title,
                    "content": self._extract_content(entry),
                    "url": entry.get("link", ""),
                    "author": self._extract_author(entry),
                    "published_at": self._parse_date(entry),
                    "category": self.category,
                    "source_name": self.name,
                }
                articles.append(article)

            return articles
        except Exception as e:
            print(f"Error scraping {self.name}: {e}")
            return []

    def _generate_id(self, url: str) -> str:
        """Generate unique ID from URL using MD5 hash.
        This ensures we don't store the same article twice."""
        return hashlib.md5(url.encode()).hexdigest()`}
                />
            </Section>

            {/* Sentiment Analysis */}
            <Section title="Sentiment Analysis" subtitle="Understanding Article Tone" delay={0.3}>
                <CodeBlock 
                    title="Sentiment Analyzer — Is the News Good or Bad?"
                    explanation="This is like having an AI assistant read articles and tell you 'this sounds optimistic' or 'this sounds concerning'. We use VADER for sentiment analysis."
                    language="python"
                    code={`from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

class SentimentAnalyzer:
    def __init__(self):
        # Download the VADER lexicon if not already present
        # This is a pre-trained model for sentiment analysis
        try:
            nltk.data.find('sentiment/vader_lexicon')
        except LookupError:
            nltk.download('vader_lexicon')
        
        self.analyzer = SentimentIntensityAnalyzer()
    
    def analyze_article(self, title: str, content: str) -> Dict[str, float]:
        """Analyze sentiment of article title and content.
        
        Returns scores from -1 (very negative) to +1 (very positive).
        We combine title and content because titles are often more emotional.
        """
        # Combine title and content for analysis
        text = f"{title}. {content}"
        
        # Get sentiment scores from VADER
        scores = self.analyzer.polarity_scores(text)
        
        return {
            "sentiment_score": scores["compound"],  # Overall score: -1 to +1
            "positive": scores["pos"],              # % of positive words
            "negative": scores["neg"],              # % of negative words
            "neutral": scores["neu"],               # % of neutral words
        }
    
    def categorize_sentiment(self, score: float) -> str:
        """Categorize sentiment score into a simple label.
        
        - Positive: > 0.05 (optimistic news)
        - Negative: < -0.05 (concerning news)  
        - Neutral: -0.05 to 0.05 (balanced reporting)
        """
        if score >= 0.05:
            return "positive"
        elif score <= -0.05:
            return "negative"
        else:
            return "neutral"`}
                />
            </Section>

            {/* Data Flow */}
            <Section title="How It Works" subtitle="From Raw News to Your Terminal" delay={0.4}>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="bg-red-500/20 text-red-400 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                        <div>
                            <h3 className="font-bold text-white mb-1">Scrape</h3>
                            <p className="text-gray-400 text-sm">Python scripts run on a schedule, connecting to 10+ RSS feeds from major crypto news sites (CoinDesk, CoinTelegraph, etc.)</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-red-500/20 text-red-400 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                        <div>
                            <h3 className="font-bold text-white mb-1">Analyze</h3>
                            <p className="text-gray-400 text-sm">Each article runs through VADER sentiment analysis to determine if it's bullish, bearish, or neutral</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-red-500/20 text-red-400 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                        <div>
                            <h3 className="font-bold text-white mb-1">Store</h3>
                            <p className="text-gray-400 text-sm">Articles are saved to PostgreSQL with their sentiment scores, deduplicated using MD5 hashes of URLs</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-red-500/20 text-red-400 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                        <div>
                            <h3 className="font-bold text-white mb-1">Serve</h3>
                            <p className="text-gray-400 text-sm">The trading terminal requests news via HTTP API (port 3003) and displays it alongside price charts</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Features */}
            <Section title="Key Features" subtitle="What Makes This Special" delay={0.5}>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-red-400 mb-2">Multi-Source Aggregation</h3>
                        <p className="text-gray-400 text-sm">Pulls from 10+ major crypto news sources simultaneously, giving you comprehensive coverage without visiting multiple websites.</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-red-400 mb-2">AI Sentiment Analysis</h3>
                        <p className="text-gray-400 text-sm">VADER algorithm specifically trained on social media and financial text, giving accurate bullish/bearish signals.</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-red-400 mb-2">Automatic Deduplication</h3>
                        <p className="text-gray-400 text-sm">MD5 hashing ensures the same article from multiple sources only gets stored once, keeping the database clean.</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-red-400 mb-2">Real-Time Delivery</h3>
                        <p className="text-gray-400 text-sm">Articles appear in your terminal within minutes of publication, integrated alongside your trading interface.</p>
                    </div>
                </div>
            </Section>

            {/* Navigation */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-between items-center mt-12 pt-8 border-t border-gray-800"
            >
                <Link to="/architecture/contracts" className="text-gray-400 hover:text-red-400 transition-colors">
                    ← Smart Contracts
                </Link>
                <Link to="/architecture/system" className="text-red-400 hover:text-red-300 transition-colors">
                    Next: System Overview →
                </Link>
            </motion.div>
        </div>
    );
}
