import express from 'express';
import * as scheduleController from '../controllers/scheduleController.js';

const router = express.Router();

// Generate schedule
router.post('/generate', scheduleController.generateSchedule);

// Optimize schedule
router.post('/optimize', scheduleController.optimizeSchedule);

// Get schedule for a user
router.get('/:userId', scheduleController.getSchedule);

export default router;
