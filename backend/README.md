# Client Mood Tracker - Backend

Backend API for the Client Mood Tracker application built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Create, read, update, delete mood entries
- Smart mood-based suggestions
- Mood statistics and analytics
- Emergency alerts for frequent sad moods
- Protected routes
- CORS enabled

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud Atlas)
- npm or yarn

### Steps

1. Clone the repository and navigate to backend folder
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Update `.env` with your configuration
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mood-tracker
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:19000
```

5. Start the server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Moods
- `POST /api/moods` - Create mood entry (Protected)
- `GET /api/moods` - Get all moods for current user (Protected)
- `GET /api/moods?startDate=2024-01-01&endDate=2024-01-31` - Get moods with date filter
- `GET /api/moods/stats?period=week` - Get mood statistics (Protected)
- `GET /api/moods/:id` - Get single mood entry (Protected)
- `PUT /api/moods/:id` - Update mood entry (Protected)
- `DELETE /api/moods/:id` - Delete mood entry (Protected)

### Health Check
- `GET /api/health` - Server health status

## API Request Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Mood Entry
```bash
curl -X POST http://localhost:5000/api/moods \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "mood": "Happy",
    "reason": "Had a great day at work!"
  }'
```

### Get All Moods
```bash
curl -X GET http://localhost:5000/api/moods \
  -H "Authorization: Bearer <your_token>"
```

### Get Mood Statistics
```bash
curl -X GET http://localhost:5000/api/moods/stats?period=week \
  -H "Authorization: Bearer <your_token>"
```

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Mood Model
```javascript
{
  userId: ObjectId,
  mood: String (Happy, Sad, Angry, Anxious, Neutral, Excited, Tired),
  reason: String,
  suggestion: String,
  createdAt: Date
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── moodController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Mood.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── moods.js
│   ├── utils/
│   │   └── suggestions.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

## Environment Variables

```
PORT - Server port (default: 5000)
NODE_ENV - Environment (development/production)
MONGODB_URI - MongoDB connection string
JWT_SECRET - JWT secret key for token signing
JWT_EXPIRE - JWT expiration time
CORS_ORIGIN - CORS allowed origins
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## Error Handling

All endpoints return consistent JSON responses:

Success Response:
```json
{
  "success": true,
  "data": {...},
  "message": "Success message"
}
```

Error Response:
```json
{
  "success": false,
  "message": "Error message"
}
```

## Production Checklist

- [ ] Change JWT_SECRET in .env
- [ ] Use MongoDB Atlas for production
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Enable logging
- [ ] Add input validation
- [ ] Setup automated backups
- [ ] Configure CORS properly
- [ ] Use environment-specific configs
- [ ] Add monitoring and alerting

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
