// src/firebase.js
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDP1-2OzOwA6lUCABXOKHTgVQMqV9u84R0",
  authDomain: "camping-trip-planer.firebaseapp.com",
  projectId: "camping-trip-planer",
  storageBucket: "camping-trip-planer.firebasestorage.app",
  messagingSenderId: "892149960928",
  appId: "1:892149960928:web:0859d9968ebd0e29bf4085",
  measurementId: "G-CH3ZRFRVGR",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
