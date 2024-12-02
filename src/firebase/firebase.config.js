// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjp3-ZlcKCkbJFLUp9Fvu93lzFiXV4C2o",
  authDomain: "coffee-shop12.firebaseapp.com",
  projectId: "coffee-shop12",
  storageBucket: "coffee-shop12.firebasestorage.app",
  messagingSenderId: "286488260900",
  appId: "1:286488260900:web:2278c2b9567d27fab843b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
