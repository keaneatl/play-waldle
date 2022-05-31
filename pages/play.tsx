import { Box, Container, styled } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthContext } from "../components/contexts/AuthContext";
import { SyntheticEvent, useEffect, useState } from "react";
import { Character } from "../components/helpers/backend/getCharacters";
import getGuessResult, {
  Target,
  Guess,
} from "../components/helpers/backend/getGuessResult";
import DailyMap from "../public/Today.jpg";
import { useStopwatch } from "../components/hooks/useStopwatch";
import { Dispatch, SetStateAction } from "react";
import Dropdown from "../components/menus/Dropdown";
import Results from "../components/menus/Results";
import Markers from "../components/helpers/Markers";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebase/app";
import { Category } from "../components/helpers/backend/getCategories";
import setScores from "../components/helpers/backend/setScores";
// TODO: DISPLAY LEADERBOARD AND RESULTS PROPERLY, REPRESENT GAME OVER!!!!!
// LAST TODO: MORE MAPS
type Props = {
  category: Category;
  charactersData: Character[];
};

// center targetBox according to its dimensions
enum targetBoxOffset {
  left = 25,
  top = 25,
}

const Play: NextPage<Props> = ({ category, charactersData }: Props) => {
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [characters, setCharacters] = useState<Character[]>(charactersData);
  const [target, setTarget] = useState<null | Target>(null);
  const [elapsed, setIsRunning] = useStopwatch();
  const user = useAuthContext();
  const weeklyCategory = category;

  const handleActiveGuess = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const image = e.target as HTMLImageElement;
    const imageContainer = e.currentTarget as HTMLDivElement;
    const imageRect = image.getBoundingClientRect();

    setTarget((prevState) =>
      prevState
        ? null
        : {
            cursorX: e.clientX - Math.round(imageRect.left),
            cursorY: e.clientY - Math.round(imageRect.top),
            outerRect: imageContainer,
          }
    );
  };

  const handleGuessEvent = (character: string) => {
    if (!target) {
      alert("Invalid or missing target");
      return;
    } else if (
      characters?.find((char) => char.name === character)?.status ===
        "success" ||
      guesses.length > 5
    ) {
      return;
    }
    getGuessResult({ character, target, result: "secondary" }, setGuesses);
  };

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const image = e.target as HTMLImageElement;
    const runStopwatch = setIsRunning as Dispatch<SetStateAction<boolean>>;

    runStopwatch(true);
    setMapDimensions({ width: image.width, height: image.height });
  };

  // Character State Listener for Characters Menu
  useEffect(() => {
    const latestGuess = guesses.at(-1);

    if (latestGuess) {
      setCharacters((prevState) => {
        const previousCharsState = prevState as Character[];
        return previousCharsState.map((character) => {
          if (character.name === latestGuess.character) {
            character.status = latestGuess.result as string;
          }
          return character;
        });
      });
    }
  }, [guesses]);

  // Gameover listener
  useEffect(() => {
    const runStopwatch = setIsRunning as Dispatch<SetStateAction<boolean>>;
    if (
      guesses.length > 5 ||
      characters.every((character) => character.status === "success")
    ) {
      runStopwatch(false);
      // TODO: Set record for logged in user in database
      if (user && user.displayName) {
        // Require alias, upload score to leaderboard
        setScores(user, elapsed as number, weeklyCategory.name);
      }
    }
    return;
  }, [guesses, user, weeklyCategory, characters]);

  return (
    <>
      <Results guesses={guesses} />
      <Dropdown
        characters={characters}
        onClick={handleGuessEvent}
        activeTarget={Boolean(target)}
      />
      <MapContainer
        onClick={handleActiveGuess}
        sx={{
          maxWidth: mapDimensions.width,
          maxHeight: mapDimensions.height,
        }}
      >
        {target && (
          <TargetBox
            sx={{
              top: target.cursorY - targetBoxOffset.top,
              left: target.cursorX - targetBoxOffset.left,
            }}
          />
        )}
        <Markers guesses={guesses} />
        <Image
          src={DailyMap}
          alt="Waldle Daily Map"
          layout="fixed"
          onLoad={handleImageLoad}
        />
      </MapContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let category: Category = {
    name: "",
    author: "",
    credits: "",
    visibility: "public",
  };
  const categoriesRef = collection(database, "categories");
  const categoryQuery = query(
    categoriesRef,
    where("visibility", "==", "public")
  );
  const querySnapshot = await getDocs(categoryQuery);
  if (querySnapshot.empty) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  querySnapshot.forEach((doc) => {
    category = doc.data() as Category;
  });

  const charsData: Character[] = [];
  const charactersQuerySnapshot = await getDocs(
    query(
      collection(database, "characters"),
      where("category", "==", category.name)
    )
  );

  charactersQuerySnapshot.forEach((doc) => {
    charsData.push({ name: doc.id, status: "secondary" });
  });

  return {
    props: {
      charactersData: charsData,
      category: category,
    },
  };
};

export default Play;

const LoadingContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100vw;
`;

const MapContainer = styled(Box)`
  margin: 0 auto;
  width: 100vw;
  border: 1px solid black;
  position: relative;
  height: 80vh;
  overflow: auto;
  text-align: center;
`;

const TargetBox = styled(Box)`
  z-index: 1;
  border: 5px solid black;
  width: 50px;
  height: 50px;
  position: absolute;
`;
