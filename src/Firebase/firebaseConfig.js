import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from 'firebase/firestore'


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDsEgfRGYqFRTSjNAXQK44-lYs0lXJ01d4",
  authDomain: "marvel-quiz-3c693.firebaseapp.com",
  projectId: "marvel-quiz-3c693",
  storageBucket: "marvel-quiz-3c693.appspot.com",
  messagingSenderId: "428615253935",
  appId: "1:428615253935:web:2adf2eb9f5596d38fdb95a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const firestore = getFirestore();

export const user = uid => doc(firestore, `users/${uid}`);