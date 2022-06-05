import {
  styled,
  Stack,
  Typography,
  Button,
  LinearProgress,
  Box,
} from "@mui/material";
import { Character } from "../helpers/backend/setSavedData";

type Props = {
  characters: Character[] | null;
  activeTarget: boolean;
  onClick(character: string): void;
};

const Dropdown = ({
  characters,
  activeTarget,
  onClick,
}: Props): JSX.Element => {
  return (
    <>
      {activeTarget && (
        <CharsDataContainer direction="row">
          {characters ? (
            characters.map((character: Character) => {
              return (
                <Item
                  key={character.name}
                  sx={{ backgroundColor: `${character.status}.main` }}
                >
                  <Typography color="primary">{character.name}</Typography>
                  <Button onClick={() => onClick(character.name)}>
                    Select
                  </Button>
                </Item>
              );
            })
          ) : (
            <LoadingContainer>
              <LinearProgress aria-busy />
            </LoadingContainer>
          )}
        </CharsDataContainer>
      )}
    </>
  );
};

export default Dropdown;

const CharsDataContainer = styled(Stack)`
  justify-content: center;
  flex-wrap: wrap;
  z-index: 2;
  position: absolute;
  background-color: transparent;
  width: 100%;
  justify-content: space-around;
`;

const Item = styled(Box)`
  display: flex;
  margin: 10px auto;
  padding: 10px 20px;
  text-align: center;
  align-items: center;
`;

const LoadingContainer = styled(Box)`
  height: 20vh;
  width: 100%;
`;
