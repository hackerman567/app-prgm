import { getDatabase } from '../middleware/database.js';
import { ObjectId } from 'mongodb';

export const getProgress = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const db = getDatabase();

    // Fetch tasks to calculate progress
    const totalTasks = await db.collection('tasks').countDocuments({ userId: new ObjectId(userId) });
    const completedTasks = await db.collection('tasks').countDocuments({ 
      userId: new ObjectId(userId),
      completed: true 
    });

    // Fetch latest analytics or calculate on the fly
    const analytics = await db.collection('analytics').findOne({ userId: new ObjectId(userId) });

    const progressData = {
      overallProgress: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      completedTasks,
      totalTasks,
      subjectWiseProgress: [
        // This would be aggregated from tasks in a real implementation
        { subject: 'Data Structures', progress: 75 },
        { subject: 'Operating Systems', progress: 45 },
        { subject: 'DBMS', progress: 90 },
      ],
      weeklyStats: analytics?.weeklyStats || []
    };

    res.json({ success: true, progress: progressData });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};
