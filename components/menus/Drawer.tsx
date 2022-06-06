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
  showLeaderboard: boolean;
  gameOver: boolean;
  mapCredits: { author: string; credits: string };
};

const Drawer = ({
  showLeaderboard,
  gameOver,
  mapCredits,
}: Props): JSX.Element => {
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
        {showLeaderboard ? (
          <>
            <DialogContent>
              <Leaderboard />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleToggle}>Close</Button>
            </DialogActions>
          </>
        ) : (
          <DialogContent>
            <DialogContentText>
              Please login or sign up to see the leaderboard
            </DialogContentText>
          </DialogContent>
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
