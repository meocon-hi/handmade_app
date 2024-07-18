// Import the functions you need from the SDKs you need

import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAflHadx45eGwsQpsu4zASZdf7tTAHVz-4",
  authDomain: "handmake-app.firebaseapp.com",
  projectId: "handmake-app",
  storageBucket: "handmake-app.appspot.com",
  messagingSenderId: "507464504910",
  appId: "1:507464504910:web:d8494bb4737f67d7fdd51f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

const db = getFirestore();

export {auth,db};