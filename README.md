# 25 Words - Multiplayer Word Game

A real-time multiplayer word guessing game built with React and Firebase.

## Features

- **Real-time multiplayer** gameplay with Firebase sync
- **Production-ready** build system with Vite
- **Modern React** with hooks and functional components
- **Responsive UI** with Tailwind CSS
- **Demo mode** - works without Firebase configuration
- **Optimized builds** with code splitting and minification

## Quick Start

### Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

The app will run in demo mode without Firebase configuration.

### Production Build

Build the app for production:

```bash
npm run build
```

The optimized production files will be in the `dist/` directory.

Preview the production build locally:

```bash
npm run preview
```

## Firebase Configuration (Optional)

To enable real multiplayer functionality with Firebase:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Anonymous sign-in)
4. Enable Firestore Database

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Firebase credentials to `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_APP_ID=your-custom-app-id
   ```

3. Restart the development server

### 3. Deployment

When deploying to production, set these environment variables in your hosting platform (Vercel, Netlify, etc.).

## Project Structure

```
25words/
├── src/
│   ├── components/       # React components
│   │   ├── Button.jsx
│   │   ├── JoinScreen.jsx
│   │   ├── Lobby.jsx
│   │   ├── RevealPhase.jsx
│   │   ├── BiddingPhase.jsx
│   │   ├── PlayingPhase.jsx
│   │   └── RoundSummary.jsx
│   ├── hooks/           # Custom React hooks
│   │   └── useGameState.js
│   ├── utils/           # Utility functions
│   │   ├── firebase.js  # Firebase configuration
│   │   └── words.js     # Word fetching logic
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── .env.example         # Environment variables template
```

## Game Rules

1. **Giver Selection**: One person from each team views the 5 secret words
2. **Bidding**: Teams bid on how many clues they need to help their team guess all 5 words
3. **Playing**: The Giver provides clues, and teammates try to guess all words within the bid limit
4. **Scoring**: Successfully guessing all words within the limit awards 250 points

## Technologies Used

- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Firebase** - Authentication & Firestore for real-time sync
- **Tailwind CSS 3** - Utility-first styling
- **Lucide React** - Beautiful icon library

## Production Optimizations

This refactored version includes several production-ready improvements:

- ✅ **Modular architecture** - Separated components, hooks, and utilities
- ✅ **Build optimization** - Minification, code splitting, tree-shaking
- ✅ **Environment variables** - Secure credential management
- ✅ **Production React builds** - Optimized runtime performance
- ✅ **Pre-compiled JavaScript** - No in-browser transpilation
- ✅ **Proper dependency management** - npm with lock file
- ✅ **Modern tooling** - Vite for fast builds and HMR
- ✅ **Error boundaries** - Graceful error handling
- ✅ **Demo mode** - Works without Firebase configuration

## Migrating from Old Version

The old single-file `index.html` has been backed up as `index.html.backup`. The new version maintains **100% functional compatibility** from an end-user perspective while providing a production-ready architecture.

## License

MIT
