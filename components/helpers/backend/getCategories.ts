import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../../firebase/app";
import { Dispatch, SetStateAction } from "react";

interface Category {
  name: string;
  author: string;
  credits: string;
  visibility: "public" | "private";
}

const getCategories = async (
  name: string,
  categorySetter: Dispatch<SetStateAction<Category | Category[]>>
) => {
  const categoriesRef = collection(database, "categories");
  if (name === "Weekly") {
    const categoryQuery = query(
      categoriesRef,
      where("visibility", "==", "public")
    );
    const querySnapshot = await getDocs(categoryQuery);
    querySnapshot.forEach((doc) => {
      const category = doc.data() as Category;
      categorySetter(category);
    });
  } else {
    const categoryQuery = query(
      categoriesRef,
      where("visibility", "==", "private")
    );
    const querySnapshot = await getDocs(categoryQuery);
    querySnapshot.forEach((doc) => {
      const category = doc.data() as Category;
      categorySetter((prevState) => [...(prevState as Category[]), category]);
    });
  }
};

export default getCategories;
export { type Category };
