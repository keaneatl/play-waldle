import { MoreHoriz, Square } from "@mui/icons-material";
import { styled, Stack, Tooltip, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Guess } from "../helpers/backend/getGuessResult";

type Props = {
  guesses: Guess[];
};

const Results = ({ guesses }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      <ToggleContainer>
        <IconButton onClick={handleToggle}>
          <MoreHoriz color="primary" />
        </IconButton>
      </ToggleContainer>
      {isOpen && (
        <GuessResultsContainer direction="row">
          {guesses.length > 0 ? (
            <>
              {guesses.map((guess, i) => (
                <Tooltip title={guess.character} key={`result_${i}`}>
                  <Square color={guess.result} sx={{ fontSize: "4rem" }} />
                </Tooltip>
              ))}
            </>
          ) : (
            <EmptyGuessContainer>
              <Typography>No guesses yet, go ahead and make one! 😉</Typography>
            </EmptyGuessContainer>
          )}
        </GuessResultsContainer>
      )}
    </>
  );
};

export default Results;

const ToggleContainer = styled(Box)`
  height: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #000000;
`;

const GuessResultsContainer = styled(Stack)`
  justify-content: center;
  flex-wrap: wrap;
  z-index: 1;
  position: absolute;
  background-color: transparent;
  width: 100%;
  justify-content: space-around;
`;

const EmptyGuessContainer = styled(Box)(
  ({ theme }) => `
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  background-color: ${theme.palette.primary.main};
`
);
