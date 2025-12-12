// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY6kJN7HEKoh1--UmgW9mYlqJMqL011uw",
  authDomain: "bored-app-169ac.firebaseapp.com",
  projectId: "bored-app-169ac",
  storageBucket: "bored-app-169ac.firebasestorage.app",
  messagingSenderId: "887004927458",
  appId: "1:887004927458:web:8f5d2e6f5b3643783315bb",
  measurementId: "G-Z3QN109TLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);