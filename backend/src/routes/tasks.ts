import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

// Create a new task
router.post('/', taskController.createTask);

// Get all tasks for a user
router.get('/user/:userId', taskController.getTasks);

// Update a task
router.put('/:id', taskController.updateTask);

// Delete a task
router.delete('/:id', taskController.deleteTask);

export default router;
