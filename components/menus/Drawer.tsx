import {
  styled,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import Leaderboard from "./Leaderboard";
import { useEffect, useState } from "react";

type Props = {
  requireAlias: boolean;
  gameOver: boolean;
  mapCredits: { author: string; credits: string };
};

const Drawer = ({ requireAlias, gameOver, mapCredits }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prevState) => !prevState);
  useEffect(() => {
    if (gameOver) {
      setIsOpen(true);
    }
  }, [gameOver]);
  return (
    <>
      <ToggleContainer>
        <IconButton onClick={handleToggle}>
          <MoreHoriz color="primary" />
        </IconButton>
      </ToggleContainer>
      <Dialog open={isOpen} onClose={handleToggle}>
        <DialogTitle>LEADERBOARD</DialogTitle>
        {requireAlias ? (
          <>
            <DialogContent>
              <DialogContentText>
                Please login or sign up to see the leaderboard
              </DialogContentText>
              {gameOver && (
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                />
              )}
            </DialogContent>
            {gameOver && (
              <DialogActions>
                <Button onClick={handleToggle}>Submit</Button>
              </DialogActions>
            )}
          </>
        ) : (
          <>
            <DialogContent>
              <Leaderboard />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleToggle}>Close</Button>
            </DialogActions>
          </>
        )}
        <MapCredits>
          This image is made by{" "}
          <a href={mapCredits.credits}>{mapCredits.author}</a>
        </MapCredits>
      </Dialog>
    </>
  );
};

export default Drawer;

const ToggleContainer = styled(Box)`
  height: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #000000;
`;

const MapCredits = styled(Typography)`
  padding: 0 0 20px 20px;
`;
