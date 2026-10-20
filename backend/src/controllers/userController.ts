import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../middleware/database.js';
import { ObjectId } from 'mongodb';

export const registerUser = async (req: any, res: any) => {
  try {
    const { email, password, name, roll_no, dept } = req.body;
    const db = getDatabase();
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = {
      email,
      password: hashedPassword,
      name,
      roll_no,
      dept,
      timezone: 'Asia/Kolkata',
      preferredMood: 'focus',
      focusHours: { start: '09:00', end: '18:00' },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('users').insertOne(user);
    
    res.status(201).json({ 
      success: true, 
      message: 'Registration successful',
      userId: result.insertedId 
    });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

export const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const db = getDatabase();

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Account not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_in_production',
      { expiresIn: '24h' }
    );

    res.json({ 
      success: true, 
      token, 
      user: { 
        id: user._id,
        name: user.name, 
        roll_no: user.roll_no,
        dept: user.dept 
      } 
    });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

export const getUserProfile = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const db = getDatabase();

    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove password before sending
    const { password, ...userProfile } = user;
    res.json({ user: userProfile });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

export const updateUserProfile = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    const db = getDatabase();

    updates.updatedAt = new Date();
    
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};
