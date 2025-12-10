import { useState, useEffect } from 'react';
import { signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { doc, onSnapshot, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db, appId } from '../utils/firebase';

/**
 * Custom hook for managing Firebase authentication and game state
 * @param {string} roomCode - The room code to sync with
 * @param {boolean} joined - Whether the user has joined a room
 * @returns {object} Game state and update function
 */
export const useGameState = (roomCode, joined) => {
  const [user, setUser] = useState(null);
  const [gameState, setGameState] = useState({
    phase: 'lobby',
    scores: { red: 0, blue: 0 },
    currentWords: [],
    winningBid: 25,
    activeTeam: null,
    giverId: null,
    startTime: null,
    wordsGuessed: [false, false, false, false, false],
    usedWordCount: 0,
    cluesLog: []
  });

  // Auth effect
  useEffect(() => {
    let unsubscribe;
    
    const initAuth = async () => {
      try {
        // Check for custom auth token (backward compatibility with original implementation)
        // This allows the app to work with the old global variable pattern
        const customToken = window.__initial_auth_token;
        if (customToken) {
          await signInWithCustomToken(auth, customToken);
        } else {
          await signInAnonymously(auth);
        }
        
        // Set up auth listener only if Firebase auth succeeded
        try {
          unsubscribe = onAuthStateChanged(auth, u => setUser(u));
        } catch (error) {
          console.warn('Firebase auth listener error:', error.message);
        }
      } catch (error) {
        console.warn('Firebase auth error (using demo mode):', error.message);
        // Set a mock user to allow the app to function in demo mode
        setUser({ uid: 'demo-user-' + Math.random().toString(36).substring(2, 11) });
      }
    };
    
    initAuth();
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  // Firestore listener effect
  useEffect(() => {
    if (!user || !joined || !roomCode || !db) return;
    
    const gameRef = doc(db, 'artifacts', appId, 'public', 'data', 'gamestate', roomCode.toUpperCase());
    
    // Initialize if not exists
    getDoc(gameRef).then((docSnap) => {
      if (!docSnap.exists()) {
        setDoc(gameRef, {
          phase: 'lobby',
          scores: { red: 0, blue: 0 },
          currentWords: [],
          winningBid: 25,
          activeTeam: null,
          giverId: null,
          startTime: null,
          wordsGuessed: [false, false, false, false, false],
          usedWordCount: 0,
          cluesLog: []
        });
      }
    }).catch((error) => {
      console.warn("Firebase initialization error (demo mode):", error.message);
    });

    const unsubscribe = onSnapshot(gameRef, (docSnap) => {
      if (docSnap.exists()) {
        setGameState(docSnap.data());
      }
    }, (error) => {
      console.warn("Firestore sync error (demo mode):", error.message);
    });

    return () => unsubscribe();
  }, [user, joined, roomCode]);

  // Update game function
  const updateGame = async (updates) => {
    if (!user || !roomCode || !db) return;
    
    try {
      const gameRef = doc(db, 'artifacts', appId, 'public', 'data', 'gamestate', roomCode.toUpperCase());
      await updateDoc(gameRef, updates);
    } catch (error) {
      console.warn("Firebase update error (demo mode):", error.message);
      // In demo mode, update local state as fallback
      setGameState(prev => ({ ...prev, ...updates }));
    }
  };

  return { user, gameState, updateGame };
};
