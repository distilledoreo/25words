# 25 Words - Multiplayer Word Game

A real-time multiplayer word guessing game built with React and Firebase.

## Quick Start

1. Open `index.html` in a web browser
2. The app will load with demo/placeholder Firebase credentials

## Setting Up Firebase (Optional)

To enable real multiplayer functionality, you'll need to configure Firebase:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Anonymous sign-in)
4. Enable Firestore Database

### 2. Get Your Firebase Configuration

1. In Firebase Console, go to Project Settings
2. Under "Your apps", add a Web app
3. Copy your Firebase configuration object

### 3. Add Configuration to Your HTML

Add a script tag before the closing `</head>` tag in `index.html`:

```html
<script>
    var __firebase_config = JSON.stringify({
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    });
    var __app_id = "your-custom-app-id"; // Optional: defaults to "default-app-id"
</script>
```

## Game Rules

1. **Giver Selection**: One person from each team views the 5 secret words
2. **Bidding**: Teams bid on how many words they need to help their team guess all 5 words
3. **Playing**: The Giver provides clues, and teammates try to guess all words within the bid limit
4. **Scoring**: Successfully guessing all words within the limit awards 250 points

## Technologies Used

- React 18
- Firebase (Authentication & Firestore)
- Tailwind CSS
- Lucide Icons

## License

MIT
