// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyJlXjyEVPNKCKbylbNFt-eneV-H-uYB8",
  authDomain: "meditate-app-6c2e5.firebaseapp.com",
  projectId: "meditate-app-6c2e5",
  storageBucket: "meditate-app-6c2e5.firebasestorage.app",
  messagingSenderId: "920547427099",
  appId: "1:920547427099:web:7a38951f5664618b3b49be",
  measurementId: "G-K7MHGCM1TY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);