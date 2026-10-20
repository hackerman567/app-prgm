# Database Structure

## Collections

### Users Collection
Stores user profile information and preferences.

**Fields:**
- `_id`: ObjectId
- `email`: String (unique)
- `name`: String
- `password`: String (hashed)
- `timezone`: String
- `preferredMood`: String (focus, creative, recovery, maintenance)
- `focusHours`: Object { start, end }
- `createdAt`: Date
- `updatedAt`: Date

### Tasks Collection
Stores all tasks created by users.

**Fields:**
- `_id`: ObjectId
- `title`: String
- `description`: String
- `userId`: ObjectId (reference to Users)
- `duration`: Integer (minutes)
- `type`: String (focus, break, review)
- `mood`: String
- `completed`: Boolean
- `completedAt`: Date (optional)
- `priority`: Integer
- `tags`: Array of Strings
- `createdAt`: Date
- `updatedAt`: Date

### Schedules Collection
Stores daily/weekly schedules for users.

**Fields:**
- `_id`: ObjectId
- `userId`: ObjectId (reference to Users)
- `date`: Date
- `mood`: String
- `tasks`: Array of Objects
  - `taskId`: ObjectId (reference to Tasks)
  - `startTime`: Date
  - `endTime`: Date
  - `order`: Integer
- `optimizationScore`: Double
- `estimatedCompletionTime`: Integer (minutes)
- `actualCompletionTime`: Integer (minutes, optional)
- `createdAt`: Date
- `updatedAt`: Date

### Analytics Collection
Stores user productivity analytics.

**Fields:**
- `_id`: ObjectId
- `userId`: ObjectId (reference to Users, unique)
- `focusScore`: Double (0-100)
- `completionRate`: Double (percentage)
- `avgTaskDuration`: Double (minutes)
- `preferredFocusHour`: Integer (0-23)
- `totalTasksCompleted`: Integer
- `weeklyStats`: Array of Objects
  - `day`: String
  - `tasksCompleted`: Integer
  - `totalDuration`: Integer
- `updatedAt`: Date

## Indexes

- **users**: email (unique), createdAt
- **tasks**: userId, completed, userId+completed, createdAt
- **schedules**: userId+date, date
- **analytics**: userId (unique)

## API Endpoints

### Users
- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `GET /users/:userId` - Get user profile
- `PUT /users/:userId` - Update user profile

### Tasks
- `POST /tasks` - Create new task
- `GET /tasks/user/:userId` - Get user's tasks
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Schedule
- `POST /schedule/generate` - Generate optimized schedule
- `POST /schedule/optimize` - Optimize existing schedule
