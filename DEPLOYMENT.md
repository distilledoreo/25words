# Deployment Guide

This guide explains how to deploy the 25 Words application to various hosting platforms.

## Build for Production

First, build the application:

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with:
- Minified JavaScript and CSS
- Code splitting for better performance
- Gzip-compressed assets
- Source maps removed

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_APP_ID`

### Option 2: Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

3. Set environment variables in Netlify dashboard under Site Settings → Environment Variables

### Option 3: Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase hosting:
   ```bash
   firebase init hosting
   ```
   - Select `dist` as your public directory
   - Configure as a single-page app: Yes
   - Don't overwrite `dist/index.html`

3. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

### Option 4: Static File Server

Upload the contents of the `dist/` directory to any static file hosting:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- GitHub Pages
- DigitalOcean Spaces

## Environment Variables

For production deployments, set these environment variables:

```env
VITE_FIREBASE_API_KEY=your_production_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_APP_ID=your-custom-app-id
```

**Important**: Never commit `.env` files with real credentials to version control.

## Firebase Security Rules

Set up Firestore security rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /artifacts/{appId}/public/data/gamestate/{roomCode} {
      // Allow authenticated users to read and write game state
      allow read, write: if request.auth != null;
    }
  }
}
```

## Performance Optimization

The production build automatically includes:
- ✅ Minification with Terser
- ✅ Code splitting (React, Firebase, app code)
- ✅ Tree-shaking to remove unused code
- ✅ CSS optimization with Tailwind purging
- ✅ Asset compression

Expected bundle sizes:
- React vendor: ~11 KB (gzipped)
- Firebase vendor: ~328 KB (gzipped ~100 KB)
- App code: ~200 KB (gzipped ~63 KB)
- CSS: ~16 KB (gzipped ~4 KB)

## Monitoring

Consider setting up monitoring:
- Firebase Performance Monitoring
- Google Analytics
- Sentry for error tracking

## Troubleshooting

### Issue: White screen after deployment
- Check browser console for errors
- Verify environment variables are set correctly
- Ensure Firebase credentials are valid

### Issue: Firebase connection fails
- Verify Firebase project is active
- Check Firestore security rules
- Ensure Anonymous authentication is enabled

### Issue: Assets fail to load
- Check that asset paths are correct (should be relative)
- Verify your hosting supports SPA routing
- Check for CORS issues with external APIs

## Demo Mode

The app includes a demo mode that works without Firebase configuration. This is useful for:
- Development
- Testing
- Demos without backend setup

Demo mode limitations:
- No real-time sync between users
- Game state stored locally only
- No persistence across page reloads
