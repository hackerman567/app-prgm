import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  name: string;
  roll_no: string;
  email: string;
  password: string;
  dept: string;
  batch?: string;
  timezone?: string;
  preferredMood?: string;
  focusHours?: { start: string; end: string };
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  _id?: ObjectId;
  title: string;
  description: string;
  userId: ObjectId;
  duration: number; // in minutes
  type: 'focus' | 'break' | 'review';
  mood: string;
  completed: boolean;
  completedAt?: Date;
  priority: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduleEntry {
  taskId?: ObjectId;
  subject?: string;
  faculty?: string;
  room?: string;
  startTime: Date | string;
  endTime: Date | string;
  order: number;
}

export interface Schedule {
  _id?: ObjectId;
  userId: ObjectId;
  date: Date;
  mood: string;
  tasks: ScheduleEntry[];
  optimizationScore: number;
  estimatedCompletionTime: number;
  actualCompletionTime?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Analytics {
  _id?: ObjectId;
  userId: ObjectId;
  focusScore: number;
  completionRate: number;
  avgTaskDuration: number;
  preferredFocusHour: number;
  totalTasksCompleted: number;
  weeklyStats: {
    day: string;
    tasksCompleted: number;
    totalDuration: number;
  }[];
  updatedAt: Date;
}
