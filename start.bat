@echo off
echo ========================================
echo  Starting Subscription Tracker
echo ========================================
echo.
echo Starting backend server on port 5000...
echo Starting frontend server on port 5173...
echo.
echo Press Ctrl+C to stop both servers
echo ========================================
echo.

cd backend
start cmd /k "npm run dev"

cd ..\frontend
start cmd /k "npm run dev"

echo.
echo Servers are starting in separate windows...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
pause
