import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxZ61fWdC5E7f6fi1CGkz3NqwBO3RpdXE",
  authDomain: "waldle.firebaseapp.com",
  projectId: "waldle",
  storageBucket: "waldle.appspot.com",
  messagingSenderId: "513757604074",
  appId: "1:513757604074:web:c1b695af4dc81ac5d68f93",
  measurementId: "G-XKYKMFLQV6",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp);
const authentication = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, database, authentication, storage };
