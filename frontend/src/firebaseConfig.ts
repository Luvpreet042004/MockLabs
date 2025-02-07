// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIQgzKJotc1cK1vVHE_s7sfiuKba8Uv5Y",
  authDomain: "ultimate-tester.firebaseapp.com",
  projectId: "ultimate-tester",
  storageBucket: "ultimate-tester.firebasestorage.app",
  messagingSenderId: "33656292946",
  appId: "1:33656292946:web:fac609d0ba3deda1e8418b",
  measurementId: "G-JGYPPCGNDV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
