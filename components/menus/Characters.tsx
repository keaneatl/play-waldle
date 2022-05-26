import { MoreHoriz } from "@mui/icons-material";
import {
  styled,
  Stack,
  Paper,
  Divider,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

type Character = { name: string; status: string | null };

type Props = {
  characters: Character[] | null;
  activeTarget: boolean;
  onClick?: (param?: unknown) => void;
};

const Characters = ({
  characters,
  activeTarget,
  onClick = (value: unknown) => console.log(value),
}: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      <ToggleContainer>
        <IconButton onClick={handleToggle}>
          <MoreHoriz color="primary" />
        </IconButton>
      </ToggleContainer>
      {(isOpen || activeTarget) && (
        <CharsDataContainer
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          {characters?.map((character: Character) => {
            return (
              <Item
                key={character.name}
                sx={{ backgroundColor: character.status || "secondary" }}
              >
                <Typography color="primary">{character.name}</Typography>
                {activeTarget && (
                  <Button onClick={() => onClick(character.name)}>
                    Select
                  </Button>
                )}
              </Item>
            );
          })}
        </CharsDataContainer>
      )}
    </>
  );
};

export default Characters;

const ToggleContainer = styled(Box)`
  height: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #000000;
`;

const CharsDataContainer = styled(Stack)`
  justify-content: center;
  flex-wrap: wrap;
  z-index: 2;
  position: absolute;
  background-color: transparent;
  width: 100%;
  justify-content: space-around;
`;

const Item = styled(Box)(
  ({ theme }) => `
  display: flex;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: ${theme.palette.secondary.main};
  text-align: 'center';
  align-items: center;
`
);
