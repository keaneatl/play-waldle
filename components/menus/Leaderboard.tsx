import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useAuthContext } from "../contexts/AuthContext";
import getScores, { Score } from "../helpers/backend/getScores";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Leaderboard = (): JSX.Element => {
  const [scores, setScores] = useState<Array<Score>>([]);
  const user = useAuthContext();

  useEffect(() => {
    if (user) {
      getScores(
        "Cartoons",
        setScores as Dispatch<SetStateAction<Array<Score>>>
      );
    }
  }, [scores, user]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">No. of Guesses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores
            .sort((a, z) => a.time - z.time)
            .map((score, place) => (
              <TableRow
                key={score.time}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {place + 1}) {score.player}
                </TableCell>
                <TableCell align="right">
                  {("0" + Math.floor((score.time / 60) % 60)).slice(-2)}m{" "}
                  {("0" + Math.floor(score.time % 60)).slice(-2)}s
                </TableCell>
                <TableCell align="right">{score.guesses.length}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
