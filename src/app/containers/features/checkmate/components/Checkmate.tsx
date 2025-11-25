import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import Button from "@/app/components/Button";
import { setWinner } from "@/app/redux/slices/gameState/gameStateSlice";
import {
  selectCurrentTurn,
  selectPlayers,
} from "@/app/utils/selectors/gameStateSelectors";
import { ChessColors, PlayerType } from "@/app/types/ChessTypes";

type CheckmateProps = {
  displayCheckmate: boolean;
  handleResetGame: () => void;
  handleExit: () => void;
};

const Checkmate = ({
  displayCheckmate,
  handleResetGame,
  handleExit,
}: CheckmateProps) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();

  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const players: PlayerType[] = useSelector(selectPlayers);

  const winner = currentTurn === "White" ? players[1] : players[0];

  useEffect(() => {
    if (displayCheckmate) {
      dispatch(setWinner(winner));
    }
  }, [currentTurn]);

  return (
    <div
      className={`${
        displayCheckmate ? "flex" : "hidden"
      } z-50 h-screen w-screen absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 p-4`}
    >
      <Confetti width={width} height={height} numberOfPieces={200} />

      <div className="w-[400px] flex flex-col items-center gap-6 border-2 border-customGreen bg-page-background p-4 rounded-lg relative">
        <div className="flex flex-col items-center justify-start">
          <p className="text-white text-3xl">Checkmate!</p>
          <p className="text-customGreen">{`${winner.playerName} has won`}</p>
          <img
            src={`${currentTurn === "White" ? "black" : "white"}-king.png`}
            className="h-20 w-20"
            alt={`${currentTurn} king piece`}
          />
        </div>

        <div className="flex gap-6 w-auto">
          <Button
            text="Play Again"
            className="bg-customGreen text-white w-auto"
            onClick={handleResetGame}
          />

          <Button
            text="Exit"
            className="bg-red-400 text-white w-[90px]"
            onClick={handleExit}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkmate;
