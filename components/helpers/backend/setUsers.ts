import { database } from "../../../firebase/app";
import { doc, setDoc } from "firebase/firestore";
import { type user } from "../../contexts/AuthContext";

const setUsers = (user: user) => {
  const { uid, displayName, photoURL, emailVerified, isAnonymous, email } =
    user;
  const userData = {
    uid,
    displayName,
    email,
    photoURL,
    emailVerified,
    isAnonymous,
  };
  setDoc(doc(database, "users", userData.uid), userData);
};

export default setUsers;
