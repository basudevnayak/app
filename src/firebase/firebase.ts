import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoK5B5eh6IFS8YLL65WtMNnQ31Q5h7Dto",
  authDomain: "home-automation-56ff8.firebaseapp.com",
  projectId: "home-automation-56ff8",
  storageBucket: "home-automation-56ff8.firebasestorage.app",
  messagingSenderId: "1088940680500",
  appId: "1:1088940680500:web:6a154961d9295ed7003161",
  measurementId: "G-WHGBRT3E8R",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
