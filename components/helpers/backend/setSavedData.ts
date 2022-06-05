import { database } from "../../../firebase/app";
import { collection, doc, setDoc } from "firebase/firestore";
import { Guess } from "./getGuessResult";

type Character = { name: string; status: string };

interface GameData {
  category: string;
  player: string;
  playerID: string;
  time: number;
  guesses: Array<Guess>;
  finalResult: Array<Character>;
}

const saveData = async (gameData: GameData) => {
  const { category, player, playerID, time, guesses, finalResult } = gameData;
  const usersRef = collection(database, "users");
  const userScoresRef = doc(usersRef, playerID, "scores", category);

  setDoc(userScoresRef, {
    player: player || "Guest",
    category,
    playerID,
    time,
    guesses,
    finalResult,
  });
};

export default saveData;
export { type GameData, type Character };
