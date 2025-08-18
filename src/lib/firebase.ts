// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqO6NddlwE6UfJCVFmsTkVNOfZ3nztc7o",
  authDomain: "e-commerce-c0668.firebaseapp.com",
  projectId: "e-commerce-c0668",
  storageBucket: "e-commerce-c0668.firebasestorage.app",
  messagingSenderId: "984841877435",
  appId: "1:984841877435:web:b4c2bd41cfc060f700f69e",
  measurementId: "G-0BZPY6467T"
};

// Debug: Log the configuration
console.log('Firebase Config Check:', {
  apiKey: firebaseConfig.apiKey ? '✅ Present' : '❌ Missing',
  authDomain: firebaseConfig.authDomain ? '✅ Present' : '❌ Missing',
  projectId: firebaseConfig.projectId ? '✅ Present' : '❌ Missing',
  storageBucket: firebaseConfig.storageBucket ? '✅ Present' : '❌ Missing',
  messagingSenderId: firebaseConfig.messagingSenderId ? '✅ Present' : '❌ Missing',
  appId: firebaseConfig.appId ? '✅ Present' : '❌ Missing',
  measurementId: firebaseConfig.measurementId ? '✅ Present' : '❌ Missing'
});

console.log('Full Firebase Config:', firebaseConfig);

// Check if all required environment variables are present
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  throw new Error('Missing Firebase configuration. Please check your environment variables.');
}

let app: FirebaseApp;
let analytics: Analytics | null = null;
let db: Firestore;
let storage: FirebaseStorage;
let auth: Auth;
let googleProvider: GoogleAuthProvider;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Only initialize analytics on the client side
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
  
  db = getFirestore(app);
  storage = getStorage(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  throw error;
}

export { db, storage, auth, googleProvider, analytics };