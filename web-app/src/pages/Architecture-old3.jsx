import { motion } from 'framer-motion';

const CodeBlock = ({ title, code }) => (
    <div className="mb-8">
        <h3 className="text-xl font-bold text-red-400 mb-3 font-heading">{title}</h3>
        <pre className="bg-gray-900/80 border border-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm">
{code}
        </pre>
    </div>
);

const Section = ({ title, subtitle, children, delay = 0 }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="mb-16"
    >
        <h2 className="text-4xl md:text-5xl font-black text-white mb-2 font-heading tracking-tight">
            <span className="text-red-500">{title.split(' ')[0]}</span>
            <span className="text-white"> {title.split(' ').slice(1).join(' ')}</span>
        </h2>
        {subtitle && (
            <p className="text-xl text-gray-400 mb-8 font-sans">{subtitle}</p>
        )}
        <div className="bg-black/40 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
            {children}
        </div>
    </motion.div>
);

const StackCard = ({ title, items }) => (
    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl">
        <h3 className="font-bold text-red-400 mb-3 text-lg">{title}</h3>
        <ul className="text-sm text-gray-400 space-y-2">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export default function Architecture() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h1 className="text-6xl md:text-7xl font-black mb-4 font-heading tracking-tight">
                    <span className="text-red-500">XF</span>
                    <span className="text-white">Architecture</span>
                    <span className="text-red-500">.</span>
                </h1>
                <p className="text-2xl text-gray-400 font-light tracking-wide font-sans">
                    Technical architecture and system design.
                </p>
            </motion.div>

            {/* xforce-terminal Backend */}
            <Section title="xforce-terminal" subtitle="Rust Backend API with Axum" delay={0.1}>
                <p className="text-gray-400 mb-8 font-sans">
                    Modular library crates for authentication, core models, Solana integration, and web handlers.
                </p>

                <CodeBlock 
                    title="Server Setup (main.rs)"
                    code={`//! Backend API server entry point

use lib_web::{start_server, ServerConfig};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();

    let migrations_path = std::env::var("MIGRATIONS_PATH")
        .unwrap_or_else(|_| "migrations".to_string());

    start_server(ServerConfig {
        bind_address: "127.0.0.1:3001".to_string(),
        migrations_path: Box::leak(migrations_path.into_boxed_str()),
        ..Default::default()
    }).await
}`}
                />

                <CodeBlock 
                    title="WebSocket Handler — Real-time Prices"
                    code={`//! WebSocket handler for price streaming
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
    
    let price_rx = price_stream.subscribe();
    
    ws.on_upgrade(move |socket| async move {
        handle_price_websocket(socket, price_rx, client_id, client_ip, None).await;
    })
    .into_response()
}`}
                />

                <CodeBlock 
                    title="Authentication Handler"
                    code={`/// Signup handler - creates a new user account
#[instrument(skip(pool, config))]
pub async fn signup(
    State(pool): State<DbPool>,
    State(config): State<Config>,
    Json(req): Json<SignupRequest>,
) -> Result<(StatusCode, Json<AuthResponse>), (StatusCode, Json<ErrorResponse>)> {
    info!("[SIGNUP] NEW USER SIGNUP REQUEST");

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

    let password_hash = hash_password(&req.password)?;
    let user = UserRepository::create(&pool, &req, &password_hash).await?;
    
    let token = encode_jwt(&user, &config.jwt_secret, config.jwt_max_age)?;
    let wallet_setup_token = generate_wallet_setup_token(&user.id.to_string(), &config)?;
    
    Ok((StatusCode::CREATED, Json(AuthResponse {
        token,
        wallet_setup_token: Some(wallet_setup_token),
        user: UserInfo::from(user),
    })))
}`}
                />

                <CodeBlock 
                    title="Router Setup with Middleware"
                    code={`fn create_router(state: AppState, allowed_origins: Vec<String>) -> Router {
    let origins: Vec<HeaderValue> = allowed_origins
        .iter()
        .filter_map(|origin| origin.parse().ok())
        .collect();

    let cors = CorsLayer::new()
        .allow_origin(origins)
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::OPTIONS])
        .allow_headers([CONTENT_TYPE, AUTHORIZATION]);

    Router::new()
        .route("/api/auth/signup", post(handlers::auth::signup))
        .route("/api/auth/login", post(handlers::auth::login))
        .route("/api/market/prices", get(handlers::market::get_prices))
        .route("/api/ws/prices", get(handlers::websocket::price_stream_websocket))
        .route("/api/swap/quote", get(handlers::swap::get_swap_quote))
        .route("/api/swap/execute", post(handlers::swap::execute_swap))
        .with_state(state)
        .layer(middleware::from_fn(stamp_req))
        .layer(middleware::from_fn(log_requests))
        .layer(cors)
}`}
                />
            </Section>

            {/* xforce-terminal-contracts */}
            <Section title="xforce-contracts" subtitle="Solana Smart Contracts with Anchor" delay={0.2}>
                <p className="text-gray-400 mb-8 font-sans">
                    Batch token swaps with security validations, slippage protection, and protocol fee management.
                </p>

                <CodeBlock 
                    title="Program Declaration (lib.rs)"
                    code={`//! # Batch Swap Router Program
//! A Solana program for batch token swaps with atomic execution.

use anchor_lang::prelude::*;

// Devnet deployment
declare_id!("HS63bw1V1qTM5uWf92q3uaFdqogrc4SN9qUJSR8aqBMx");

#[program]
pub mod batch_swap_router {
    use super::*;

    pub fn batch_swap(ctx: Context<BatchSwap>, swaps: Vec<SwapParams>) -> Result<()> {
        instructions::batch_swap::handler(ctx, swaps)
    }

    pub fn execute_swap(
        ctx: Context<ExecuteSwap>,
        amount: u64,
        min_output_amount: u64,
        expected_output: u64,
    ) -> Result<()> {
        instructions::execute_swap::handler(ctx, amount, min_output_amount, expected_output)
    }
}`}
                />

                <CodeBlock 
                    title="Batch Swap Handler"
                    code={`/// Handler for batch swap instruction
/// Max 10 swaps per batch with atomic execution
pub fn handler(ctx: Context<BatchSwap>, swaps: Vec<SwapParams>) -> Result<()> {
    // Validate batch size
    require!(!swaps.is_empty(), ErrorCode::EmptySwaps);
    require!(swaps.len() <= MAX_BATCH_SIZE, ErrorCode::TooManySwaps);
    
    // Validate each swap
    for (index, swap) in swaps.iter().enumerate() {
        assert_not_default(&swap.input_mint)?;
        assert_not_default(&swap.output_mint)?;
        require!(swap.amount >= MIN_SWAP_AMOUNT, ErrorCode::InvalidAmount);
        assert_different_mints(&swap.input_mint, &swap.output_mint)?;
        require!(swap.min_output_amount > 0, ErrorCode::InvalidMinOutput);
        
        msg!("Swap {}: {} tokens from {}", index + 1, swap.amount, swap.input_mint);
    }
    
    // Calculate fees with safe math
    let mut total_input_amount: u64 = 0;
    let mut total_protocol_fees: u64 = 0;
    
    for swap in &swaps {
        let fee = calculate_protocol_fee(swap.amount)?;
        total_input_amount = total_input_amount.safe_add(swap.amount)?;
        total_protocol_fees = total_protocol_fees.safe_add(fee)?;
    }
    
    // Emit event for tracking
    emit!(BatchSwapEvent {
        authority: ctx.accounts.authority.key(),
        swap_count: swaps.len() as u8,
        total_input_amount,
        total_protocol_fees,
        timestamp: Clock::get()?.unix_timestamp,
    });
    
    Ok(())
}`}
                />

                <CodeBlock 
                    title="Execute Swap with CPI"
                    code={`/// Single swap with slippage protection and fee distribution
pub fn handler(ctx: Context<ExecuteSwap>, amount: u64, min_output_amount: u64, expected_output: u64) -> Result<()> {
    // Security validations
    assert_signer(ctx.accounts.authority.as_ref())?;
    require!(amount >= MIN_SWAP_AMOUNT, ErrorCode::InvalidAmount);
    
    // Validate mints are different
    assert_different_mints(&ctx.accounts.input_token_account.mint, &ctx.accounts.output_token_account.mint)?;
    
    // Validate authority owns input account
    assert_token_account_owner(&ctx.accounts.input_token_account, ctx.accounts.authority.key())?;
    
    // Calculate protocol fee
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
    
    token::transfer(transfer_ctx, protocol_fee).map_err(|_| ErrorCode::TransferFailed)?;
    
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
                />
            </Section>

            {/* xforce-crypto-info */}
            <Section title="xforce-crypto" subtitle="News Aggregation with Python" delay={0.3}>
                <p className="text-gray-400 mb-8 font-sans">
                    RSS feed aggregation, sentiment analysis using NLTK/VADER, and PostgreSQL storage.
                </p>

                <CodeBlock 
                    title="RSS Scraper Class"
                    code={`import feedparser
import hashlib
from typing import List, Dict, Any

class RSSScraper:
    def __init__(self, source_config: Dict[str, Any]):
        self.name = source_config["name"]
        self.endpoint = source_config["endpoint"]
        self.category = source_config.get("category", "crypto")

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
                />

                <CodeBlock 
                    title="Sentiment Analysis"
                    code={`from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

class SentimentAnalyzer:
    def __init__(self):
        try:
            nltk.data.find('sentiment/vader_lexicon')
        except LookupError:
            nltk.download('vader_lexicon')
        
        self.analyzer = SentimentIntensityAnalyzer()
    
    def analyze_article(self, title: str, content: str) -> Dict[str, float]:
        """Analyze sentiment of article title and content."""
        text = f"{title}. {content}"
        scores = self.analyzer.polarity_scores(text)
        
        return {
            "sentiment_score": scores["compound"],  # -1 to +1
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
                />
            </Section>

            {/* System Architecture Overview */}
            <Section title="System Overview" subtitle="Full Stack Architecture" delay={0.4}>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <StackCard 
                        title="Backend Stack"
                        items={[
                            "Rust + Axum (HTTP server)",
                            "PostgreSQL + SQLx (database)",
                            "JWT + Argon2 (authentication)",
                            "Tokio (async runtime)",
                            "Tonic (gRPC for Geyser)"
                        ]}
                    />
                    <StackCard 
                        title="Smart Contracts"
                        items={[
                            "Anchor Framework",
                            "Batch Swap Router Program",
                            "CPI to SPL Token Program",
                            "Event emission for indexing",
                            "Program ID: HS63bw1V1q..."
                        ]}
                    />
                    <StackCard 
                        title="News Service"
                        items={[
                            "Python + feedparser (RSS)",
                            "NLTK/VADER (sentiment)",
                            "PostgreSQL (storage)",
                            "React frontend (dashboard)",
                            "10+ RSS sources aggregated"
                        ]}
                    />
                    <StackCard 
                        title="Frontend"
                        items={[
                            "React 18 + TypeScript",
                            "Tauri v2 (desktop)",
                            "Tailwind CSS (styling)",
                            "lightweight-charts (charts)",
                            "Solana Wallet Adapter"
                        ]}
                    />
                </div>

                <h3 className="text-xl font-bold text-red-400 mb-4 font-heading">Data Flow Architecture</h3>
                <pre className="bg-gray-900/80 border border-gray-800 text-gray-400 p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
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
            </Section>

            {/* Footer Link */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center mt-16"
            >
                <a
                    href="/xfterminal/docs/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-200 text-lg"
                >
                    Open Full Documentation →
                </a>
            </motion.div>
        </div>
    );
}
