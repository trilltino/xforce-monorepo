import { Link } from 'react-router-dom';

const docLinks = [
    { href: '/xfterminal/docs/index.html', title: 'Overview', desc: 'Main documentation index' },
    { href: '/xfterminal/docs/tech-stack.html', title: 'Tech Stack', desc: 'Technology stack details' },
    { href: '/xfterminal/docs/terminal.html', title: 'Terminal', desc: 'Terminal architecture' },
    { href: '/xfterminal/docs/data-flows.html', title: 'Data Flows', desc: 'Data flow diagrams' },
    { href: '/xfterminal/docs/integrations.html', title: 'Integrations', desc: 'Integration architecture' },
    { href: '/xfterminal/docs/news-service.html', title: 'News Service', desc: 'News service architecture' },
    { href: '/xfterminal/docs/contracts.html', title: 'Contracts', desc: 'Contract specifications' },
];

export default function Architecture() {
    return (
        <div className="max-w-7xl mx-auto py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 font-heading text-gray-900 dark:text-white">Architecture Documentation</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 font-sans">
                    Technical architecture and system design for XFTerminal.
                </p>
                <a
                    href="/xfterminal/docs/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors duration-200 text-lg"
                >
                    Open Full Documentation →
                </a>
            </div>

            <div className="space-y-12">
                {/* xforce-terminal Backend */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-4 font-heading">xforce-terminal — Backend API</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-6">
                        Rust-based Axum server with modular library crates for authentication, core models, Solana integration, and web handlers.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Server Setup (main.rs)</h3>
                    <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`//! Backend API server entry point

use lib_web::{start_server, ServerConfig};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();

    // Robust migrations path resolution for monorepo
    let migrations_path = std::env::var("MIGRATIONS_PATH").unwrap_or_else(|_| {
        if std::path::Path::new("migrations").exists() {
            "migrations".to_string()
        } else if std::path::Path::new("../migrations").exists() {
            "../migrations".to_string()
        } else {
            "migrations".to_string()
        }
    });

    start_server(ServerConfig {
        bind_address: "127.0.0.1:3001".to_string(),
        migrations_path: Box::leak(migrations_path.into_boxed_str()),
        ..Default::default()
    }).await
}`}
                    </pre>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">WebSocket Handler — Real-time Prices</h3>
                    <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`//! WebSocket handler for real-time price streaming
//! Route: GET /api/ws/prices

pub async fn price_stream_websocket(
    ws: WebSocketUpgrade,
    headers: HeaderMap,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    State(price_stream): State<Arc<PriceStreamServer>>,
) -> Response {
    let client_id = Uuid::new_v4().to_string();
    let client_ip = headers
        .get("x-forwarded-for")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.split(',').next().unwrap_or("").trim().to_string())
        .or_else(|| Some(addr.ip().to_string()));
    
    // Subscribe to price stream
    let price_rx = price_stream.subscribe();
    
    // Perform WebSocket upgrade
    ws.on_upgrade(move |socket| async move {
        handle_price_websocket(socket, price_rx, client_id, client_ip, None).await;
    })
    .into_response()
}`}
                    </pre>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Authentication Handler</h3>
                    <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`/// Signup handler - creates a new user account
#[instrument(skip(pool, config), fields(username = %req.username, email = %req.email))]
pub async fn signup(
    State(pool): State<DbPool>,
    State(config): State<Config>,
    Json(req): Json<SignupRequest>,
) -> Result<(StatusCode, Json<AuthResponse>), (StatusCode, Json<ErrorResponse>)> {
    info!("[SIGNUP]  NEW USER SIGNUP REQUEST");

    if req.username.len() < 3 {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: "Username must be at least 3 characters".to_string(),
            }),
        ));
    }

    if !req.email.contains('@') {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: "Invalid email format".to_string(),
            }),
        ));
    }

    // Hash password and create user...
    let password_hash = hash_password(&req.password)?;
    let user = UserRepository::create(&pool, &req, &password_hash).await?;
    
    // Generate JWT and wallet setup token
    let token = encode_jwt(&user, &config.jwt_secret, config.jwt_max_age)?;
    let wallet_setup_token = generate_wallet_setup_token(&user.id.to_string(), &config)?;
    
    Ok((StatusCode::CREATED, Json(AuthResponse {
        token,
        wallet_setup_token: Some(wallet_setup_token),
        user: UserInfo::from(user),
    })))
}`}
                    </pre>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Router Setup with Middleware</h3>
                    <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm">
{`fn create_router(state: AppState, chat_state: Arc<ChatAppState>, allowed_origins: Vec<String>) -> Router {
    let origins: Vec<HeaderValue> = allowed_origins
        .iter()
        .filter_map(|origin| origin.parse().ok())
        .collect();

    let cors = CorsLayer::new()
        .allow_origin(origins)
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::OPTIONS])
        .allow_headers([
            axum::http::header::CONTENT_TYPE,
            axum::http::header::AUTHORIZATION,
        ]);

    let app = Router::new()
        .route("/api/auth/signup", post(handlers::auth::signup))
        .route("/api/auth/login", post(handlers::auth::login))
        .route("/api/market/prices", get(handlers::market::get_prices))
        .route("/api/ws/prices", get(handlers::websocket::price_stream_websocket))
        .route("/api/swap/quote", get(handlers::swap::get_swap_quote))
        .route("/api/swap/execute", post(handlers::swap::execute_swap))
        .route("/api/contracts/batch-swap-router/batch-swap", 
               post(handle_batch_swap_app_state))
        .with_state(state)
        .layer(axum::middleware::from_fn(stamp_req))
        .layer(axum::middleware::from_fn(log_requests))
        .layer(cors);

    app
}`}
                    </pre>
                </div>

                {/* xforce-terminal-contracts */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-4 font-heading">xforce-terminal-contracts — Solana Smart Contracts</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-6">
                        Anchor-based smart contracts for batch token swaps with security validations, slippage protection, and protocol fee management.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Program Declaration (lib.rs)</h3>
                    <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`//! # Batch Swap Router Program
//!
//! A Solana program that enables batch execution of token swaps 
//! in a single transaction with atomic execution guarantees.

use anchor_lang::prelude::*;

// Declare the program ID (devnet deployment)
declare_id!("HS63bw1V1qTM5uWf92q3uaFdqogrc4SN9qUJSR8aqBMx");

#[program]
pub mod batch_swap_router {
    use super::*;

    /// Execute multiple token swaps in a single transaction
    pub fn batch_swap(ctx: Context<BatchSwap>, swaps: Vec<SwapParams>) -> Result<()> {
        instructions::batch_swap::handler(ctx, swaps)
    }

    /// Execute a single token swap with slippage protection
    pub fn execute_swap(
        ctx: Context<ExecuteSwap>,
        amount: u64,
        min_output_amount: u64,
        expected_output: u64,
    ) -> Result<()> {
        instructions::execute_swap::handler(ctx, amount, min_output_amount, expected_output)
    }
}`}
                    </pre>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Batch Swap Handler</h3>
                    <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`/// Handler for the batch swap instruction
/// 
/// # Arguments
/// * ctx - Context containing account information
/// * swaps - Vector of swap parameters (max 10 swaps per batch)
pub fn handler(ctx: Context<BatchSwap>, swaps: Vec<SwapParams>) -> Result<()> {
    // ========================================================================
    // STEP 1: Validate Batch Size
    // ========================================================================
    require!(!swaps.is_empty(), ErrorCode::EmptySwaps);
    require!(
        swaps.len() <= MAX_BATCH_SIZE,  // MAX_BATCH_SIZE = 10
        ErrorCode::TooManySwaps
    );
    
    // ========================================================================
    // STEP 2: Validate Each Swap
    // ========================================================================
    for (index, swap) in swaps.iter().enumerate() {
        // Validate mint addresses (security: prevent default addresses)
        assert_not_default(&swap.input_mint)?;
        assert_not_default(&swap.output_mint)?;
        
        // Validate swap amount (security: prevent dust attacks)
        require!(swap.amount >= MIN_SWAP_AMOUNT, ErrorCode::InvalidAmount);
        
        // Validate different mints (security: prevent invalid swaps)
        assert_different_mints(&swap.input_mint, &swap.output_mint)?;
        
        // Validate slippage protection
        require!(swap.min_output_amount > 0, ErrorCode::InvalidMinOutput);
        
        msg!(
            "Swap {}: {} tokens (min: {}) from {} to {}",
            index + 1,
            swap.amount,
            swap.min_output_amount,
            swap.input_mint,
            swap.output_mint
        );
    }
    
    // ========================================================================
    // STEP 3: Calculate Fees with Safe Math
    // ========================================================================
    let mut total_input_amount: u64 = 0;
    let mut total_protocol_fees: u64 = 0;
    
    for swap in &swaps {
        let fee = calculate_protocol_fee(swap.amount)?;
        total_input_amount = total_input_amount.safe_add(swap.amount)?;
        total_protocol_fees = total_protocol_fees.safe_add(fee)?;
    }
    
    // ========================================================================
    // STEP 4: Emit Event for Tracking
    // ========================================================================
    emit!(BatchSwapEvent {
        authority: ctx.accounts.authority.key(),
        swap_count: swaps.len() as u8,
        total_input_amount,
        total_protocol_fees,
        timestamp: Clock::get()?.unix_timestamp,
    });
    
    Ok(())
}`}
                    </pre>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Execute Swap with CPI</h3>
                    <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm">
{`/// Handler for single swap with slippage protection and fee distribution
pub fn handler(ctx: Context<ExecuteSwap>, amount: u64, min_output_amount: u64, expected_output: u64) -> Result<()> {
    // Security validations
    assert_signer(ctx.accounts.authority.as_ref())?;
    require!(amount >= MIN_SWAP_AMOUNT, ErrorCode::InvalidAmount);
    
    // Validate mints are different
    assert_different_mints(
        &ctx.accounts.input_token_account.mint,
        &ctx.accounts.output_token_account.mint,
    )?;
    
    // Validate authority owns input account
    assert_token_account_owner(
        &ctx.accounts.input_token_account,
        ctx.accounts.authority.key(),
    )?;
    
    // Calculate protocol fee with safe math
    let protocol_fee = calculate_protocol_fee(amount)?;
    let swap_amount = amount_after_fee(amount, protocol_fee)?;
    
    // Execute swap via CPI to token program
    let transfer_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.input_token_account.to_account_info(),
            to: ctx.accounts.fee_recipient.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        },
    );
    
    token::transfer(transfer_ctx, protocol_fee)
        .map_err(|_| ErrorCode::TransferFailed)?;
    
    // Validate slippage
    validate_slippage(expected_output, actual_output, min_output_amount, MAX_SLIPPAGE_BPS)?;
    
    // Emit event
    emit!(SwapExecutedEvent {
        authority: ctx.accounts.authority.key(),
        input_amount: amount,
        output_amount: actual_output,
        protocol_fee,
        timestamp: Clock::get()?.unix_timestamp,
    });
    
    Ok(())
}`}
                    </pre>
                </div>

                {/* xforce-crypto-info */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-4 font-heading">xforce-crypto-info — News Aggregation Service</h2>
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-6">
                        Python-based news scraper with RSS feed aggregation, sentiment analysis using NLTK/VADER, and PostgreSQL storage.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">RSS Scraper Class</h3>
                    <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`import feedparser
import hashlib
from typing import List, Dict, Any
from datetime import datetime

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
                print(f"[HEADLINE] [{self.name}] {title}")
                
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
        return hashlib.md5(url.encode()).hexdigest()`}
                    </pre>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Sentiment Analysis</h3>
                    <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm">
{`from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

class SentimentAnalyzer:
    def __init__(self):
        # Download VADER lexicon if not present
        try:
            nltk.data.find('sentiment/vader_lexicon')
        except LookupError:
            nltk.download('vader_lexicon')
        
        self.analyzer = SentimentIntensityAnalyzer()
    
    def analyze_article(self, title: str, content: str) -> Dict[str, float]:
        """Analyze sentiment of article title and content."""
        # Combine title and content for analysis
        text = f"{title}. {content}"
        
        # Get sentiment scores
        scores = self.analyzer.polarity_scores(text)
        
        return {
            "sentiment_score": scores["compound"],  # -1 (negative) to +1 (positive)
            "positive": scores["pos"],
            "negative": scores["neg"],
            "neutral": scores["neu"],
        }
    
    def categorize_sentiment(self, score: float) -> str:
        """Categorize sentiment score into label."""
        if score >= 0.05:
            return "positive"
        elif score <= -0.05:
            return "negative"
        else:
            return "neutral"`}
                    </pre>
                </div>

                {/* Architecture Overview */}
                <div className="bg-white dark:bg-gray-900 border border-primary-900/30 rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-primary-400 mb-4 font-heading">System Architecture Overview</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-primary-500/10 p-4 rounded-lg">
                            <h3 className="font-bold text-primary-400 mb-2">Backend Stack</h3>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Rust + Axum (HTTP server)</li>
                                <li>• PostgreSQL + SQLx (database)</li>
                                <li>• JWT + Argon2 (authentication)</li>
                                <li>• Tokio (async runtime)</li>
                                <li>• Tonic (gRPC for Geyser)</li>
                            </ul>
                        </div>
                        <div className="bg-primary-500/10 p-4 rounded-lg">
                            <h3 className="font-bold text-primary-400 mb-2">Smart Contracts</h3>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Anchor Framework</li>
                                <li>• Batch Swap Router Program</li>
                                <li>• CPI to SPL Token Program</li>
                                <li>• Event emission for indexing</li>
                                <li>• Program ID: HS63bw1V1q...</li>
                            </ul>
                        </div>
                        <div className="bg-primary-500/10 p-4 rounded-lg">
                            <h3 className="font-bold text-primary-400 mb-2">News Service</h3>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• Python + feedparser (RSS)</li>
                                <li>• NLTK/VADER (sentiment)</li>
                                <li>• PostgreSQL (storage)</li>
                                <li>• React frontend (dashboard)</li>
                                <li>• 10+ RSS sources aggregated</li>
                            </ul>
                        </div>
                        <div className="bg-primary-500/10 p-4 rounded-lg">
                            <h3 className="font-bold text-primary-400 mb-2">Frontend</h3>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• React 18 + TypeScript</li>
                                <li>• Tauri v2 (desktop)</li>
                                <li>• Tailwind CSS (styling)</li>
                                <li>• lightweight-charts (charts)</li>
                                <li>• Solana Wallet Adapter</li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Data Flow Architecture</h3>
                    <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm">
{`┌─────────────────────────────────────────────────────────────────────────────┐
│                          XFTerminal Architecture                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐               │
│   │   Terminal   │────▶│  Axum API    │────▶│  PostgreSQL  │               │
│   │   (Tauri)    │◀────│   (Rust)     │◀────│  (SQLx)      │               │
│   └──────────────┘     └──────┬───────┘     └──────────────┘               │
│                               │                                              │
│                               ▼                                              │
│                        ┌──────────────┐                                       │
│                        │   Solana     │                                       │
│                        │  (Contracts) │                                       │
│                        └──────────────┘                                       │
│                               │                                              │
│         ┌─────────────────────┼─────────────────────┐                      │
│         ▼                     ▼                     ▼                      │
│   ┌──────────┐         ┌──────────┐         ┌──────────┐                   │
│   │  Geyser  │         │  Jupiter │         │   Pyth   │                   │
│   │ (gRPC)   │         │ (Quotes) │         │ (Prices) │                   │
│   └──────────┘         └──────────┘         └──────────┘                   │
│                                                                              │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐               │
│   │ News Scraper │────▶│  PostgreSQL  │────▶│  React Web   │               │
│   │  (Python)    │     │   (News DB)  │     │   Dashboard  │               │
│   └──────────────┘     └──────────────┘     └──────────────┘               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
