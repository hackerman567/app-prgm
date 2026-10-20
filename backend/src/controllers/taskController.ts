import { getDatabase } from '../middleware/database.js';
import { ObjectId } from 'mongodb';

export const createTask = async (req: any, res: any) => {
  try {
    const { title, description, duration, type, mood, userId, priority, tags } = req.body;
    const db = getDatabase();
    
    const task = {
      title,
      description,
      duration,
      type, // 'focus' | 'break' | 'review'
      mood,
      userId: new ObjectId(userId),
      completed: false,
      priority: priority || 1,
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('tasks').insertOne(task);
    
    res.status(201).json({ success: true, taskId: result.insertedId, task });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

export const getTasks = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const db = getDatabase();
    
    const tasks = await db.collection('tasks')
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();
      
    res.json({ tasks });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

export const updateTask = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const db = getDatabase();
    
    if (updates.userId) updates.userId = new ObjectId(updates.userId);
    updates.updatedAt = new Date();
    
    const result = await db.collection('tasks').updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

export const deleteTask = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    
    const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};
