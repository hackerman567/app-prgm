# Quick Start Guide

## 🚀 Quickest Way (Using Docker)

```bash
# Make sure Docker is installed and running
docker-compose up
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000  
- Frontend on port 3000

## 📦 Manual Setup

### Prerequisites
- Node.js 18+
- MongoDB 6.0+ (or use Docker)
- npm/yarn

### Step 1: Run Setup Script

**macOS/Linux:**
```bash
bash setup.sh
```

**Windows:**
```bash
setup.bat
```

### Step 2: Start MongoDB

**Option A - Local Installation:**
```bash
# macOS
brew services start mongodb-community

# Windows
mongod --dbpath "C:\Program Files\MongoDB\Server\6.0\data"

# Linux
sudo systemctl start mongod
```

**Option B - Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### Step 3: Start Backend

```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

### Step 4: Start Frontend

```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

## ✅ Verify Setup

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/health
   ```
   Expected response: `{"status":"API running","timestamp":"..."}`

2. **Frontend:** Open http://localhost:3000 in your browser

3. **MongoDB Connection:**
   ```bash
   mongosh
   > use hall-o-flow
   > db.collections()
   ```

## 📝 Initial Data

The database is created automatically. You can:

1. Register a new user at the app
2. Create tasks and schedules through the API
3. Run seed script (if available):
   ```bash
   cd backend && npm run seed
   ```

## 🛠 Configuration

### Backend (`.env`)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hall-o-flow
NODE_ENV=development
JWT_SECRET=change_this_in_production
```

### Frontend (`.env.local`)
```
VITE_API_BASE_URL=http://localhost:5000
GEMINI_API_KEY=your_api_key_if_needed
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `mongosh`
- Check MONGODB_URI in `.env`
- For Docker: `docker ps` to verify container

### Port Already in Use
```bash
# Find process using port
# macOS/Linux:
lsof -i :5000
lsof -i :3000

# Windows:
netstat -ano | findstr :5000

# Kill process (then restart service)
```

### CORS Errors
- Make sure backend is running
- Check VITE_API_BASE_URL in frontend .env.local
- Verify backend CORS is enabled

### Modules Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Useful Commands

```bash
# Backend
npm run dev       # Start with hot reload
npm run build     # Build TypeScript
npm start         # Run built version

# Frontend
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build

# Docker
docker-compose up              # Start all services
docker-compose down            # Stop all services
docker-compose logs -f backend # Follow backend logs
```

## 🌐 API Documentation

See `backend/README.md` for full API documentation.

## 🎨 UI Customization

- Change theme: Click the theme toggle in navbar
- Edit styles: Modify Tailwind config in `frontend/index.html`
- Add components: Create new React components in `frontend/components/`

## 📱 Testing

### Test Create Task
```bash
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Task",
    "description": "Test task",
    "duration": 45,
    "type": "focus",
    "mood": "focus",
    "userId": "test-user-123"
  }'
```

### Test Generate Schedule
```bash
curl -X POST http://localhost:5000/schedule/generate \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user-123",
    "mood": "focus",
    "date": "2024-05-03"
  }'
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy `dist` folder to Vercel
```

### Backend (Railway/Render)
```bash
# Set environment variables in platform
# Deploy git repo to Railway/Render
```

### Database (MongoDB Atlas)
1. Create cluster at https://cloud.mongodb.com
2. Update MONGODB_URI in backend `.env`
3. Add IP whitelist

## 📞 Need Help?

1. Check README files in each folder
2. Review API endpoints documentation
3. Check browser console for frontend errors
4. Check backend logs for API errors

---

**Happy scheduling! 🎯**
