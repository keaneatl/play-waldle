import { database } from "../../../firebase/app";
import { doc, updateDoc } from "firebase/firestore";
import { type user } from "../../contexts/AuthContext";

const setScores = (user: user, time: number, map: string) => {
  const uid = user.uid;
  const userDocRef = doc(database, "users", uid);
  updateDoc(userDocRef, {
    [`scores.${map}`]: time,
  });
};

export default setScores;
