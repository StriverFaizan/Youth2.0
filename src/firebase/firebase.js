// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp_QGbW73FEk8ax3aLHAvPHEcPrHm1G_g",
  authDomain: "e-learning-base.firebaseapp.com",
  projectId: "e-learning-base",
  storageBucket: "e-learning-base.firebasestorage.app",
  messagingSenderId: "883157821195",
  appId: "1:883157821195:web:c29a16bd0b58583aa1e40e",
  measurementId: "G-BE0X5E5SJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, auth, db };