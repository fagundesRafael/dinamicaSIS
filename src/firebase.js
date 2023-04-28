import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB7BWYGnE_vvjmSzQVak7kutH0SYCqQE58",
    authDomain: "lamafirebase-d19be.firebaseapp.com",
    projectId: "lamafirebase-d19be",
    storageBucket: "lamafirebase-d19be.appspot.com",
    messagingSenderId: "838213152951",
    appId: "1:838213152951:web:6d414faa8d7e2d14685d32"
  };
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app)

const storage = getStorage(app);

export { app, auth, db, storage };
