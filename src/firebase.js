import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQOQ5UrR4qh7HRxp9vRYQCvqh70ZP6zdY",
  authDomain: "reactfinalproject-cb224.firebaseapp.com",
  projectId: "reactfinalproject-cb224",
  storageBucket: "reactfinalproject-cb224.appspot.com",
  messagingSenderId: "871459961407",
  appId: "1:871459961407:web:833fbb8f7d03ead96f168a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;