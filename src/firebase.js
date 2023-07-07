// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcT98I4giQMS4DWzcyvECfCC9jQ7FwKVc",

  authDomain: "chat-app-2-5103a.firebaseapp.com",

  projectId: "chat-app-2-5103a",

  storageBucket: "chat-app-2-5103a.appspot.com",

  messagingSenderId: "718382064029",

  appId: "1:718382064029:web:9f2a1ccc4df1a028bf0f74",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
