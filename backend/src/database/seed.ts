import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hall-o-flow';
const DB_NAME = 'hall-o-flow';

const hashedPassword = bcrypt.hashSync('password123', 10);

const sampleUsers = [
  {
    name: 'Ram Malhotra',
    email: 'ram@example.com',
    password: hashedPassword,
    timezone: 'Asia/Kolkata',
    preferredMood: 'focus',
    focusHours: { start: '09:00', end: '18:00' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Sarah',
    email: 'sarah@example.com',
    password: hashedPassword,
    timezone: 'UTC',
    preferredMood: 'creative',
    focusHours: { start: '10:00', end: '19:00' },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const sampleTasks = (userId: any) => [
  {
    title: 'Morning Mediatation',
    description: '10 minutes of mindfulness',
    userId,
    duration: 10,
    type: 'break',
    mood: 'recovery',
    completed: false,
    priority: 1,
    tags: ['health', 'morning'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Deep Work: Project Hall-o-Flow',
    description: 'Implementation of AI scheduler core logic',
    userId,
    duration: 90,
    type: 'focus',
    mood: 'focus',
    completed: false,
    priority: 3,
    tags: ['coding', 'ai'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Email Review',
    description: 'Clear inbox and reply to urgent matters',
    userId,
    duration: 30,
    type: 'review',
    mood: 'maintenance',
    completed: false,
    priority: 2,
    tags: ['admin'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function migrateDatabase(db: any) {
  try {
    console.log('🔄 Starting database migration...');
    
    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c: any) => c.name);

    const requiredCollections = ['users', 'tasks', 'schedules', 'analytics'];
    for (const coll of requiredCollections) {
      if (!collectionNames.includes(coll)) {
        await db.createCollection(coll);
        console.log(`✅ Created ${coll} collection`);
      }
    }

    // Create indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ createdAt: -1 });
    await db.collection('tasks').createIndex({ userId: 1 });
    await db.collection('tasks').createIndex({ completed: 1 });
    await db.collection('tasks').createIndex({ userId: 1, completed: 1 });
    await db.collection('tasks').createIndex({ createdAt: -1 });
    await db.collection('schedules').createIndex({ userId: 1, date: -1 });
    await db.collection('schedules').createIndex({ date: -1 });
    await db.collection('analytics').createIndex({ userId: 1 }, { unique: true });

    console.log('✅ All indexes created');
  } catch (error) {
    console.error('❌ Migration error:', error);
    throw error;
  }
}

async function seed() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🚀 Starting database seeding...');
    await client.connect();
    const db = client.db(DB_NAME);
    
    // Run migration first
    await migrateDatabase(db);
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await db.collection('users').deleteMany({});
    await db.collection('tasks').deleteMany({});
    await db.collection('schedules').deleteMany({});
    await db.collection('analytics').deleteMany({});
    
    // Seed users
    console.log('👤 Seeding users...');
    const userResult = await db.collection('users').insertMany(sampleUsers);
    const userId = userResult.insertedIds[0];
    
    // Seed tasks
    console.log('📝 Seeding tasks...');
    await db.collection('tasks').insertMany(sampleTasks(userId));
    
    console.log('✅ Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

seed();
