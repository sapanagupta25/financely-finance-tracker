import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCVAzU2sfre9PHX6BDhUUk88IF3xCFyfSo",
  authDomain: "financely-rec-d8b3d.firebaseapp.com",
  projectId: "financely-rec-d8b3d",
  storageBucket: "financely-rec-d8b3d.firebasestorage.app",
  messagingSenderId: "362863752250",
  appId: "1:362863752250:web:1ae790844ec9d794287103",
  measurementId: "G-7TSGLQSB88"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };