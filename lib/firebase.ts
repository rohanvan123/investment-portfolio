// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-B70HdqUOED_dp0uPPV_GbeM7NSi2bXE",
  authDomain: "investment-portfolio-f10d2.firebaseapp.com",
  databaseURL: "https://investment-portfolio-f10d2-default-rtdb.firebaseio.com",
  projectId: "investment-portfolio-f10d2",
  storageBucket: "investment-portfolio-f10d2.appspot.com",
  messagingSenderId: "39398208123",
  appId: "1:39398208123:web:5ae7b9e58403f97a8f28de",
  measurementId: "G-NBLRRPD9Q6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

export const initFirebase = () => {
  return app;
};
