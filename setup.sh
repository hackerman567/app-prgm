#!/bin/bash
# StudyFlow AI - Quick Setup Script for Linux/macOS

echo ""
echo "========================================================"
echo "  STUDYFLOW AI - Conversational Student Assistant Setup"
echo "========================================================"
echo ""

# 1. Check Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "[OK] Node.js is installed: $(node -v)"
echo ""

# 2. Install Root Dependencies
echo "Installing root dependencies..."
npm install
echo "[OK] Root dependencies installed."
echo ""

# 3. Install Backend Dependencies
echo "Installing backend dependencies..."
cd backend
npm install
if [ ! -f .env ]; then
    cat <<EOT > .env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hall-o-flow
NODE_ENV=development
JWT_SECRET=studyflow_secret_key_demo_2026
EOT
    echo "[OK] Created backend .env"
fi
cd ..
echo "[OK] Backend ready."
echo ""

# 4. Install Frontend Dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ ! -f .env.local ]; then
    cat <<EOT > .env.local
VITE_API_BASE_URL=http://localhost:5000
EOT
    echo "[OK] Created frontend .env.local"
fi
cd ..
echo "[OK] Frontend ready."
echo ""

echo "========================================================"
echo "  SETUP COMPLETE!"
echo "========================================================"
echo ""
echo "[NOTE] MongoDB is 100% OPTIONAL!"
echo "If MongoDB is not running, the backend automatically boots"
echo "into In-Memory Mock Mode with full student timetable and study data."
echo ""
echo "TO START THE APPLICATION:"
echo "  1. Start Backend:  cd backend && npm run dev"
echo "  2. Start Frontend: npm run dev"
echo ""
echo "App will be live at: http://localhost:3000"
echo "Backend API at:     http://localhost:5000"
echo ""
