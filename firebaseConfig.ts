import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyARhE9lrJ2kEw8uxeQugq_j2MDr4dbaRi8",
  authDomain: "test-expo-ab290.firebaseapp.com",
  projectId: "test-expo-ab290",
  storageBucket: "test-expo-ab290.appspot.com",
  messagingSenderId: "487084301916",
  appId: "1:487084301916:web:3efbd8ac3dd938ab261099",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
