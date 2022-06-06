import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Props = {
  open: boolean;
  handleClose(): void;
};

const HowToPlay = ({ open, handleClose }: Props): JSX.Element => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>How to Play</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You have six tries to find three characters in the map hidden in plain
          sight. Clicking in a specific spot and indicating which character is
          in that spot counts as one guess.
        </DialogContentText>

        <DialogContentText>
          {" "}
          If a character is in frame, a yellow box appears, otherwise, a black
          box appears. If the character is found, a green mark will appear
          instead of a box.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HowToPlay;
