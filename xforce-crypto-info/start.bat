@echo off
REM Start script for Crypto News Service
echo ========================================
echo Starting Crypto News Service...
echo ========================================
echo.

REM Check if .env file exists in news-service directory
echo [1/6] Checking configuration files...
if not exist news-service\.env (
    echo WARNING: .env file not found in news-service directory.
    echo Make sure you have configured your database connection.
    echo.
) else (
    echo [OK] Found news-service\.env
)

REM Detect Python command
echo.
echo [2/6] Detecting Python installation...
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
            echo [ERROR] Python not found!
            echo Please install Python from https://www.python.org/
            echo Or ensure Python is in your PATH.
            echo.
            pause
            exit /b 1
        )
    )
)

REM Verify Python scraper files exist
echo.
echo [3/6] Verifying Python scraper files...
if not exist news-scraper\main.py (
    echo [ERROR] news-scraper\main.py not found!
    echo The scraper cannot start without this file.
    pause
    exit /b 1
)
echo [OK] Found news-scraper\main.py

if not exist news-scraper\requirements.txt (
    echo [WARNING] news-scraper\requirements.txt not found!
    echo Dependencies may not be installed.
) else (
    echo [OK] Found news-scraper\requirements.txt
    
    REM Check if Python dependencies are installed
    echo Checking Python dependencies...
    %PYTHON_CMD% -c "import schedule" >nul 2>&1
    if errorlevel 1 (
        echo [WARNING] Python dependencies not installed!
        echo Installing Python dependencies from requirements.txt...
        %PYTHON_CMD% -m pip install -r news-scraper\requirements.txt
        if errorlevel 1 (
            echo [ERROR] Failed to install Python dependencies!
            echo Please install them manually: %PYTHON_CMD% -m pip install -r news-scraper\requirements.txt
            echo.
        ) else (
            echo [OK] Python dependencies installed successfully
        )
    ) else (
        echo [OK] Python dependencies are installed
    )
)

REM Check if .env exists in news-scraper directory
if not exist news-scraper\.env (
    echo [WARNING] news-scraper\.env not found!
    echo.
    echo Attempting to create .env file from news-service\.env...
    if exist news-service\.env (
        REM Copy the entire .env file (it should have DATABASE_URL)
        copy /Y news-service\.env news-scraper\.env >nul 2>&1
        if exist news-scraper\.env (
            echo [OK] Created news-scraper\.env by copying from news-service\.env
            echo [INFO] You may need to add NEWSAPI_KEY and CRYPTOCOMPARE_API_KEY if needed
        ) else (
            echo [ERROR] Failed to copy .env file!
            goto :env_error
        )
    ) else (
        :env_error
        echo [ERROR] Could not create news-scraper\.env automatically!
        echo.
        echo Please create news-scraper\.env manually with the following content:
        echo DATABASE_URL=postgresql://username:password@localhost:5432/news_db
        echo NEWSAPI_KEY=your_api_key_here
        echo CRYPTOCOMPARE_API_KEY=your_api_key_here
        echo SCRAPE_INTERVAL_MINUTES=15
        echo.
        echo You can copy the DATABASE_URL from news-service\.env if it exists.
        echo.
        pause
        exit /b 1
    )
) else (
    echo [OK] Found news-scraper\.env
)

REM Change to news-service directory for wasm-pack build
echo.
echo [4/6] Building frontend WASM for hydration...
cd /d news-service
if errorlevel 1 (
    echo [ERROR] Failed to change to news-service directory!
    pause
    exit /b 1
)

echo (This may take a moment on first run, but will be faster on subsequent runs)
wasm-pack build --target=web --debug --no-default-features --features=hydrate
if errorlevel 1 (
    echo.
    echo [WARNING] Frontend WASM build failed or wasm-pack not found.
    echo Server will still run, but hydration may not work.
    echo To enable full hydration, install wasm-pack: cargo install wasm-pack
    echo Continuing with server startup...
    echo.
) else (
    REM Copy WASM files to target/site/pkg for serving
    echo Copying WASM files to target/site/pkg...
    
    REM Check if pkg directory exists (created by wasm-pack)
    if not exist pkg (
        echo [WARNING] pkg directory not found! wasm-pack may have failed.
        echo Continuing anyway, but WASM files may not be available.
    ) else (
        REM Ensure target/site directory exists
        if not exist target (
            mkdir target
        )
        if not exist target\site (
            mkdir target\site
            if errorlevel 1 (
                echo [WARNING] Failed to create target\site directory
            )
        )
        if not exist target\site\pkg (
            mkdir target\site\pkg
            if errorlevel 1 (
                echo [WARNING] Failed to create target\site\pkg directory
            ) else (
                echo [OK] Created target\site\pkg directory
            )
        )
        
        REM Copy files and verify
        echo Copying from pkg\ to target\site\pkg\...
        copy /Y pkg\*.* target\site\pkg\
        if errorlevel 1 (
            echo [WARNING] Failed to copy WASM files to target/site/pkg
        ) else (
            REM Verify files were copied
            if exist target\site\pkg\news_service.js (
                echo [OK] WASM files ready for serving.
                echo [DEBUG] Verified: news_service.js exists in target\site\pkg\
            ) else (
                echo [WARNING] Files copied but news_service.js not found!
            )
        )
    )
)

REM Go back to workspace root
cd /d ..
if errorlevel 1 (
    echo [ERROR] Failed to return to workspace root!
    pause
    exit /b 1
)

REM Start the Python scraper in a new window
echo.
echo [5/6] Starting Python web scraper in a new window...
echo Scraper will run from: %CD%\news-scraper
echo Using Python command: %PYTHON_CMD%

REM Get absolute path to news-scraper directory
set SCRAPER_DIR=%CD%\news-scraper
if not exist "%SCRAPER_DIR%\main.py" (
    echo [ERROR] Cannot find main.py in %SCRAPER_DIR%
    pause
    exit /b 1
)

REM Start scraper with proper working directory and error handling
REM Use start /D to set the working directory for the new window
start "Crypto News Scraper" /D "%SCRAPER_DIR%" cmd /k "echo [DEBUG] Working directory: %CD% && echo [DEBUG] Running: %PYTHON_CMD% main.py && %PYTHON_CMD% main.py && if errorlevel 1 (echo. && echo [ERROR] Python scraper failed to start! && echo Check the error messages above. && pause)"
if errorlevel 1 (
    echo [ERROR] Failed to start Python scraper window!
    pause
    exit /b 1
)
echo [OK] Python scraper window started

REM Start the server in a new window
echo.
echo [6/6] Starting backend server in a new window...
echo Service will be available at http://127.0.0.1:3003
start "Crypto News Service Server" cmd /k "cargo run -p news-service --bin news-service-server --features ssr --no-default-features"
if errorlevel 1 (
    echo [ERROR] Failed to start server window!
    pause
    exit /b 1
)
echo [OK] Server window started

REM Wait a few seconds for the server to start
echo.
echo Waiting for server to start...
timeout /t 8 /nobreak >nul

REM Open the website in the default browser
echo Opening website in browser...
start http://127.0.0.1:3003

echo.
echo ========================================
echo Startup complete!
echo ========================================
echo.
echo Server and scraper are running in separate windows.
echo - Check the "Crypto News Scraper" window for scraper output
echo - Check the "Crypto News Service Server" window for server output
echo - Browser should open automatically at http://127.0.0.1:3003
echo.
echo Close this window or press any key to exit this script
echo (server and scraper will keep running in their own windows).
echo.
pause
