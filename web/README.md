# Client Mood Tracker - Web Frontend

A modern, responsive React.js web application for tracking moods with analytics, suggestions, and history management.

## Features

- User authentication (register/login)
- Mood entry with 7 emotion types
- Smart mood-based suggestions
- Dashboard with statistics
- Mood history with charts
- Weekly and monthly analytics
- Responsive design (desktop and tablet)
- Emergency alerts for concerning patterns

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Navigate to the web directory

```bash
cd web
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file

```bash
cp .env.example .env
```

4. Update `.env` with your backend API URL

```
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the development server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
web/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.js
│   │   ├── MoodCard.js
│   │   └── StatCard.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── DashboardPage.js
│   │   ├── MoodEntryPage.js
│   │   └── HistoryPage.js
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   ├── mood-entry.css
│   │   └── history.css
│   ├── App.js
│   └── index.js
├── .env.example
├── package.json
└── README.md
```

## Pages

### Login Page

- Email and password login
- Link to register
- JWT token stored in localStorage

### Register Page

- Register new user with name, email, password
- Password confirmation
- Automatic login after registration

### Dashboard

- Welcome message
- Latest mood display
- Weekly statistics
- Mood distribution
- Quick action buttons
- Logout button

### Mood Entry

- 7 emotion mood selection
- Reason text input (max 500 characters)
- Automatic suggestion generation
- Form validation
- Success confirmation

### History

- All mood entries with filters
- Weekly/monthly/all-time views
- Line chart showing mood trend
- Bar chart showing mood distribution
- Edit and delete mood entries
- Empty state when no entries

## Technologies

- **React 18** - UI Framework
- **React Router 6** - Client-side routing
- **Axios** - HTTP client
- **Chart.js** - Analytics charts
- **React ChartJS 2** - React wrapper for Chart.js
- **CSS3** - Styling (no CSS framework)

## API Integration

All API calls are made through the `api.js` service:

```javascript
// Authentication
authService.register(data);
authService.login(data);
authService.getMe();

// Moods
moodService.createMood(data);
moodService.getMoods(startDate, endDate);
moodService.getMoodStats(period);
moodService.getMoodById(id);
moodService.updateMood(id, data);
moodService.deleteMood(id);
```

## Features in Detail

### Authentication

- JWT token-based authentication
- Token stored in localStorage
- Protected routes
- Automatic logout

### Mood Tracking

- 7 emotion options: Happy, Sad, Angry, Anxious, Neutral, Excited, Tired
- Required reason/description
- Timestamp tracking
- Edit and delete capabilities

### Smart Suggestions

Automatic suggestions based on mood:

- **Happy** → Gratitude journaling
- **Sad** → Deep breathing, journaling
- **Angry** → Walking, deep breaths
- **Anxious** → Grounding techniques
- **Neutral** → Reflection
- **Excited** → Goal setting
- **Tired** → Rest tips

### Analytics

- Weekly trend chart
- Mood distribution bar chart
- Statistics for past 7 days/30 days/all time
- Most frequent mood calculation
- Emergency alert for excessive sad mood

### Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop support
- Touch-friendly buttons
- Prevents zoom on iOS

## Environment Variables

```
REACT_APP_API_URL - Backend API base URL (default: http://localhost:5000/api)
```

## Building for Production

```bash
npm run build
```

Creates a `build` folder with optimized production files.

## Deployment

Can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- AWS Amplify
- Traditional web hosting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Code splitting with React Router
- Lazy component loading
- Optimized re-renders
- Efficient state management
- Chart optimization for large datasets

## Security

- JWT token authentication
- Secure token storage
- HTTPS ready (in production)
- Input validation
- Protected routes

## Future Enhancements

- [ ] Dark mode
- [ ] Data export (CSV/PDF)
- [ ] Mood triggers analysis
- [ ] Peer support messaging
- [ ] Mobile app notifications
- [ ] Advanced analytics
- [ ] Therapist integration
- [ ] Offline support

## License

MIT

## Support

For issues or feature requests, please reach out.
