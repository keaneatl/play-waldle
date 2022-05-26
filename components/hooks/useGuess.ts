import { useState, Dispatch, SetStateAction } from "react";
import { getDoc, doc } from "firebase/firestore";
import { database } from "../../firebase/app";

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

interface Target extends MouseCoordinates {
  outerRect: HTMLDivElement;
}

interface Guess extends MouseCoordinates {
  character: string;
  result: string;
}

function isWithin(value: number, lowerLimit: number, upperLimit: number) {
  return value >= lowerLimit && value <= upperLimit;
}

async function verify(
  charName: string,
  target: Target,
  resultHandler: Dispatch<SetStateAction<Guess[]>>
) {
  const charSnap = await getDoc(doc(database, "characters", charName));
  const { minX, maxX, minY, maxY } = charSnap.data() as CharData;
  const { cursorX, cursorY } = target;
  const isWithinX = isWithin(cursorX, minX, maxX);
  const isWithinY = isWithin(cursorY, minY, maxY);

  // if minX is within cursorX + divWidth/2 or if minX is within cursorX - divWidth/2
  if (isWithinX && isWithinY) {
    resultHandler((prevGuesses) => [
      ...prevGuesses,
      {
        cursorX,
        cursorY,
        character: charName,
        result: "success",
      },
    ]); // FOUND
  } else {
    const isWithinFrame = verifyIfWIthinFrame(
      { minX: minX, maxX: maxX, minY: minY, maxY: maxY },
      target
    );
    if (isWithinFrame) {
      resultHandler((prevGuesses) => [
        ...prevGuesses,
        {
          cursorX,
          cursorY,
          character: charName,
          result: "warning",
        },
      ]); // IN FRAME
    } else {
      resultHandler((prevGuesses) => [
        ...prevGuesses,
        {
          cursorX,
          cursorY,
          character: charName,
          result: "secondary",
        },
      ]); // TOTAL MISS
    }
  }
}

function verifyIfWIthinFrame(characterRange: CharData, target: Target) {
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

export const useGameState = () => {
  const [guesses, setGuesses] = useState<Guess[]>([]);

  const makeAGuess = (character: string, target: Target) => {
    verify(character, target, setGuesses);
  };

  return [guesses, makeAGuess];
};
