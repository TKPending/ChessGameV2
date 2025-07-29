import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { useWindowSize } from "react-use";
import CheckmateButton from "@/app/containers/checkmate/components/CheckmateButton";
import Confetti from "react-confetti";
import { PlayerType } from "@/app/types/ChessTypes";

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
  const { width, height } = useWindowSize();

  const currentTurn: "White" | "Black" = useSelector(
    (state: RootState) => state.chessboard.currentTurn
  );
  const players: PlayerType[] = useSelector(
    (state: RootState) => state.gameState.players
  );

  const winner = currentTurn === "White" ? players[0] : players[1];

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
            src={`${currentTurn === "White" ? "Black" : "White"}-king.png`}
            className="h-20 w-20"
            alt={`${currentTurn} king piece`}
          />
        </div>

        <div className="flex gap-6 w-auto">
          <CheckmateButton
            text="Play Again"
            className="bg-customGreen"
            onClick={handleResetGame}
          />
          <CheckmateButton
            text="Exit"
            className="bg-red-400 text-white"
            onClick={handleExit}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkmate;
