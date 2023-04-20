// Import the functions you need from the SDKs you need
import { initializeApp , getApp , getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMl9bsqABdotm33AnhOP-BTsknce-tQdk",
  authDomain: "instagram-9fc2a.firebaseapp.com",
  projectId: "instagram-9fc2a",
  storageBucket: "instagram-9fc2a.appspot.com",
  messagingSenderId: "785396722858",
  appId: "1:785396722858:web:4958b72e1a4673110534d3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()

export {app , db , storage};