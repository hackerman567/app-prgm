@echo off
REM StudyFlow AI - Quick Setup Script for Windows

echo.
echo ========================================================
echo   STUDYFLOW AI - Conversational Student Assistant Setup
echo ========================================================
echo.

REM 1. Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js (v18+) from https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js is installed:
node --version
echo.

REM 2. Install Root Dependencies
echo Installing root dependencies...
call npm install
echo [OK] Root dependencies installed.
echo.

REM 3. Install Backend Dependencies
echo Installing backend dependencies...
cd backend
call npm install
if not exist ".env" (
    echo Creating backend .env file...
    echo PORT=5000 > .env
    echo MONGODB_URI=mongodb://localhost:27017/hall-o-flow >> .env
    echo NODE_ENV=development >> .env
    echo JWT_SECRET=studyflow_secret_key_demo_2026 >> .env
    echo [OK] Created backend .env
)
cd ..
echo [OK] Backend ready.
echo.

REM 4. Install Frontend Dependencies
echo Installing frontend dependencies...
cd frontend
call npm install
if not exist ".env.local" (
    echo Creating frontend .env.local file...
    echo VITE_API_BASE_URL=http://localhost:5000 > .env.local
    echo [OK] Created frontend .env.local
)
cd ..
echo [OK] Frontend ready.
echo.

echo ========================================================
echo   SETUP COMPLETE!
echo ========================================================
echo.
echo [NOTE] MongoDB is 100% OPTIONAL!
echo If MongoDB is not running, the backend automatically boots
echo into In-Memory Mock Mode with full student timetable and study data.
echo.
echo TO START THE APPLICATION:
echo   1. Start Backend:
echo      cd backend ^&^& npm run dev
echo.
echo   2. Start Frontend (in a new terminal):
echo      npm run dev
echo.
echo App will be live at: http://localhost:3000
echo Backend API at:     http://localhost:5000
echo.
pause
