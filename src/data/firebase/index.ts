import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore/lite";

export let firebaseApp: Firestore;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  appId: process.env.REACT_APP_APP_ID,
};

export function initializaFirebase() {
  const app = initializeApp(firebaseConfig);
  firebaseApp = getFirestore(app);
}
