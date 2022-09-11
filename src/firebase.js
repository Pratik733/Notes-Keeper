import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCT31eEh0TSCn7vltcRaIlETZiHcg6tUyI",
  authDomain: "note-keeper-733.firebaseapp.com",
  projectId: "note-keeper-733",
  storageBucket: "note-keeper-733.appspot.com",
  messagingSenderId: "818388747663",
  appId: "1:818388747663:web:791e94203b841edab5f7fa",
  measurementId: "G-QKQYD61JG0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();