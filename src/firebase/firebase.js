// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArRV1rE4pP1Q8LUgtdHY13bOcZBn1xSiM",
  authDomain: "maintainiq-702e4.firebaseapp.com",
  projectId: "maintainiq-702e4",
  storageBucket: "maintainiq-702e4.firebasestorage.app",
  messagingSenderId: "861533044001",
  appId: "1:861533044001:web:73c27ea0acff1beda49260",
  measurementId: "G-5FXWYJ4F86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db};