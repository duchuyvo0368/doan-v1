import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
const firebaseConfig = {
  apiKey: "AIzaSyBlSxjIDYq8W1l97LuVZl_Sg5OIjgvWyZc",
  authDomain: "ecom-app-21d8a.firebaseapp.com",
  projectId: "ecom-app-21d8a",
  storageBucket: "ecom-app-21d8a.firebasestorage.app",
  messagingSenderId: "457535747513",
  appId: "1:457535747513:web:551c80dfb8e78eced27268",
  measurementId: "G-20GP30B0MZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase;
export const authentication = getAuth(initializeApp(firebaseConfig))