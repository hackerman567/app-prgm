# Backend Setup

## Installation

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hall-o-flow
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
```

## Database Setup

### Option 1: Local MongoDB

```bash
# Install MongoDB if not already installed
# macOS with Homebrew:
brew install mongodb-community
brew services start mongodb-community

# Windows: Download and install from https://www.mongodb.com/try/download/community
```

### Option 2: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string and update `MONGODB_URI` in `.env`

## Running the Server

```bash
# Development with hot reload
npm run dev

# Production build
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server status

### Users
- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `GET /users/:userId` - Get user profile
- `PUT /users/:userId` - Update user profile

### Tasks
- `POST /tasks` - Create new task
- `GET /tasks/user/:userId` - Get user's tasks
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Schedule
- `POST /schedule/generate` - Generate optimized schedule
- `POST /schedule/optimize` - Optimize existing schedule

## Architecture

```
backend/
├── src/
│   ├── index.ts              # Main server file
│   ├── controllers/          # Business logic
│   ├── routes/              # API endpoints
│   ├── models/              # Data models (MongoDB)
│   └── middleware/          # Express middleware
├── package.json
├── tsconfig.json
└── .env
```

## Technologies

- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **TypeScript**: Type-safe development
- **JWT**: Authentication
- **CORS**: Cross-origin requests
