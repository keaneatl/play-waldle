import { Box, CircularProgress, styled } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useAuthContext } from "../components/contexts/AuthContext";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import getGuessResult, {
  Target,
  Guess,
} from "../components/helpers/backend/getGuessResult";
import WeeklyMap from "../public/Weekly.jpg";
import { useStopwatch } from "../components/hooks/useStopwatch";
import { Dispatch, SetStateAction } from "react";
import Dropdown from "../components/menus/Dropdown";
import Markers from "../components/helpers/Markers";
import {
  collection,
  getDocs,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";
import { database } from "../firebase/app";
import saveData, {
  GameData,
  Character,
} from "../components/helpers/backend/setSavedData";
import Drawer from "../components/menus/Drawer";
import { useRouter } from "next/router";

interface Category {
  name: string;
  author: string;
  credits: string;
  visibility: "public" | "private";
}

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
  const [gameOver, setGameOver] = useState(false);
  const [mapCompleted, setMapCompleted] = useState(false);
  const user = useAuthContext();
  const weeklyCategory = category;
  const router = useRouter();

  const handleActiveGuess = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const image = e.target as HTMLImageElement;
    const imageContainer = e.currentTarget as HTMLDivElement;
    const imageRect = image.getBoundingClientRect();
    const { clientWidth, clientHeight, scrollTop, scrollLeft } = imageContainer;

    setTarget((prevState) =>
      prevState
        ? null
        : {
            cursorX: e.clientX - Math.round(imageRect.left),
            cursorY: e.clientY - Math.round(imageRect.top),
            outerRect: { clientWidth, clientHeight, scrollTop, scrollLeft },
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
    getGuessResult(
      { character, target, timestamp: elapsed as number, result: "secondary" },
      setGuesses
    );
  };

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const image = e.target as HTMLImageElement;
    const runStopwatch = setIsRunning as Dispatch<SetStateAction<boolean>>;

    runStopwatch(true);
    setMapDimensions({ width: image.width, height: image.height });
  };

  const handleGameLoad = useCallback(async () => {
    const gameDataQuery = query(
      collectionGroup(database, "scores"),
      where("category", "==", weeklyCategory.name)
    );
    const querySnapshot = await getDocs(gameDataQuery);

    querySnapshot.forEach((doc) => {
      const gameData = doc.data() as GameData;
      if (gameData.playerID === user?.uid) {
        setCharacters(gameData.finalResult);
        setGuesses(gameData.guesses);
        setMapCompleted(true);
      }
    });
  }, [user, weeklyCategory]);

  // Check for previous gameData
  useEffect(() => {
    if (!user) {
      router.push("/signin");
    } else {
      handleGameLoad();
    }
  }, [handleGameLoad, user, router]);

  // Guess listener
  useEffect(() => {
    if (mapCompleted || !user) {
      return;
    }

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
  }, [guesses, mapCompleted, user]);

  // Game status listener
  useEffect(() => {
    if (mapCompleted || !user) {
      return;
    }

    const runStopwatch = setIsRunning as Dispatch<SetStateAction<boolean>>;
    if (characters.every((character) => character.status === "success")) {
      runStopwatch(false);

      if (user.displayName) {
        saveData({
          category: weeklyCategory.name,
          guesses: guesses,
          time: elapsed as number,
          player: user.displayName,
          playerID: user.uid,
          finalResult: characters,
        });
      } else {
        saveData({
          category: weeklyCategory.name,
          guesses: guesses,
          time: elapsed as number,
          player: user.email ? user.email : "Player",
          playerID: user.uid,
          finalResult: characters,
        });
      }

      setGameOver(true);
      return;
    } else if (guesses.length > 5) {
      setGameOver(true);
      runStopwatch(false);
    }
    return;
  }, [characters, guesses, mapCompleted, user]);

  return (
    <>
      <Drawer
        showLeaderboard={Boolean(user)}
        gameOver={gameOver || mapCompleted}
        mapCredits={{
          author: weeklyCategory.author,
          credits: weeklyCategory.credits,
        }}
      />
      <Dropdown
        characters={characters}
        onClick={handleGuessEvent}
        activeTarget={Boolean(target)}
      />
      {user ? (
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
            src={WeeklyMap}
            alt="Waldle Daily Map"
            layout="fixed"
            onLoad={handleImageLoad}
          />
        </MapContainer>
      ) : (
        <Box
          width="100%"
          height="80vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Get weekly category to get map, characters, user game data, etc.
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
  const categoryQuerySnapshot = await getDocs(categoryQuery);

  categoryQuerySnapshot.forEach((doc) => {
    category = doc.data() as Category;
  });

  // Load characters for weekly category
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

const MapContainer = styled(Box)`
  margin: 0 auto;
  width: 100vw;
  border: 1px solid black;
  position: relative;
  height: 75vh;
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
