@echo off
REM XForce Crypto Info - News Service Starter
echo ========================================
echo Starting Crypto News Service...
echo ========================================
echo.

REM Check if Rust/Cargo is available
where cargo >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Cargo not found! Please install Rust from https://rustup.rs/
    pause
    exit /b 1
)

REM Check if Python is available
set PYTHON_CMD=
where py >nul 2>&1
if %errorlevel% == 0 (
    set PYTHON_CMD=py
    echo [OK] Found Python launcher: py
) else (
    where python >nul 2>&1
    if %errorlevel% == 0 (
        set PYTHON_CMD=python
        echo [OK] Found Python: python
    ) else (
        where python3 >nul 2>&1
        if %errorlevel% == 0 (
            set PYTHON_CMD=python3
            echo [OK] Found Python: python3
        ) else (
            echo ERROR: Python not found!
            echo Please install Python 3.9+ from https://www.python.org/
            echo Or ensure Python is in your PATH.
            echo.
            pause
            exit /b 1
        )
    )
)

REM Navigate to crypto info directory
echo.
echo [1/5] Checking project structure...
cd /d "%~dp0xforce-crypto-info"
if errorlevel 1 (
    echo ERROR: Cannot find xforce-crypto-info directory!
    pause
    exit /b 1
)

REM Check for required directories
if not exist news-scraper (
    echo ERROR: news-scraper directory not found!
    pause
    exit /b 1
)

if not exist news-service (
    echo ERROR: news-service directory not found!
    echo The Rust backend is missing.
    pause
    exit /b 1
)

if not exist news-web (
    echo ERROR: news-web directory not found!
    pause
    exit /b 1
)

REM Check Python dependencies
echo.
echo [2/5] Checking Python scraper dependencies...
if exist "%~dp0xforce-crypto-info\news-scraper\requirements.txt" (
    %PYTHON_CMD% -c "import schedule" >nul 2>&1
    if errorlevel 1 (
        echo Installing Python dependencies...
        %PYTHON_CMD% -m pip install -r "%~dp0xforce-crypto-info\news-scraper\requirements.txt"
        if errorlevel 1 (
            echo.
            echo ERROR: Failed to install Python dependencies!
            echo Please install them manually: %PYTHON_CMD% -m pip install -r news-scraper\requirements.txt
            echo.
            pause
            exit /b 1
        )
        echo [OK] Python dependencies installed
    ) else (
        echo [OK] Python dependencies are installed
    )
) else (
    echo WARNING: requirements.txt not found in news-scraper
)

REM Check for .env configuration
echo.
echo [3/5] Checking configuration...
if not exist "%~dp0xforce-crypto-info\news-service\.env" (
    echo WARNING: news-service\.env not found!
    echo The service may not start without database configuration.
    echo Please create news-service\.env with DATABASE_URL and other settings.
    echo.
    choice /C YN /M "Continue anyway"
    if errorlevel 2 goto :skip_start
)

:skip_start

REM Build WASM frontend if needed
echo.
echo [4/5] Building frontend WASM (if needed)...
cd /d "%~dp0xforce-crypto-info\news-service"
if errorlevel 1 (
    echo ERROR: Cannot enter news-service directory!
    pause
    exit /b 1
)

where wasm-pack >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Building WASM with wasm-pack...
    wasm-pack build --target=web --debug --no-default-features --features=hydrate
    if errorlevel 1 (
        echo WARNING: WASM build failed. Server will still run but hydration may not work.
    ) else (
        echo [OK] WASM built successfully
    )
) else (
    echo WARNING: wasm-pack not found. Skipping WASM build.
    echo Install with: cargo install wasm-pack
)

REM Go back to project root
cd /d "%~dp0xforce-crypto-info"

REM Start services
echo.
echo [5/5] Starting services...
echo.
echo The following windows will open:
echo   1. Python News Scraper (collects news from RSS/APIs)
echo   2. Rust Backend Server (serves API and frontend)
echo.
echo The web interface will open automatically in your browser.
echo.
echo Press any key to start services...
pause

REM Start Python scraper
echo Launching news scraper...
where wt >nul 2>nul
if %ERRORLEVEL% equ 0 (
    wt -w 0 nt -d "%~dp0xforce-crypto-info\news-scraper" --title "Scraper" cmd /k "%PYTHON_CMD% main.py"
) else (
    start /b cmd /c "cd /d "%~dp0xforce-crypto-info\news-scraper" && %PYTHON_CMD% main.py"
)
if errorlevel 1 (
    echo WARNING: Failed to start scraper window
)

REM Small delay before starting server
timeout /t 3 /nobreak >nul

REM Start Rust backend server
echo Launching news server...
where wt >nul 2>nul
if %ERRORLEVEL% equ 0 (
    wt -w 0 nt -d "%~dp0xforce-crypto-info\news-service" --title "News Server" cmd /k "cargo run -p news-service --bin news-service-server --features ssr --no-default-features"
) else (
    start /b cmd /c "cd /d "%~dp0xforce-crypto-info\news-service" && cargo run -p news-service --bin news-service-server --features ssr --no-default-features"
)
if errorlevel 1 (
    echo ERROR: Failed to start server!
    pause
    exit /b 1
)

REM Wait for server to initialize
echo.
echo Waiting for server to start...
timeout /t 8 /nobreak >nul

REM Open browser to the service
echo Opening web interface...
start http://127.0.0.1:3003

echo.
echo ========================================
echo Startup complete!
echo ========================================
echo.
echo Services are running in separate windows:
echo - Check "Crypto News Scraper" for scraper output
echo - Check "Crypto News Server" for server output
echo - Browser should open at http://127.0.0.1:3003
echo.
echo Close this window or press any key to exit this script
echo (services will keep running in their own windows).
echo.
pause
