//! Market data DTOs

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

/// OHLC candlestick data
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OHLC {
    pub timestamp: i64,
    pub open: f64,
    pub high: f64,
    pub low: f64,
    pub close: f64,
    pub volume: f64,
}

impl OHLC {
    pub fn new(timestamp: i64, open: f64, high: f64, low: f64, close: f64, volume: f64) -> Self {
        Self { timestamp, open, high, low, close, volume }
    }

    pub fn datetime(&self) -> DateTime<Utc> {
        DateTime::from_timestamp(self.timestamp, 0)
            .unwrap_or_else(|| DateTime::from_timestamp(0, 0).unwrap())
    }

    pub fn is_bullish(&self) -> bool { self.close > self.open }
    pub fn is_bearish(&self) -> bool { self.close < self.open }
    pub fn body_size(&self) -> f64 { (self.close - self.open).abs() }
    pub fn total_range(&self) -> f64 { self.high - self.low }
}

/// Chart timeframe
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
pub enum Timeframe {
    OneMinute,
    FiveMinutes,
    FifteenMinutes,
    OneHour,
    FourHours,
    OneDay,
    OneWeek,
}

impl Timeframe {
    pub fn duration_secs(&self) -> i64 {
        match self {
            Timeframe::OneMinute => 60,
            Timeframe::FiveMinutes => 300,
            Timeframe::FifteenMinutes => 900,
            Timeframe::OneHour => 3600,
            Timeframe::FourHours => 14400,
            Timeframe::OneDay => 86400,
            Timeframe::OneWeek => 604800,
        }
    }

    pub fn label(&self) -> &'static str {
        match self {
            Timeframe::OneMinute => "1M",
            Timeframe::FiveMinutes => "5M",
            Timeframe::FifteenMinutes => "15M",
            Timeframe::OneHour => "1H",
            Timeframe::FourHours => "4H",
            Timeframe::OneDay => "1D",
            Timeframe::OneWeek => "1W",
        }
    }
}

/// OHLC request
#[derive(Debug, Serialize, Deserialize)]
pub struct OHLCRequest {
    pub symbol: String,
    pub timeframe: Timeframe,
    pub limit: Option<usize>,
}

/// OHLC response
#[derive(Debug, Serialize, Deserialize)]
pub struct OHLCResponse {
    pub symbol: String,
    pub timeframe: Timeframe,
    pub data: Vec<OHLC>,
}
