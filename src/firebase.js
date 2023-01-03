import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-L1ljB7H93kjO-3-pWugZDvScfQ6dbVU",
  authDomain: "blog-app-d5721.firebaseapp.com",
  projectId: "blog-app-d5721",
  storageBucket: "blog-app-d5721.appspot.com",
  messagingSenderId: "988248845036",
  appId: "1:988248845036:web:887421ce154efc9ded53c9",
  measurementId: "G-YT2BH1M0WZ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };