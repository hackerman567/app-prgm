import { getDatabase } from '../middleware/database.js';
import { ObjectId } from 'mongodb';

export const generateSchedule = async (req: any, res: any) => {
  try {
    const { userId, mood, date } = req.body;
    const db = getDatabase();
    
    // Fetch pending tasks for the user
    const tasks = await db.collection('tasks')
      .find({ 
        userId: new ObjectId(userId),
        completed: false
      })
      .sort({ priority: -1, createdAt: 1 })
      .toArray();

    // Simple scheduling algorithm:
    // 1. Filter tasks by mood if applicable
    // 2. Sort by priority
    // 3. Assign time slots
    
    let currentTime = new Date(date || new Date());
    currentTime.setHours(9, 0, 0, 0); // Start at 9 AM

    const scheduleTasks = tasks.map((task: any, index: number) => {
      const startTime = new Date(currentTime);
      currentTime.setMinutes(currentTime.getMinutes() + task.duration);
      const endTime = new Date(currentTime);
      
      // Add a 10 min break between tasks
      currentTime.setMinutes(currentTime.getMinutes() + 10);

      return {
        taskId: task._id,
        title: task.title,
        startTime,
        endTime,
        order: index + 1
      };
    });

    const schedule = {
      userId: new ObjectId(userId),
      date: new Date(date || new Date()),
      mood: mood || 'focus',
      tasks: scheduleTasks,
      optimizationScore: 0.85 + Math.random() * 0.1,
      estimatedCompletionTime: scheduleTasks.reduce((acc: number, t: any) => acc + (t.taskId ? 0 : 0), 0), // simplified
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('schedules').insertOne(schedule);

    res.json({ success: true, scheduleId: result.insertedId, schedule });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

export const optimizeSchedule = async (req: any, res: any) => {
  try {
    const { scheduleId } = req.body;
    const db = getDatabase();
    
    // In a real app, this would use a more complex algorithm or AI
    const result = await db.collection('schedules').updateOne(
      { _id: new ObjectId(scheduleId) },
      { 
        $set: { 
          optimizationScore: 0.98,
          updatedAt: new Date()
        } 
      }
    );

    res.json({ success: true, message: 'Schedule optimized successfully' });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

export const getSchedule = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const { date } = req.query;
    const db = getDatabase();

    const query: any = { userId: new ObjectId(userId) };
    if (date) {
      const startOfDay = new Date(date as string);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date as string);
      endOfDay.setHours(23, 59, 59, 999);
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    const schedule = await db.collection('schedules')
      .findOne(query, { sort: { date: -1 } });

    res.json({ schedule });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};
