import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Register
router.post('/register', userController.registerUser);

// Login
router.post('/login', userController.loginUser);

// Get user profile
router.get('/:userId', userController.getUserProfile);

// Update user profile
router.put('/:userId', userController.updateUserProfile);

export default router;
