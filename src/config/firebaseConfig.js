// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_FIREBASE_DB_URL,
  databaseURL: import.meta.env.VITE_REACT_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_REACT_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_FIREBASE_API_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
