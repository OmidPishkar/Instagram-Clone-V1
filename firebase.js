// Import the functions you need from the SDKs you need
import { initializeApp , getApp , getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your API key",
  authDomain: "instagram-9fc2a.firebaseapp.com",
  projectId: "instagram-9fc2a",
  storageBucket: "instagram-9fc2a.appspot.com",
  messagingSenderId: "785396722858",
  appId: "your app id"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()

export {app , db , storage};
