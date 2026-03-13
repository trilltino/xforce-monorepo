@echo off
REM XForce Terminal - Desktop Application Starter
echo ============================================================
echo   XForce Terminal - Desktop Application
echo ============================================================
echo.

REM Check if Rust/Cargo is available
where cargo >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Cargo not found! Please install Rust from https://rustup.rs/
    pause
    exit /b 1
)

REM Check if Node.js is available
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js not found! Please install Node.js 18+
    pause
    exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: npm not found! Please install Node.js 18+
    pause
    exit /b 1
)

REM Navigate to the Tauri project directory
echo [1/3] Checking Tauri project structure...
cd /d "%~dp0xforce-terminal\terminal-tauri"
if errorlevel 1 (
    echo ERROR: Cannot find xforce-terminal\terminal-tauri directory!
    pause
    exit /b 1
)

REM Check if src-ui directory exists
if not exist src-ui (
    echo ERROR: src-ui directory not found in terminal-tauri!
    echo Make sure you are in the correct directory.
    pause
    exit /b 1
)

REM Install npm dependencies if needed
echo.
echo [2/3] Checking npm dependencies...
cd /d "%~dp0xforce-terminal\terminal-tauri\src-ui"
if not exist node_modules (
    echo Installing npm dependencies... (this may take a few minutes)
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: npm install failed!
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed
) else (
    echo [OK] Dependencies already installed
)

REM Start the news service
echo [3/5] Launching news service...
where wt >nul 2>nul
if %ERRORLEVEL% equ 0 (
    wt -w 0 nt -d "%~dp0xforce-crypto-info\news-service" --title "News Service" cmd /k "cargo run"
) else (
    start /b cmd /c "cd /d "%~dp0xforce-crypto-info\news-service" && cargo run"
)

REM Start the backend API server
echo [4/5] Launching backend API server...
where wt >nul 2>nul
if %ERRORLEVEL% equ 0 (
    wt -w 0 nt -d "%~dp0xforce-terminal\backend" --title "Backend API" cmd /k "cargo run"
) else (
    start /b cmd /c "cd /d "%~dp0xforce-terminal\backend" && cargo run"
)

REM Go back to terminal-tauri root and start Tauri
cd /d "%~dp0xforce-terminal\terminal-tauri"
echo.
echo [5/5] Starting XForce Terminal with Tauri...
echo.
echo The desktop application will launch in a new window.
echo Close the Tauri window to stop the application.
echo.
REM Start Tauri in development mode
cargo tauri dev

if errorlevel 1 (
    echo.
    echo ERROR: Tauri failed to start!
    echo Make sure you have all prerequisites installed:
    echo - Rust 1.70+
    echo - Node.js 18+
    echo - Tauri CLI: cargo install tauri-cli
    echo - System dependencies (WebView2 on Windows)
    echo.
    pause
    exit /b 1
)
