// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqO6NddlwE6UfJCVFmsTkVNOfZ3nztc7o",
  authDomain: "e-commerce-c0668.firebaseapp.com",
  projectId: "e-commerce-c0668",
  storageBucket: "e-commerce-c0668.firebasestorage.app",
  messagingSenderId: "984841877435",
  appId: "1:984841877435:web:b4c2bd41cfc060f700f69e",
  measurementId: "G-0BZPY6467T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();