// Firebase Configuration and Initialization
// This file sets up Firebase Authentication and Firestore for the application

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase configuration object
// Uses environment variables if available, otherwise falls back to hardcoded values
// To use environment variables, create a .env file with:
// VITE_FIREBASE_API_KEY=your_api_key
// VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
// etc.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAyjeouVKRyR3tLsF916hqaFrim4vI1VKo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "blood-lifeline-now.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "blood-lifeline-now",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "blood-lifeline-now.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1028974074010",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1028974074010:web:96387d07f31a3e00672723",
};

// Initialize Firebase App
// getApps() checks if Firebase has already been initialized to prevent duplicate initialization
// This is important in development with hot module reloading
let app: FirebaseApp;

if (getApps().length === 0) {
  // No Firebase app exists yet, initialize a new one
  app = initializeApp(firebaseConfig);
} else {
  // Firebase app already exists, use the existing one
  app = getApps()[0];
}

// Initialize Firebase Authentication
// This provides authentication services (email/password, Google, etc.)
// Import and use like this:
// import { auth } from "@/integrations/firebase/firebase";
export const auth: Auth = getAuth(app);

// Initialize Cloud Firestore
// This is Firebase's NoSQL database for storing and syncing data
// Import and use like this:
// import { db } from "@/integrations/firebase/firebase";
export const db: Firestore = getFirestore(app);

// Export the Firebase app instance in case it's needed for other Firebase services
export { app };

