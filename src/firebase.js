// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpq9TTWXMPj_9cx2sQiJvPYi3X__B-2rM",

  authDomain: "chat-app-11744.firebaseapp.com",

  projectId: "chat-app-11744",

  storageBucket: "chat-app-11744.appspot.com",

  messagingSenderId: "635641695789",

  appId: "1:635641695789:web:123dfa21d65d6471e3b2a4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
