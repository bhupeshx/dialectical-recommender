@echo off
echo ========================================
echo Dialectical Recommender Setup
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js found
echo.

echo [2/4] Installing dashboard dependencies...
cd dashboard
if exist package.json (
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
    echo ✓ Dependencies installed
) else (
    echo ERROR: package.json not found in dashboard folder
    pause
    exit /b 1
)
cd ..
echo.

echo [3/4] Chrome Extension location:
echo %cd%\extension
echo.
echo To install the extension:
echo 1. Open Chrome and go to: chrome://extensions/
echo 2. Enable "Developer Mode" (toggle in top-right)
echo 3. Click "Load unpacked"
echo 4. Select this folder: %cd%\extension
echo.

echo [4/4] Starting dashboard...
echo Dashboard will open at: http://localhost:3000
echo.
cd dashboard
start cmd /k "npm start"
cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Install Chrome extension (see instructions above)
echo 2. Browse YouTube/Twitter/Reddit normally
echo 3. View your data at: http://localhost:3000
echo.
pause