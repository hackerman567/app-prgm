import express from 'express';
import * as analyticsController from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/:userId', analyticsController.getProgress);

export default router;
