// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhUNdOTB8t9vPw4sviaLCp3YiCuMFsQ6o",
  authDomain: "sociality-app-64d70.firebaseapp.com",
  projectId: "sociality-app-64d70",
  storageBucket: "sociality-app-64d70.appspot.com",
  messagingSenderId: "782808346451",
  appId: "1:782808346451:web:2d4dc2c883abfe9e733ba6",
  measurementId: "G-DW4J6N5KP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)