// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKRrzaagB7CQHxVW6zJLSbQmoYIviNUhc",

  authDomain: "chat-app-c62a4.firebaseapp.com",

  projectId: "chat-app-c62a4",

  storageBucket: "chat-app-c62a4.appspot.com",

  messagingSenderId: "335059383161",

  appId: "1:335059383161:web:9cd839d2ef68b6e20775a8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
