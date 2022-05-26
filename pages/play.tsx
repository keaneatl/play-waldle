import {
  Box,
  CircularProgress,
  Container,
  LinearProgress,
  styled,
} from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthContext } from "../components/contexts/AuthContext";
import { SyntheticEvent, useEffect, useState, useRef } from "react";
import { getCharsData } from "../components/helpers/getCharacters";
import Characters from "../components/menus/Characters";
import { useGameState } from "../components/hooks/useGuess";
import DailyMap from "../public/Today.jpg";

type Character = { name: string; status: string | null };
type Characters = Character[] | null;
type Target = {
  cursorX: number;
  cursorY: number;
};

const Play: NextPage = () => {
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const [characters, setCharacters] = useState<Characters>(null);
  const [guesses, makeAGuess] = useGameState();
  const [activeTarget, setActiveTarget] = useState<null | Target>(null);
  const targetBox = { offsetLeft: 25, offsetTop: 25 }; // center targetBox accdording to its dimensions
  const user = useAuthContext();
  const router = useRouter();

  const handleActiveGuess = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const imageContainer = e.target as HTMLImageElement;
    const imageContainerRect = imageContainer.getBoundingClientRect();

    setActiveTarget((prevState) =>
      prevState
        ? null
        : {
            cursorX: e.clientX - Math.round(imageContainerRect.left),
            cursorY: e.clientY - Math.round(imageContainerRect.top),
          }
    );
  };

  const handleGuessEvent = () => {
    // TODO: VERIFY EACH GUESS
  };

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const image = e.target as HTMLImageElement;

    setMapDimensions({ width: image.width, height: image.height });
  };

  useEffect(() => {
    const getGameData = () => {
      getCharsData("Today", setCharacters);
    };

    if (!user) {
      router.push("/signin");
    } else {
      getGameData();
    }
  }, [user, router]);

  return (
    <>
      {user ? (
        <>
          {characters && (
            <Characters
              characters={characters}
              activeTarget={Boolean(activeTarget)}
            />
          )}
          <MapContainer
            onClick={handleActiveGuess}
            sx={{
              maxWidth: mapDimensions.width,
              maxHeight: mapDimensions.height,
            }}
          >
            {activeTarget && (
              <TargetBox
                sx={{
                  top: activeTarget.cursorY - targetBox.offsetTop,
                  left: activeTarget.cursorX - targetBox.offsetLeft,
                }}
              />
            )}
            <Image
              src={DailyMap}
              alt="Waldle Daily Map"
              layout="fixed"
              onLoad={handleImageLoad}
            />
          </MapContainer>
        </>
      ) : (
        <LoadingContainer>
          <CircularProgress color="secondary" />
        </LoadingContainer>
      )}
    </>
  );
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
