import { styled, Tooltip } from "@mui/material";
import { LocationOn, Square } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { Guess, Target } from "./backend/getGuessResult";
import { ReactElement } from "react";

type Props = {
  guesses: Guess[];
};

// center markers according to their dimensions
enum markerOffset {
  box = 30,
  location = 60,
}

const Markers = ({ guesses }: Props): JSX.Element => {
  return (
    <>
      {guesses.map((guess, i) => {
        const target = guess.target as Target;
        return (
          <Tooltip
            title={guess.character}
            sx={{
              top:
                target.cursorY -
                (guess.result === "success"
                  ? markerOffset.location
                  : markerOffset.box),
              left: target.cursorX - markerOffset.box,
            }}
            key={`marker_${i}`}
            arrow
          >
            {
              ((guess.result === "success" && (
                <SuccessMarker color={guess.result} />
              )) ||
                (guess.result === "warning" && (
                  <WithinFrameMarker color={guess.result} />
                )) ||
                (guess.result === "secondary" && (
                  <Marker color={guess.result} />
                ))) as ReactElement
            }
          </Tooltip>
        );
      })}
    </>
  );
};

export default Markers;

const hoverOver = keyframes`
from {
  transform: translate(0, 15px);
}
to {
  transform: scale(1.5) translate(0, 0));
}
`;

const pulsate = keyframes`
from {
  transform: scale(1);
}
to {
  transform: scale(1.1);
}
`;

const Marker = styled(Square)`
  font-size: 4rem;
  position: absolute;
  z-index: 1;
`;

const WithinFrameMarker = styled(Marker)`
  animation: ${pulsate} 0.2s linear infinite alternate;
`;

const SuccessMarker = styled(LocationOn)`
  font-size: 4rem;
  position: absolute;
  z-index: 1;
  animation: ${hoverOver} 2s linear 1s infinite alternate;
`;
