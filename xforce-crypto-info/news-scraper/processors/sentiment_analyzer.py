from textblob import TextBlob
import polars as pl
from typing import Dict, Any
import concurrent.futures

class SentimentAnalyzer:
    def __init__(self):
        self.model = "textblob"
        self.max_workers = 4  # Parallel processing

    def analyze_sentiment(self, text: str) -> Dict[str, Any]:
        """Analyze sentiment of text."""
        if not text:
            return {
                "score": 0.0,
                "label": "neutral",
                "confidence": 0.0,
            }

        blob = TextBlob(text)
        polarity = blob.sentiment.polarity

        # Categorize sentiment
        if polarity > 0.1:
            label = "positive"
        elif polarity < -0.1:
            label = "negative"
        else:
            label = "neutral"

        # Confidence based on polarity magnitude
        confidence = abs(polarity)

        return {
            "score": float(polarity),
            "label": label,
            "confidence": float(confidence),
        }

    def analyze_batch(self, df: pl.DataFrame) -> pl.DataFrame:
        """Analyze sentiment for batch of articles using parallel processing with Polars."""
        if df.is_empty():
            return df

        # Extract text for analysis
        texts = df.select([
            pl.concat_str([
                pl.col("title"),
                pl.lit(" "),
                pl.col("content").fill_null("")
            ]).alias("full_text")
        ]).to_series().to_list()

        # Parallel sentiment analysis
        with concurrent.futures.ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            results = list(executor.map(self.analyze_sentiment, texts))

        # Convert results to Polars DataFrame and join
        sentiment_df = pl.DataFrame({
            "sentiment_score": [r["score"] for r in results],
            "sentiment_label": [r["label"] for r in results],
            "sentiment_confidence": [r["confidence"] for r in results],
        })

        # Add sentiment columns to original dataframe
        return df.with_columns([
            sentiment_df["sentiment_score"],
            sentiment_df["sentiment_label"],
            sentiment_df["sentiment_confidence"],
        ])

