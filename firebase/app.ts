import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your firebase config here :)
const firebaseConfig = {
  apiKey: "AIzaSyA3d3zuA7err1acw0ex2GqpEd3iiq9_pwI",
  authDomain: "where-is-waldo-5082c.firebaseapp.com",
  projectId: "where-is-waldo-5082c",
  storageBucket: "where-is-waldo-5082c.appspot.com",
  messagingSenderId: "361954758980",
  appId: "1:361954758980:web:f4ed8c6c5ac67236144711",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp);
const authentication = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, database, authentication, storage };
