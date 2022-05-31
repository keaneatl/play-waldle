import { query, collection, getDocs, where } from "firebase/firestore";
import { database } from "../../../firebase/app";

type Character = { name: string; status: string };

const getCharsData = async (
  category: string,
  charsSetter: (charsData: Character[]) => void
) => {
  const charsData: Character[] = [];
  const charactersQuerySnapshot = await getDocs(
    query(collection(database, "characters"), where("category", "==", category))
  );

  charactersQuerySnapshot.forEach((doc) => {
    charsData.push({ name: doc.id, status: "secondary" });
  });
  charsSetter(charsData);
};

export default getCharsData;
export { type Character };
