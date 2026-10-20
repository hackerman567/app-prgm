import { Db, MongoClient, ObjectId } from 'mongodb';

let mongoClient: MongoClient | null = null;
let db: any = null;

// Realistic campus mock data stores
const mockUsers = [
  {
    _id: new ObjectId('650000000000000000000001'),
    name: 'Ram Malhotra',
    email: 'ram@example.com',
    roll_no: '24Z999',
    dept: 'Computer Science and Engineering',
    batch: '2024-2028',
    timezone: 'Asia/Kolkata',
    preferredMood: 'focus',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockTasks = [
  {
    _id: new ObjectId('650000000000000000000011'),
    userId: new ObjectId('650000000000000000000001'),
    title: 'Data Structures - Graph Traversal Assignment',
    description: 'Implement BFS and Dijkstra algorithms in C++',
    duration: 60,
    type: 'focus',
    mood: 'focus',
    priority: 3,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectId('650000000000000000000012'),
    userId: new ObjectId('650000000000000000000001'),
    title: 'Operating Systems - Process Scheduling Report',
    description: 'Round-robin vs Priority scheduling comparative study',
    duration: 45,
    type: 'review',
    mood: 'maintenance',
    priority: 2,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new ObjectId('650000000000000000000013'),
    userId: new ObjectId('650000000000000000000001'),
    title: 'DBMS Lab - Normalization & Complex Queries',
    description: '3NF and BCNF schema design and triggers',
    duration: 50,
    type: 'focus',
    mood: 'focus',
    priority: 2,
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockHalls = [
  {
    _id: new ObjectId('650000000000000000000101'),
    id: 'hall-01',
    name: 'Dr. A.P.J. Abdul Kalam Grand Auditorium',
    code: 'AUD-01',
    type: 'Auditorium',
    capacity: 1200,
    location: 'Central Academic Block, Level 1',
    facilities: ['4K Dual Laser Projector', 'JBL Line Array Sound', 'Central AC', 'VIP Green Rooms', 'Live Stream Control Room'],
    status: 'occupied',
    inCharge: 'Dr. Saranya K G',
    contact: '+91 98401 23450'
  },
  {
    _id: new ObjectId('650000000000000000000102'),
    id: 'hall-02',
    name: 'Srinivasa Ramanujan Seminar Hall',
    code: 'SEM-01',
    type: 'Seminar Hall',
    capacity: 350,
    location: 'Science & Tech Tower, Floor 3',
    facilities: ['Motorized Projection Screen', 'Wireless Collar Mics', 'Tiered Gallery Seating', 'Acoustic Wall Panels'],
    status: 'available',
    inCharge: 'Prof. Prasanna',
    contact: '+91 98401 23451'
  },
  {
    _id: new ObjectId('650000000000000000000103'),
    id: 'hall-03',
    name: 'Alan Turing Tech Theater',
    code: 'LAB-01',
    type: 'Lab Theater',
    capacity: 220,
    location: 'Computer Science Block, Ground Floor',
    facilities: ['Dual Video Wall', 'High-Density WiFi 6', 'Power Sockets per Seat', 'Interactive Whiteboard'],
    status: 'available',
    inCharge: 'Dr. Agashraj',
    contact: '+91 98401 23452'
  },
  {
    _id: new ObjectId('650000000000000000000104'),
    id: 'hall-04',
    name: 'Vikram Sarabhai Conference Center',
    code: 'CONF-01',
    type: 'Conference Hall',
    capacity: 150,
    location: 'Administrative Block, Floor 2',
    facilities: ['Boardroom Polycom System', 'Executive Swivel Seating', 'Catering Antechamber', 'Dual Teleconference Screens'],
    status: 'available',
    inCharge: 'Dr. Niruban T S',
    contact: '+91 98401 23453'
  },
  {
    _id: new ObjectId('650000000000000000000105'),
    id: 'hall-05',
    name: 'Sir C.V. Raman Lecture Complex',
    code: 'LEC-01',
    type: 'Smart Classroom',
    capacity: 280,
    location: 'Physics & Nanotech Wing, Floor 1',
    facilities: ['Digital Podium', 'Document Camera', 'Surround Sound', 'Air Filtration'],
    status: 'occupied',
    inCharge: 'Prof. Karthick',
    contact: '+91 98401 23454'
  },
  {
    _id: new ObjectId('650000000000000000000106'),
    id: 'hall-06',
    name: 'Ada Lovelace Computing Amphitheater',
    code: 'SEM-02',
    type: 'Seminar Hall',
    capacity: 400,
    location: 'Innovation Hub, Floor 4',
    facilities: ['4K LED Display Matrix', 'Stage Rigging & Spotlights', 'Fiber Uplink 10Gbps', 'Automated Attendance Sensors'],
    status: 'available',
    inCharge: 'Dr. Dhanush M',
    contact: '+91 98401 23455'
  }
];

const mockBookings = [
  {
    _id: new ObjectId('650000000000000000000201'),
    referenceCode: 'HOF-2026-CSE-101',
    hallId: 'hall-01',
    hallName: 'Dr. A.P.J. Abdul Kalam Grand Auditorium',
    title: 'National Cloud & Systems Symposium 2026',
    department: 'Computer Science and Engineering',
    organizer: 'CSE Association & ACM Student Chapter',
    facultyCoordinator: 'Dr. Saranya K G',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '09:00 AM - 01:00 PM',
    attendees: 850,
    purpose: 'Keynote addresses, technical paper presentations, and project expo',
    equipment: ['4K Dual Laser Projector', 'JBL Line Array Sound', 'Live Stream Control Room'],
    status: 'Approved',
    bookedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    _id: new ObjectId('650000000000000000000202'),
    referenceCode: 'HOF-2026-ECE-204',
    hallId: 'hall-05',
    hallName: 'Sir C.V. Raman Lecture Complex',
    title: 'Embedded Systems & Edge Computing Workshop',
    department: 'Electronics & Communication Eng.',
    organizer: 'Robotics & Automation Society',
    facultyCoordinator: 'Dr. Niruban T S',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:30 AM - 03:30 PM',
    attendees: 240,
    purpose: 'Hands-on ESP32 and ARM Cortex microcontrollers lab session',
    equipment: ['Digital Podium', 'Document Camera', 'Surround Sound'],
    status: 'Approved',
    bookedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: new ObjectId('650000000000000000000203'),
    referenceCode: 'HOF-2026-TPO-308',
    hallId: 'hall-02',
    hallName: 'Srinivasa Ramanujan Seminar Hall',
    title: 'Campus Placement Drive - Tier-1 Tech Assessments',
    department: 'Training & Placement Cell',
    organizer: 'Corporate Relations Desk',
    facultyCoordinator: 'Prof. Karthick T',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '09:00 AM - 05:00 PM',
    attendees: 320,
    purpose: 'Pre-placement talk, coding rounds and technical interviews',
    equipment: ['Motorized Projection Screen', 'Wireless Collar Mics'],
    status: 'Approved',
    bookedAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    _id: new ObjectId('650000000000000000000204'),
    referenceCode: 'HOF-2026-MECH-412',
    hallId: 'hall-03',
    hallName: 'Alan Turing Tech Theater',
    title: 'Autonomous Mobile Robotics Demonstration',
    department: 'Mechanical Engineering',
    organizer: 'Mechatronics Club',
    facultyCoordinator: 'Dr. Prasannakumar',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '02:00 PM - 04:30 PM',
    attendees: 180,
    purpose: 'Live demonstration of AGVs and industrial robotic arm kinematics',
    equipment: ['Dual Video Wall', 'High-Density WiFi 6'],
    status: 'Pending',
    bookedAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];

const mockEquipment = [
  { id: 'eq-01', name: '4K Dual Laser Projector', category: 'Visual', totalUnits: 8, availableUnits: 5 },
  { id: 'eq-02', name: 'Wireless Handheld Mics', category: 'Audio', totalUnits: 24, availableUnits: 16 },
  { id: 'eq-03', name: 'Collar / Lapel Mics', category: 'Audio', totalUnits: 16, availableUnits: 11 },
  { id: 'eq-04', name: 'JBL Line Array Stage Audio System', category: 'Audio', totalUnits: 6, availableUnits: 4 },
  { id: 'eq-05', name: 'Interactive Digital Podium', category: 'Stage', totalUnits: 10, availableUnits: 7 },
  { id: 'eq-06', name: 'Live Stream HD Capture & Switcher', category: 'Visual', totalUnits: 4, availableUnits: 2 },
  { id: 'eq-07', name: 'Central Air Conditioning Units', category: 'Stage', totalUnits: 18, availableUnits: 18 },
  { id: 'eq-08', name: 'Stage Rigging & Focus Spotlights', category: 'Stage', totalUnits: 12, availableUnits: 9 }
];

// Helper mock collection for in-memory operation
class MockCollection {
  private data: any[];
  constructor(initialData: any[]) {
    this.data = initialData;
  }

  find(query: any = {}) {
    let result = this.filterData(query);
    return {
      toArray: async () => [...result],
      sort: (sortObj: any) => {
        return {
          toArray: async () => [...result]
        };
      }
    };
  }

  async findOne(query: any = {}) {
    const list = this.filterData(query);
    return list.length > 0 ? { ...list[0] } : null;
  }

  async insertOne(doc: any) {
    const newDoc = {
      _id: doc._id || new ObjectId(),
      ...doc,
      createdAt: doc.createdAt || new Date(),
      updatedAt: doc.updatedAt || new Date()
    };
    this.data.push(newDoc);
    return { insertedId: newDoc._id };
  }

  async insertMany(docs: any[]) {
    const insertedIds: any = {};
    docs.forEach((doc, idx) => {
      const newDoc = {
        _id: doc._id || new ObjectId(),
        ...doc,
        createdAt: doc.createdAt || new Date(),
        updatedAt: doc.updatedAt || new Date()
      };
      this.data.push(newDoc);
      insertedIds[idx] = newDoc._id;
    });
    return { insertedIds };
  }

  async updateOne(query: any, updateObj: any) {
    const item = await this.findOne(query);
    if (!item) return { matchedCount: 0, modifiedCount: 0 };
    const index = this.data.findIndex(d => d._id?.toString() === item._id?.toString());
    if (index !== -1) {
      if (updateObj.$set) {
        this.data[index] = { ...this.data[index], ...updateObj.$set, updatedAt: new Date() };
      }
      return { matchedCount: 1, modifiedCount: 1 };
    }
    return { matchedCount: 0, modifiedCount: 0 };
  }

  async deleteOne(query: any) {
    const initialLen = this.data.length;
    this.data = this.data.filter(item => {
      for (const key of Object.keys(query)) {
        if (query[key]?.toString() === item[key]?.toString()) return false;
      }
      return true;
    });
    return { deletedCount: initialLen - this.data.length };
  }

  async deleteMany(query: any = {}) {
    if (Object.keys(query).length === 0) {
      const count = this.data.length;
      this.data = [];
      return { deletedCount: count };
    }
    const initialLen = this.data.length;
    this.data = this.data.filter(item => {
      for (const key of Object.keys(query)) {
        if (query[key]?.toString() === item[key]?.toString()) return false;
      }
      return true;
    });
    return { deletedCount: initialLen - this.data.length };
  }

  async countDocuments(query: any = {}) {
    return this.filterData(query).length;
  }

  async createIndex() {
    return true;
  }

  private filterData(query: any) {
    if (!query || Object.keys(query).length === 0) return [...this.data];
    return this.data.filter(item => {
      for (const key of Object.keys(query)) {
        if (query[key] instanceof ObjectId || (item[key] && item[key] instanceof ObjectId)) {
          if (query[key]?.toString() !== item[key]?.toString()) return false;
        } else if (typeof query[key] === 'object' && query[key] !== null) {
          // Range queries or mongo operators
          if (query[key].$gte && item[key] < query[key].$gte) return false;
          if (query[key].$lte && item[key] > query[key].$lte) return false;
        } else if (item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }
}

// In-Memory Database store
class MockDatabase {
  private collections: { [key: string]: MockCollection } = {};

  constructor() {
    this.collections['users'] = new MockCollection(mockUsers);
    this.collections['tasks'] = new MockCollection(mockTasks);
    this.collections['halls'] = new MockCollection(mockHalls);
    this.collections['bookings'] = new MockCollection(mockBookings);
    this.collections['equipment'] = new MockCollection(mockEquipment);
    this.collections['schedules'] = new MockCollection([]);
    this.collections['analytics'] = new MockCollection([]);
  }

  collection(name: string) {
    if (!this.collections[name]) {
      this.collections[name] = new MockCollection([]);
    }
    return this.collections[name];
  }

  async listCollections() {
    return {
      toArray: async () => Object.keys(this.collections).map(name => ({ name }))
    };
  }

  async createCollection(name: string) {
    if (!this.collections[name]) {
      this.collections[name] = new MockCollection([]);
    }
    return this.collections[name];
  }
}

const inMemoryDb = new MockDatabase();

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hall-o-flow';
  try {
    mongoClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 2500,
      connectTimeoutMS: 2500
    });
    await mongoClient.connect();
    db = mongoClient.db('hall-o-flow');
    console.log('✅ Real MongoDB connected successfully to', uri);
    return db;
  } catch (error: any) {
    console.warn(`⚠️ MongoDB connection unavailable (${error.message}). Falling back to In-Memory Mock Store (Demo Ready).`);
    db = inMemoryDb;
    return db;
  }
}

export function getDatabase() {
  if (!db) {
    db = inMemoryDb;
  }
  return db;
}

export async function closeDatabaseConnection() {
  if (mongoClient) {
    await mongoClient.close();
  }
}
