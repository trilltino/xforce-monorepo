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

export default function BackendDetails() {
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
                    <span className="text-white">-terminal</span>
                </h1>
                <p className="text-xl text-gray-400 font-sans">
                    Rust Backend API with Axum
                </p>
            </motion.div>

            {/* Overview */}
            <Section title="What is this?" delay={0.1}>
                <p className="text-gray-300 text-lg mb-4 font-sans leading-relaxed">
                    The backend is like the <strong className="text-red-400">waiter</strong> at a restaurant. You (the user) tell the waiter what you want, and they go get it from the kitchen (the blockchain). The backend handles authentication, stores data in a database, and manages real-time price feeds through WebSockets.
                </p>
                <p className="text-gray-400 font-sans">
                    Built with <strong className="text-white">Axum</strong> (a Rust web framework), it uses modular library crates for authentication, core models, Solana integration, and web handlers.
                </p>
            </Section>

            {/* Server Setup */}
            <Section title="Server Setup" subtitle="How the server starts up" delay={0.2}>
                <CodeBlock 
                    title="main.rs - The Entry Point"
                    explanation="This is like turning on the restaurant's lights and opening the doors. The server initializes the database connection, loads configuration, and starts listening for requests on port 3001. The migrations_path tells it where to find database schema updates."
                    language="rust"
                    code={`//! Backend API server entry point

use lib_web::{start_server, ServerConfig};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Load environment variables (like database passwords)
    dotenvy::dotenv().ok();

    // Find where database migrations are stored
    let migrations_path = std::env::var("MIGRATIONS_PATH")
        .unwrap_or_else(|_| "migrations".to_string());

    // Start the server with configuration
    start_server(ServerConfig {
        bind_address: "127.0.0.1:3001".to_string(),
        migrations_path: Box::leak(migrations_path.into_boxed_str()),
        ..Default::default()
    }).await
}`}
                />
            </Section>

            {/* WebSocket Handler */}
            <Section title="Real-time Prices" subtitle="WebSocket Handler" delay={0.3}>
                <CodeBlock 
                    title="WebSocket Handler — Streaming Live Prices"
                    explanation="WebSockets are like having a direct phone line. Instead of repeatedly asking 'what's the price?' every second, the server just calls you whenever the price changes. This is much faster and uses less resources than constantly polling."
                    language="rust"
                    code={`//! WebSocket handler for price streaming
//! Route: GET /api/ws/prices

pub async fn price_stream_websocket(
    ws: WebSocketUpgrade,
    headers: HeaderMap,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    State(price_stream): State<Arc<PriceStreamServer>>,
) -> Response {
    // Generate a unique ID for this connection
    let client_id = Uuid::new_v4().to_string();
    
    // Get the client's IP address (for logging)
    let client_ip = headers
        .get("x-forwarded-for")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.split(',').next().unwrap_or("").trim().to_string())
        .or_else(|| Some(addr.ip().to_string()));
    
    // Subscribe to the price stream
    let price_rx = price_stream.subscribe();
    
    // Upgrade to WebSocket and start streaming
    ws.on_upgrade(move |socket| async move {
        handle_price_websocket(socket, price_rx, client_id, client_ip, None).await;
    })
    .into_response()
}`}
                />
            </Section>

            {/* Authentication */}
            <Section title="User Authentication" subtitle="Signup & Login Handler" delay={0.4}>
                <CodeBlock 
                    title="Signup Handler — Creating New Accounts"
                    explanation="This is like registering for a gym membership. We check that your username is long enough (at least 3 characters), your email looks valid (has an @ symbol), then we hash your password (scramble it so even we can't read it) and store everything safely in the database. Finally, we give you a JWT token — think of it as a membership card you show to prove who you are."
                    language="rust"
                    code={`/// Signup handler - creates a new user account
#[instrument(skip(pool, config))]
pub async fn signup(
    State(pool): State<DbPool>,
    State(config): State<Config>,
    Json(req): Json<SignupRequest>,
) -> Result<(StatusCode, Json<AuthResponse>), (StatusCode, Json<ErrorResponse>)> {
    info!("[SIGNUP] NEW USER SIGNUP REQUEST");

    // Validation: Username must be at least 3 characters
    if req.username.len() < 3 {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: "Username must be at least 3 characters".to_string(),
            }),
        ));
    }

    // Validation: Email must contain @
    if !req.email.contains('@') {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: "Invalid email format".to_string(),
            }),
        ));
    }

    // Hash the password (scramble it securely)
    let password_hash = hash_password(&req.password)?;
    
    // Save user to database
    let user = UserRepository::create(&pool, &req, &password_hash).await?;
    
    // Create JWT token (digital membership card)
    let token = encode_jwt(&user, &config.jwt_secret, config.jwt_max_age)?;
    let wallet_setup_token = generate_wallet_setup_token(&user.id.to_string(), &config)?;
    
    // Return the token to the user
    Ok((StatusCode::CREATED, Json(AuthResponse {
        token,
        wallet_setup_token: Some(wallet_setup_token),
        user: UserInfo::from(user),
    })))
}`}
                />
            </Section>

            {/* Router Setup */}
            <Section title="API Routes" subtitle="Router Setup with Middleware" delay={0.5}>
                <CodeBlock 
                    title="create_router — Defining All API Endpoints"
                    explanation="This is like the restaurant menu + kitchen layout. We define what URLs people can visit (/api/auth/signup, /api/market/prices, etc.) and what middleware runs on every request (CORS for security, logging to track requests). The router connects URLs to the functions that handle them."
                    language="rust"
                    code={`fn create_router(state: AppState, allowed_origins: Vec<String>) -> Router {
    // Parse allowed website origins for CORS (security)
    let origins: Vec<HeaderValue> = allowed_origins
        .iter()
        .filter_map(|origin| origin.parse().ok())
        .collect();

    // CORS middleware - controls which websites can access our API
    let cors = CorsLayer::new()
        .allow_origin(origins)
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::OPTIONS])
        .allow_headers([CONTENT_TYPE, AUTHORIZATION]);

    // Define all routes
    Router::new()
        // Authentication routes
        .route("/api/auth/signup", post(handlers::auth::signup))
        .route("/api/auth/login", post(handlers::auth::login))
        // Market data routes
        .route("/api/market/prices", get(handlers::market::get_prices))
        // WebSocket route for real-time prices
        .route("/api/ws/prices", get(handlers::websocket::price_stream_websocket))
        // Swap routes
        .route("/api/swap/quote", get(handlers::swap::get_swap_quote))
        .route("/api/swap/execute", post(handlers::swap::execute_swap))
        // Add shared state (database connection, etc.)
        .with_state(state)
        // Middleware layers
        .layer(middleware::from_fn(stamp_req))      // Add request timestamp
        .layer(middleware::from_fn(log_requests))  // Log all requests
        .layer(cors)                                 // CORS security
}`}
                />
            </Section>

            {/* Navigation */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-between items-center mt-12 pt-8 border-t border-gray-800"
            >
                <Link to="/architecture" className="text-gray-400 hover:text-red-400 transition-colors">
                    ← Back to Architecture Overview
                </Link>
                <Link to="/architecture/contracts" className="text-red-400 hover:text-red-300 transition-colors">
                    Next: Smart Contracts →
                </Link>
            </motion.div>
        </div>
    );
}
