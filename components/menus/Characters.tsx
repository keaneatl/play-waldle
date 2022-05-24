import {
  styled,
  Stack,
  Paper,
  Divider,
  Typography,
  Button,
} from "@mui/material";

type Props = {
  characters: [
    { name: string; status: string },
    { name: string; status: string },
    { name: string; status: string }
  ];
  onClick: () => object;
};

const Drawer = ({ characters, onClick }: Props): JSX.Element => {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
    >
      {characters.map((character) => {
        return (
          <Item
            key={character.name}
            sx={{ backgroundColor: character.status || "primary.dark" }}
          >
            <Typography>{character.name}</Typography>
            <Button onClick={onClick}>Select</Button>
          </Item>
        );
      })}
    </Stack>
  );
};

export default Drawer;

const Item = styled(Paper)(
  ({ theme }) => `
  display: flex;
  padding: ${theme.spacing(1)};
  text-align: 'center';
`
);
