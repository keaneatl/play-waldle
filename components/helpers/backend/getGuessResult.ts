import { Dispatch, SetStateAction } from "react";
import { getDoc, doc } from "firebase/firestore";
import { database } from "../../../firebase/app";

interface CharData {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface MouseCoordinates {
  cursorX: number;
  cursorY: number;
}

interface MapContainer {
  clientWidth: number;
  clientHeight: number;
  scrollTop: number;
  scrollLeft: number;
}

interface Target extends MouseCoordinates {
  outerRect: MapContainer;
}

interface Guess {
  character: string;
  target?: Target;
  result: "success" | "warning" | "secondary";
  timestamp: number;
}

function isWithin(value: number, lowerLimit: number, upperLimit: number) {
  return value >= lowerLimit && value <= upperLimit;
}

function checkIfWIthinFrame(characterRange: CharData, target: Target) {
  const { minX, maxX, minY, maxY } = characterRange;
  const { outerRect, cursorX, cursorY } = target;

  const isWithinWidth =
    isWithin(
      minX,
      cursorX - (cursorX - outerRect.scrollLeft),
      cursorX + (outerRect.clientWidth + outerRect.scrollLeft - cursorX)
    ) ||
    isWithin(
      maxX,
      cursorX - (cursorX - outerRect.scrollLeft),
      cursorX + (outerRect.clientWidth + outerRect.scrollLeft - cursorX)
    );

  const isWithinHeight =
    isWithin(
      minY,
      cursorY - (cursorY - outerRect.scrollTop),
      cursorY + (outerRect.clientHeight + outerRect.scrollTop - cursorY)
    ) ||
    isWithin(
      maxY,
      cursorY - (cursorY - outerRect.scrollTop),
      cursorY + (outerRect.clientHeight + outerRect.scrollTop - cursorY)
    );

  if (isWithinWidth && isWithinHeight) {
    return true;
  }

  return false;
}

const getGuessResult = async (
  guess: Guess,
  resultHandler: Dispatch<SetStateAction<Guess[]>>
) => {
  const { target, character, timestamp } = guess;
  const { cursorX, cursorY } = target as Target;
  const charSnap = await getDoc(doc(database, "characters", character));
  const { minX, maxX, minY, maxY } = charSnap.data() as CharData;
  const isWithinX = isWithin(cursorX, minX, maxX);
  const isWithinY = isWithin(cursorY, minY, maxY);

  if (isWithinX && isWithinY) {
    resultHandler((prevGuesses) => [
      ...prevGuesses,
      {
        target,
        character,
        result: "success",
        timestamp,
      },
    ]); // handle found state
  } else {
    const isWithinFrame = checkIfWIthinFrame(
      { minX, maxX, minY, maxY },
      target as Target
    );
    if (isWithinFrame) {
      resultHandler((prevGuesses) => [
        ...prevGuesses,
        {
          target,
          character,
          result: "warning",
          timestamp,
        },
      ]); // handle within-frame state
    } else {
      resultHandler((prevGuesses) => [
        ...prevGuesses,
        {
          target,
          character,
          result: "secondary",
          timestamp,
        },
      ]); // handle total miss state
    }
  }
};

export default getGuessResult;
export { type Target, type Guess };
