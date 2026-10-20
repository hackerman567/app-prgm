import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/users.js';
import scheduleRoutes from './routes/schedule.js';
import chatRoutes from './routes/chat.js';
import analyticsRoutes from './routes/analytics.js';
import { connectDatabase } from './middleware/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Student Assistant API Routes
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/chat', chatRoutes);
app.use('/analytics', analyticsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'Student Timetable & Study Planning Assistant API Online',
    timestamp: new Date(),
    service: 'Active'
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Start server
async function start() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(` Student Assistant Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    app.listen(PORT, () => {
      console.log(` Student Assistant Server running in fallback mode on http://localhost:${PORT}`);
    });
  }
}

start();

export default app;
