# 🎯 Client Mood Tracker - Full Stack Application

A comprehensive full-stack mood tracking application with **Web**, **Mobile**, and **Backend** components. Track your emotions, receive smart suggestions, and monitor your mental health trends with beautiful, responsive interfaces across all devices.

## 🌟 Features

### Core Features

✅ **User Authentication** - Secure JWT-based register/login system  
✅ **Mood Tracking** - 7 emotion types with detailed reasons  
✅ **Smart Suggestions** - AI-powered recommendations based on mood  
✅ **Analytics** - Weekly & monthly trend charts  
✅ **History Management** - Full mood entry history with filters  
✅ **Emergency Alerts** - Alert when mood patterns are concerning  
✅ **Cross-Platform** - Works on web, iOS, and Android  
✅ **Responsive Design** - Optimized for desktop, tablet, and mobile

### Advanced Features

🎨 **Beautiful UI** - Modern, gradient-based interface  
📊 **Data Visualization** - Interactive charts with Chart.js  
🔐 **Secure** - Password hashing with bcrypt, JWT authentication  
💾 **Persistent Storage** - MongoDB for reliable data persistence  
⚡ **Fast & Optimized** - Efficient code with minimal dependencies  
📱 **Native Mobile** - React Native with Expo for iOS & Android

## 🏗️ Project Structure

```
Client Mood Tracker app/
├── backend/              # Node.js + Express + MongoDB API
│   ├── src/
│   │   ├── models/       # User & Mood schemas
│   │   ├── controllers/  # Business logic
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # JWT authentication
│   │   ├── utils/        # Suggestions logic
│   │   └── config/       # Database config
│   └── README.md
│
├── web/                  # React.js web application
│   ├── src/
│   │   ├── pages/        # Login, Dashboard, History, etc.
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # Auth context
│   │   ├── services/     # API integration
│   │   └── styles/       # CSS styling
│   └── README.md
│
├── mobile/               # React Native + Expo mobile app
│   ├── src/
│   │   ├── screens/      # Login, Dashboard, History, Profile
│   │   ├── context/      # Auth context
│   │   ├── services/     # API integration
│   │   └── styles/       # Colors & typography
│   ├── App.js            # Navigation & app setup
│   └── README.md
│
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** v14+ & npm
- **MongoDB** (local or Atlas)
- **For Web**: Just a browser
- **For Mobile**: Expo Go app on your phone

### 1. Setup Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

**Test:** Visit `http://localhost:5000/api/health`

### 2. Setup Web Frontend

```bash
cd web
cp .env.example .env
npm install
npm start
```

Web app opens at `http://localhost:3000`

### 3. Setup Mobile App

```bash
cd mobile
cp .env.example .env
npm install
npm start
```

Scan QR code with **Expo Go** app or run with:

```bash
npm run android  # Android Emulator
npm run ios      # iOS Simulator
```

## 📋 API Endpoints

### Authentication

```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user
GET    /api/auth/me           - Get current user (Protected)
```

### Moods

```
POST   /api/moods             - Create mood entry (Protected)
GET    /api/moods             - Get all moods (Protected)
GET    /api/moods/stats       - Get mood statistics (Protected)
GET    /api/moods/:id         - Get single mood (Protected)
PUT    /api/moods/:id         - Update mood (Protected)
DELETE /api/moods/:id         - Delete mood (Protected)
```

## 🎨 Mood Types & Suggestions

| Mood    | Emoji | Suggestion                 |
| ------- | ----- | -------------------------- |
| Happy   | 😊    | Gratitude journaling       |
| Sad     | 😢    | Deep breathing, Journaling |
| Angry   | 😠    | Walking, Deep breaths      |
| Anxious | 😰    | Grounding techniques       |
| Neutral | 😐    | Reflection & mindfulness   |
| Excited | 🤩    | Goal setting & planning    |
| Tired   | 😴    | Rest tips & sleep advice   |

## 📊 Database Schema

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
  mood: String (7 options),
  reason: String,
  suggestion: String,
  createdAt: Date
}
```

## 🔐 Authentication Flow

1. **Register** → User creates account
2. **Hash Password** → Password hashed with bcrypt
3. **Generate JWT** → Token issued on login
4. **Store Token** → Saved in localStorage (web) / AsyncStorage (mobile)
5. **Attach to Requests** → Token sent in Authorization header
6. **Verify Token** → Backend validates on protected routes
7. **Auto Logout** → Token expires based on JWT_EXPIRE setting

## 🎯 Smart Suggestions Logic

Suggestions are automatically generated based on mood type:

```javascript
// Backend: src/utils/suggestions.js
Happy     → "Keep spreading positivity..."
Sad       → "Try deep breathing exercises..."
Angry     → "Take a walk to cool off..."
Anxious   → "Use the 5-4-3-2-1 grounding technique..."
Neutral   → "Take time to reflect on your day..."
Excited   → "Channel this energy productively..."
Tired     → "Your body is telling you it needs rest..."
```

## ⚠️ Emergency Alert Feature

**Trigger:** Sad mood logged more than 5 times in a week

**Alert Message:** "You have reported feeling sad more than 5 times this week. Consider talking to a counselor."

**Response:**

- Shown on Dashboard
- Included in stats response
- Persistent reminder

## 📱 Mobile App Features

- **Bottom Tab Navigation** - Easy access to all features
- **4 Main Screens** - Dashboard, Log Mood, History, Profile
- **Offline Support** - AsyncStorage for local persistence
- **Push Notifications** - Daily 8 PM mood reminder
- **Native Look** - Optimized for iOS & Android

## 🌐 Web App Features

- **Responsive Design** - Works perfectly on desktop & tablet
- **Interactive Charts** - Chart.js visualization library
- **Modern UI** - Gradient backgrounds & smooth animations
- **Fast Navigation** - React Router client-side routing
- **Beautiful Forms** - Smooth input interactions & validation

## 🛠️ Technology Stack

```
Backend:     Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
Web:         React, React Router, Axios, Chart.js, CSS3
Mobile:      React Native, Expo, React Navigation, Axios
Database:    MongoDB (Atlas or Local)
Auth:        JWT (JSON Web Tokens)
```

## 📦 Installation Summary

| Component | Command                                    | Port |
| --------- | ------------------------------------------ | ---- |
| Backend   | `cd backend && npm install && npm run dev` | 5000 |
| Web       | `cd web && npm install && npm start`       | 3000 |
| Mobile    | `cd mobile && npm install && npm start`    | Expo |

## 🔑 Environment Variables

### Backend (.env)

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mood-tracker
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:19000
```

### Web & Mobile (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Testing the App

### 1. Create Account

- Register with email: `test@example.com`
- Password: `password123`

### 2. Log a Mood

- Select mood (e.g., Happy)
- Add reason (e.g., "Had a great day!")
- Suggestion appears automatically
- Entry saved to database

### 3. View Analytics

- Dashboard shows latest mood
- History shows all entries
- Charts display trends
- Statistics updated in real-time

### 4. Emergency Alert Test

- Log "Sad" mood 6+ times in a week
- Alert appears on dashboard
- Encourages seeking help

## 🐛 Troubleshooting

### Backend won't connect to MongoDB

```
Solution: Ensure MongoDB is running & URI is correct in .env
```

### Web can't reach backend

```
Solution: Check backend is running on port 5000
Update REACT_APP_API_URL if needed
```

### Mobile app won't connect

```
Solution: Same UI  but use http://10.0.2.2:5000 for Android emulator
Or ensure device is on same network as backend
```

### Token expired

```
Solution: Logout and login again
Adjust JWT_EXPIRE in backend .env
```

## 📚 File Structure Details

### Backend Key Files

- `server.js` - Express app setup
- `models/User.js` - User schema with password hashing
- `models/Mood.js` - Mood entry schema
- `controllers/authController.js` - Auth logic (register, login)
- `controllers/moodController.js` - Mood CRUD operations
- `utils/suggestions.js` - Mood suggestion generator
- `middleware/auth.js` - JWT verification

### Web Key Files

- `App.js` - Route configuration
- `context/AuthContext.js` - Global auth state
- `services/api.js` - API communication
- `pages/DashboardPage.js` - Main dashboard
- `pages/MoodEntryPage.js` - Mood form
- `pages/HistoryPage.js` - History with charts
- `styles/` - All CSS styling

### Mobile Key Files

- `App.js` - Navigation setup with Redux & tabs
- `screens/LoginScreen.js` - Auth screen
- `screens/DashboardScreen.js` - Home screen
- `screens/MoodEntryScreen.js` - Mood form
- `screens/HistoryScreen.js` - Mood list
- `screens/ProfileScreen.js` - User profile

## 🚢 Deployment

### Backend

- Deploy to Heroku, AWS, DigitalOcean
- Use cloud MongoDB Atlas for database
- Update CORS_ORIGIN for production URLs

### Web

- Build with `npm run build`
- Deploy to Vercel, Netlify, GitHub Pages
- Update REACT_APP_API_URL for production API

### Mobile

- Build Android APK: `eas build --platform android`
- Build iOS: `eas build --platform ios`
- Requires EAS account setup

## 📖 Documentation

Each folder has its own README:

- [Backend README](backend/README.md)
- [Web README](web/README.md)
- [Mobile README](mobile/README.md)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - Free to use and modify

## 👨‍💻 Author

Group 6 - Client Mood Tracker Team

---

**Built with ❤️ for mental health awareness**

Questions? Check individual README files or contact the development team.
