// Migration script to create collections and indexes

export async function migrateDatabase(db: any) {
  try {
    console.log('🔄 Starting database migration...');

    // Create collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c: any) => c.name);

    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      console.log('✅ Created users collection');
    }

    if (!collectionNames.includes('tasks')) {
      await db.createCollection('tasks');
      console.log('✅ Created tasks collection');
    }

    if (!collectionNames.includes('schedules')) {
      await db.createCollection('schedules');
      console.log('✅ Created schedules collection');
    }

    if (!collectionNames.includes('analytics')) {
      await db.createCollection('analytics');
      console.log('✅ Created analytics collection');
    }

    // Create indexes
    // Users indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ createdAt: -1 });

    // Tasks indexes
    await db.collection('tasks').createIndex({ userId: 1 });
    await db.collection('tasks').createIndex({ completed: 1 });
    await db.collection('tasks').createIndex({ userId: 1, completed: 1 });
    await db.collection('tasks').createIndex({ createdAt: -1 });

    // Schedules indexes
    await db.collection('schedules').createIndex({ userId: 1, date: -1 });
    await db.collection('schedules').createIndex({ date: -1 });

    // Analytics indexes
    await db.collection('analytics').createIndex({ userId: 1 }, { unique: true });

    console.log('✅ All indexes created');
    console.log('✅ Migration completed successfully');

  } catch (error) {
    console.error('❌ Migration error:', error);
    throw error;
  }
}
