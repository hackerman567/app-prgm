// MongoDB Schema Definitions for Hall-o-Flow

export const UsersSchema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "name", "password"],
      properties: {
        _id: { bsonType: "objectId" },
        email: { 
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        },
        name: { bsonType: "string" },
        password: { bsonType: "string" },
        timezone: { bsonType: "string", default: "UTC" },
        preferredMood: { 
          bsonType: "string",
          enum: ["focus", "creative", "recovery", "maintenance"],
          default: "focus"
        },
        focusHours: {
          bsonType: "object",
          properties: {
            start: { bsonType: "int", minimum: 0, maximum: 23 },
            end: { bsonType: "int", minimum: 0, maximum: 23 }
          }
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
};

export const TasksSchema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "userId", "type"],
      properties: {
        _id: { bsonType: "objectId" },
        title: { bsonType: "string" },
        description: { bsonType: "string" },
        userId: { bsonType: "objectId" },
        duration: { bsonType: "int" }, // in minutes
        type: { 
          bsonType: "string",
          enum: ["focus", "break", "review"]
        },
        mood: {
          bsonType: "string",
          enum: ["focus", "creative", "recovery", "maintenance"]
        },
        completed: { bsonType: "bool", default: false },
        completedAt: { bsonType: "date" },
        priority: { bsonType: "int", default: 1 },
        tags: { 
          bsonType: "array",
          items: { bsonType: "string" }
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
};

export const SchedulesSchema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "date"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        date: { bsonType: "date" },
        mood: { 
          bsonType: "string",
          enum: ["focus", "creative", "recovery", "maintenance"]
        },
        tasks: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              taskId: { bsonType: "objectId" },
              startTime: { bsonType: "date" },
              endTime: { bsonType: "date" },
              order: { bsonType: "int" }
            }
          }
        },
        optimizationScore: { bsonType: "double" },
        estimatedCompletionTime: { bsonType: "int" },
        actualCompletionTime: { bsonType: "int" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
};

export const AnalyticsSchema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        focusScore: { bsonType: "double" },
        completionRate: { bsonType: "double" },
        avgTaskDuration: { bsonType: "double" },
        preferredFocusHour: { bsonType: "int" },
        totalTasksCompleted: { bsonType: "int" },
        weeklyStats: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              day: { bsonType: "string" },
              tasksCompleted: { bsonType: "int" },
              totalDuration: { bsonType: "int" }
            }
          }
        },
        updatedAt: { bsonType: "date" }
      }
    }
  }
};
