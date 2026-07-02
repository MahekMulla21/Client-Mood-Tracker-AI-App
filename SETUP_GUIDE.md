# 📖 Complete Setup & Installation Guide

This guide will help you set up the entire **Client Mood Tracker** application from scratch.

## ⚙️ Prerequisites

Before starting, ensure you have installed:

1. **Node.js and npm**
   - Download: https://nodejs.org/ (v14 or higher)
   - Verify: `node --version` and `npm --version`

2. **MongoDB**
   - **Option A (Local):** Download from https://www.mongodb.com/try/download/community
   - **Option B (Cloud):** MongoDB Atlas at https://www.mongodb.com/cloud/atlas
   - Test connection: `mongosh` or `mongo` in terminal

3. **Git** (Optional)
   - Download: https://git-scm.com/
   - Verify: `git --version`

4. **For Mobile Testing**
   - Android: Download Android Studio
   - iOS: Xcode (macOS only)
   - Or use: **Expo Go** app on your phone (recommended)

## 📁 Project Folder Structure

```
Client Mood Tracker app/
├── backend/     ← Backend API
├── web/         ← Web application
├── mobile/      ← Mobile application
└── README.md    ← Main documentation
```

---

## 🔧 Step-by-Step Setup

### Step 1: Backend Setup (Node.js + Express + MongoDB)

#### 1.1 Navigate to Backend

```bash
cd backend
```

#### 1.2 Install Dependencies

```bash
npm install
```

Expected dependencies:

- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- validator

#### 1.3 Setup Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cp .env.example .env
```

Open `.env` and update with your settings:

**Option A: Local MongoDB**

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mood-tracker
MONGODB_USER=
MONGODB_PASSWORD=
JWT_SECRET=your_super_secret_key_min_32_chars_12345
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:19000
```

**Option B: MongoDB Atlas (Cloud)**

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mood-tracker
JWT_SECRET=your_super_secret_key_min_32_chars_12345
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:19000
```

#### 1.4 Start Backend Server

Development mode (with auto-reload):

```bash
npm run dev
```

Or simple start:

```bash
npm start
```

**Expected Output:**

```
Server running on http://localhost:5000
MongoDB Connected: localhost:27017
Health check: http://localhost:5000/api/health
```

#### 1.5 Test Backend

Open your browser and visit:

- Health Check: `http://localhost:5000/api/health`

You should see:

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

✅ **Backend is ready!**

---

### Step 2: Web Frontend Setup (React.js)

Keep the backend running in a separate terminal.

#### 2.1 Open New Terminal & Navigate to Web

```bash
cd web
```

#### 2.2 Install Dependencies

```bash
npm install
```

Expected dependencies:

- react
- react-dom
- react-router-dom
- axios
- chart.js
- react-chartjs-2

#### 2.3 Setup Environment Variables

```bash
cp .env.example .env
```

Update `.env`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

#### 2.4 Start Web Application

```bash
npm start
```

**Expected Output:**

```
Compiled successfully!

You can now view mood-tracker-web in the browser.

Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000
```

Browser should open automatically to `http://localhost:3000`

#### 2.5 Test Web App

1. **Register Account**
   - Click "Sign up here"
   - Enter name, email, password
   - Click "Sign Up"

2. **Test Dashboard**
   - You should see "Welcome" message
   - No mood entries yet (that's ok)

3. **Log a Mood**
   - Click "➕ Log New Mood"
   - Select a mood (Happy, Sad, etc.)
   - Enter a reason
   - Click "Save Mood Entry"
   - You should see success message

4. **View History**
   - Click "📋 View History"
   - Your mood entry appears
   - See charts and statistics

✅ **Web app is ready!**

---

### Step 3: Mobile App Setup (React Native + Expo)

Keep backend running. Web can be closed.

#### 3.1 Install Expo CLI Globally

```bash
npm install -g expo-cli
```

#### 3.2 Open New Terminal & Navigate to Mobile

```bash
cd mobile
```

#### 3.3 Install Dependencies

```bash
npm install
```

This will install:

- expo
- react-native
- @react-navigation/\*
- axios
- expo-async-storage
- expo-notifications

Depending on your internet, this may take 3-5 minutes.

#### 3.4 Setup Environment Variables

```bash
cp .env.example .env
```

Update `.env`:

**For Physical Phone:**

```
REACT_APP_API_URL=http://YOUR_COMPUTER_IP:5000/api
```

Replace `YOUR_COMPUTER_IP` with your computer's IP (e.g., 192.168.1.10)

**For Emulator (Android):**

```
REACT_APP_API_URL=http://10.0.2.2:5000/api
```

**For Simulator (iOS):**

```
REACT_APP_API_URL=http://localhost:5000/api
```

#### 3.5 Start Mobile App

```bash
npm start
```

Or specific platform:

```bash
npm run android  # Android Emulator
npm run ios      # iOS Simulator
npm run web      # Web version
```

**Expected Output:**

```
Starting Expo...

Expo DevTools is running at http://localhost:19002
Logs for your project will appear here...

Scan QR code or press:
a - open Android
i - open iOS
w - open web
```

#### 3.6 Run on Device

**Option A: Expo Go App (Easiest)**

1. Download "Expo Go" from Play Store (Android) or App Store (iOS)
2. Scan QR code shown in terminal
3. App opens on your phone

**Option B: Android Emulator**

1. Open Android Studio
2. Create/start a virtual device
3. Press `a` in terminal
4. App installs and opens

**Option C: iOS Simulator (macOS only)**

1. Open Xcode
2. Install command line tools
3. Press `i` in terminal
4. Simulator opens with app

#### 3.7 Test Mobile App

1. **Login/Register**
   - Use same credentials as web
   - You'll see bottom navigation tabs

2. **Navigate Tabs**
   - 📊 Home - Dashboard
   - ➕ Log - Add mood
   - 📋 History - View entries
   - 👤 Profile - User info

3. **Log Mood**
   - Tap "Log" tab
   - Select mood & enter reason
   - Tap "Save Mood Entry"

4. **View History**
   - Tap "History" tab
   - See all your mood entries
   - Swipe period filter buttons

✅ **Mobile app is ready!**

---

## 🧪 Complete Features Test

### Test Case 1: New User Registration

**Web:**

1. Go to http://localhost:3000
2. Click "Sign up here"
3. Fill form:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Confirm: password123
4. Click "Sign Up"
5. Redirected to Dashboard

**Mobile:**

1. Same process in mobile app
2. After registration, see Dashboard

### Test Case 2: Login

**Web:**

1. Click "Log in here"
2. Enter email & password
3. Click "Log In"
4. See Dashboard

**Mobile:**

1. Same login process
2. Tab navigation appears

### Test Case 3: Log Mood

**Both Platforms:**

1. Click/Tap "Log New Mood" / "Log" tab
2. Select any mood
3. Enter reason (min 10 chars)
4. Submit
5. Success message appears
6. Redirected to dashboard/home

### Test Case 4: View History

**Web:**

1. Click "📋 View History"
2. See all mood entries
3. View charts:
   - Line chart (weekly trend)
   - Bar chart (mood distribution)
4. Change period (Week/Month/All)
5. Delete entry button works

**Mobile:**

1. Tap "📋 History" tab
2. See mood card list
3. Tap "Delete" to remove
4. Swipe period filter

### Test Case 5: Emergency Alert

**Trigger Alert (Advanced):**

1. Log "Sad" mood 6+ times within 7 days
2. Go to Dashboard
3. See alert: "Consider talking to a counselor"

### Test Case 6: Logout

**Web:**

1. Click "Logout" button (top right)
2. Redirected to Login page

**Mobile:**

1. Go to "Profile" tab
2. Scroll down
3. Tap "Logout"
4. Confirm logout
5. Redirected to Login

---

## 🔍 Troubleshooting

### Problem: Backend won't start

**Error:** `Cannot connect to MongoDB`

**Solution:**

```bash
# Check if MongoDB is running
# Windows: Services → MongoDB
# macOS: brew services list
# Linux: sudo systemctl status mongod

# Or use MongoDB Atlas (Cloud)
# Update MONGODB_URI in .env with Atlas connection string
```

### Problem: Web can't connect to backend

**Error:** `Failed to fetch from API`

**Solution:**

```bash
# 1. Verify backend is running on port 5000
# 2. Check REACT_APP_API_URL in web/.env
# 3. Restart web: npm start
```

### Problem: Mobile can't connect to backend

**Error:** `Network Error` or `Connection refused`

**Solution for Android Emulator:**

```
# Update mobile/.env
REACT_APP_API_URL=http://10.0.2.2:5000/api
# (Not localhost, use 10.0.2.2)
```

**Solution for Physical Device:**

```
# Find your computer IP:
Windows: ipconfig → IPv4 Address
macOS: ifconfig → inet (en0)
Linux: hostname -I

# Update mobile/.env
REACT_APP_API_URL=http://YOUR_IP:5000/api
# Example: http://192.168.1.10:5000/api
```

### Problem: Port already in use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**

```bash
# Windows: Find process using port 5000
netstat -ano | findstr :5000
# Kill it:
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000
kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

### Problem: npm install fails

**Error:** `npm ERR! code ERESOLVE`

**Solution:**

```bash
# Use legacy dependency resolution
npm install --legacy-peer-deps

# Or update npm
npm install -g npm@latest
```

### Problem: Expo app won't load

**Error:** `Error downloading SDK` or `Connection timeout`

**Solution:**

```bash
# Clear Expo cache
expo cache clear

# Restart the app
npm start

# Or reset cache completely
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## 📊 API Reference

### Test Endpoints with curl or Postman

**Health Check:**

```bash
curl http://localhost:5000/api/health
```

**Register User:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Create Mood (use token from login response):**

```bash
curl -X POST http://localhost:5000/api/moods \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "mood": "Happy",
    "reason": "Had a great day!"
  }'
```

**Get Moods:**

```bash
curl http://localhost:5000/api/moods \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Get Stats:**

```bash
curl http://localhost:5000/api/moods/stats?period=week \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🚀 Performance Tips

1. **Backend**
   - Add database indexes for faster queries
   - Implement caching for stats
   - Monitor MongoDB connection pool

2. **Web**
   - Enable production build: `npm run build`
   - Lazy load charts
   - Implement pagination for mood history

3. **Mobile**
   - Use React.memo to prevent re-renders
   - Optimize images
   - Use local caching with AsyncStorage

---

## 📱 Device Specifications

| Device  | OS         | Tested | Notes             |
| ------- | ---------- | ------ | ----------------- |
| Desktop | Windows    | ✅     | Works perfectly   |
| Desktop | macOS      | ✅     | Works perfectly   |
| Desktop | Linux      | ✅     | Works perfectly   |
| Phone   | iOS 14+    | ✅     | Requires Expo Go  |
| Phone   | Android 8+ | ✅     | Requires Expo Go  |
| Tablet  | iPad       | ✅     | Web is responsive |
| Tablet  | Android    | ✅     | Mobile app works  |

---

## 🔐 Security Tips

1. **Change JWT Secret**

   ```
   # Generate secure key
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   # Update in backend/.env: JWT_SECRET=<generated_key>
   ```

2. **Enable HTTPS in Production**
   - Use nginx or Let's Encrypt
   - Update CORS origins

3. **Validate All Inputs**
   - Backend validates automatically
   - Never trust client-side validation alone

4. **Keep Dependencies Updated**
   ```bash
   npm outdated
   npm update
   ```

---

## 📚 Additional Resources

- **MongoDB Docs:** https://docs.mongodb.com/
- **Express Docs:** https://expressjs.com/
- **React Docs:** https://react.dev/
- **React Native:** https://reactnative.dev/
- **Expo Docs:** https://docs.expo.dev/

---

## ✅ Quick Checklist

- [ ] Node.js v14+ installed
- [ ] MongoDB running (local or Atlas)
- [ ] Backend folder cloned/created
- [ ] Backend `.env` configured
- [ ] Backend npm installed
- [ ] Backend running on port 5000
- [ ] Web folder cloned/created
- [ ] Web `.env` configured
- [ ] Web npm installed
- [ ] Web running on port 3000
- [ ] Mobile folder cloned/created
- [ ] Mobile `.env` configured
- [ ] Mobile npm installed
- [ ] Mobile running via Expo
- [ ] Test account created
- [ ] Test mood logged
- [ ] History viewable
- [ ] All features working

---

## 🎉 You're All Set!

All three applications should now be running:

- **Backend:** http://localhost:5000
- **Web:** http://localhost:3000
- **Mobile:** Scan Expo QR code

Enjoy tracking moods! 😊📱💻

---

**Having issues?** Check individual README files:

- `backend/README.md` - Backend-specific help
- `web/README.md` - Web app troubleshooting
- `mobile/README.md` - Mobile app setup

**Questions?** Contact the development team or refer to the main README.md
