# Client Mood Tracker - Mobile App (React Native + Expo)

A cross-platform mobile application for tracking moods with intelligent suggestions, built with React Native and Expo.

## Features

- User authentication (register/login)
- 7 emotion mood tracking
- Smart mood-based suggestions
- Mood history with filtering
- Dashboard with statistics
- Bottom tab navigation
- Push notifications (8 PM daily reminder)
- Offline support
- Works on iOS and Android

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (for testing)

## Installation

### 1. Setup Backend & Web First

Make sure you have the backend running on `http://localhost:5000`

### 2. Install Mobile App

Navigate to the mobile directory:

```bash
cd mobile
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```bash
cp .env.example .env
```

Update `.env` if needed:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start the App

Start Expo:

```bash
npm start
```

Or with specific platform:

```bash
npm run android  # Android
npm run ios      # iOS
npm run web      # Web
```

## Project Structure

```
mobile/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── MoodEntryScreen.js
│   │   ├── HistoryScreen.js
│   │   └── ProfileScreen.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── api.js
│   └── styles/
│       ├── colors.js
│       └── typography.js
├── App.js
├── app.json
├── package.json
└── README.md
```

## Screens

### Login Screen

- Email and password login
- Link to register
- Token saved to AsyncStorage

### Register Screen

- User registration with name, email, password
- Password confirmation
- Automatic login after registration

### Dashboard Screen

- Welcome message
- Latest mood display
- Weekly statistics
- Quick action buttons
- Logout option

### Mood Entry Screen

- 7 emotion mood selection
- Reason text input (max 500 chars)
- Automatic suggestion generation
- Form validation

### History Screen

- List of all mood entries
- Filter by period (week/month/all time)
- Delete mood entries
- Empty state message

### Profile Screen

- User profile information
- Account settings
- App version and description
- Logout button

## Navigation

**Bottom Tab Navigation:**

- 📊 Home (Dashboard)
- ➕ Log (Mood Entry)
- 📋 History
- 👤 Profile

**Stack Navigation:**

- Login → Register (Auth flow)
- Main App (Tab Navigator)

## Technologies Used

- **React Native 0.72** - Mobile framework
- **Expo 49** - Development & deployment
- **React Navigation 6** - Navigation library
- **Axios** - HTTP client
- **expo-async-storage** - Local storage
- **expo-notifications** - Push notifications

## API Integration

All API calls through `src/services/api.js`:

```javascript
authService.login(data);
authService.register(data);

moodService.createMood(data);
moodService.getMoods(startDate, endDate);
moodService.getMoodStats(period);
moodService.deleteMood(id);
```

## Running on Devices

### Android Emulator

```bash
npm run android
```

Requires Android Studio and emulator setup.

### iOS Simulator

```bash
npm run ios
```

Requires Xcode (macOS only).

### Physical Device

1. Install Expo Go from Play Store or App Store
2. Run: `npm start`
3. Scan QR code with phone camera or Expo Go app

## Building for Production

### Android APK

```bash
eas build --platform android
```

### iOS App

```bash
eas build --platform ios
```

Requires Expo account and EAS CLI setup.

## Features in Detail

### Authentication

- JWT token-based
- Token stored in AsyncStorage
- Automatic persistence
- Logout functionality

### Mood Tracking

- 7 emotion types: Happy, Sad, Angry, Anxious, Neutral, Excited, Tired
- Required reason description
- Automatic suggestions
- Timestamp tracking

### Smart Suggestions

- Happy → Gratitude journaling
- Sad → Deep breathing, journaling
- Angry → Walking, deep breaths
- Anxious → Grounding techniques
- Neutral → Reflection
- Excited → Goal setting
- Tired → Rest tips

### Statistics

- Weekly mood distribution
- Total entries count
- Most frequent mood
- Period filtering (week/month/all)

### Notifications

- Daily reminder at 8 PM
- Requires user permission
- Persistent across sessions

## Styling

Uses custom color and typography system:

**Colors:**

- Primary: #6366f1
- Secondary: #10b981
- Danger: #ef4444
- Dark: #1f2937
- Light: #f9fafb

**Typography:**

- Heading: 700 @ 24px
- Label: 600 @ 14px
- Body: 400 @ 14px

## Performance

- Optimized renders with React.memo
- Efficient state management
- Minimal dependencies
- Lazy loading screens
- Caching strategy

## Security

- JWT token authentication
- Secure AsyncStorage usage
- HTTPS ready
- Input validation
- Protected routes

## Troubleshooting

### App won't connect to backend

- Check if backend is running on port 5000
- Update `REACT_APP_API_URL` in `.env`
- Ensure phone is on same network
- Try `http://10.0.2.2:5000` on Android emulator

### Notifications not working

- Grant notification permissions when prompted
- Check device notification settings
- Restart app if permissions changed

### AsyncStorage errors

- Clear app cache
- Reinstall app
- Check device storage space

## Future Enhancements

- [ ] Dark mode support
- [ ] Offline sync
- [ ] Data export (CSV)
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Customizable notifications
- [ ] Mood triggers analysis
- [ ] Therapy integration
- [ ] Social sharing
- [ ] Voice entry support

## License

MIT

## Support

For issues or feature requests, contact the team.
