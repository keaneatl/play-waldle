import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { GameData } from "./setSavedData";
import { Guess } from "./getGuessResult";
import { database } from "../../../firebase/app";

interface Score {
  player: string;
  category: string;
  guesses: Array<Omit<Guess, "target">>;
  time: number;
}

const getScores = async (
  map: string,
  scoresHandler: Dispatch<SetStateAction<Array<Score>>>
) => {
  const scores: Array<Score> = [];
  const scoresQuery = query(
    collectionGroup(database, "scores"),
    where("category", "==", map)
  );
  const querySnapshot = await getDocs(scoresQuery);

  querySnapshot.forEach((doc) => {
    const gameData = doc.data() as GameData;
    const { category, time, player, guesses } = gameData;
    const score: Score = {
      category,
      player,
      guesses,
      time,
    };
    scores.push(score);
  });

  scoresHandler(scores as Array<GameData>);
};

export default getScores;
export { type Score };
