@echo off
echo ========================================
echo  Subscription Tracker - Setup Script
echo ========================================
echo.

echo [1/4] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo [2/4] Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo [3/4] Setting up environment files...
if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo Created backend\.env - Please edit with your credentials
) else (
    echo backend\.env already exists
)

if not exist frontend\.env (
    copy frontend\.env.example frontend\.env
    echo Created frontend\.env - Please edit with your credentials
) else (
    echo frontend\.env already exists
)

echo.
echo [4/4] Installation complete!
echo.
echo ========================================
echo  Next Steps:
echo ========================================
echo 1. Edit backend\.env with your MongoDB URI and Google OAuth credentials
echo 2. Edit frontend\.env with your Google Client ID
echo 3. Start MongoDB (if using local installation)
echo 4. Run 'npm run dev' from the root directory to start both servers
echo.
echo For detailed instructions, see README.md or QUICKSTART.md
echo ========================================
pause
