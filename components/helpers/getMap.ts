import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/app";

export const getMap = async (
  category: string,
  mapSetter: (url: string) => void
) => {
  try {
    const mapRef = ref(storage, `maps/${category}.jpg`);
    const url = await getDownloadURL(mapRef);
    console.log(url);
    mapSetter(url);
  } catch (error) {
    alert("error");
  }
};
