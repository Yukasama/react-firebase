import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmPh1t_gbcDRMuIcWd5rIF3zquUgC54hg",
  authDomain: "spectre-dev-d9cf3.firebaseapp.com",
  projectId: "spectre-dev-d9cf3",
  storageBucket: "spectre-dev-d9cf3.appspot.com",
  messagingSenderId: "273842604285",
  appId: "1:273842604285:web:b1ecce5c7de06cc4c8d694",
  measurementId: "G-SYY9BS9QEN",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
