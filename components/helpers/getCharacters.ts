import { query, collection, getDocs, where } from "firebase/firestore";
import { database } from "../../firebase/app";

type Character = { name: string; status: string | null };
type Characters = Character[] | null;

export const getCharsData = async (
  category: string,
  charsSetter: (charsData: Characters) => void
) => {
  const charsData: Characters = [];
  const charactersQuerySnapshot = await getDocs(
    query(collection(database, "characters"), where("category", "==", "Today"))
  );

  charactersQuerySnapshot.forEach((doc) => {
    charsData.push({ name: doc.id, status: null });
  });
  charsSetter(charsData);
};
