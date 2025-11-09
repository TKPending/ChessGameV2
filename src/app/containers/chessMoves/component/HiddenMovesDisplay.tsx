import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { ChessColors, PlayerType } from "@/app/types/ChessTypes";

const HiddenMovesDisplay = () => {
  const currentTurn: ChessColors.white | ChessColors.black = useSelector(
    (state: RootState) => state.gameState.currentTurn
  );
  const player: PlayerType[] = useSelector(
    (state: RootState) => state.gameState.players
  );
  const winner = useSelector((state: RootState) => state.gameState.winner);
  const isWinner = useSelector((state: RootState) => state.gameState.isPlaying);

  return (
    <div className="h-10 md:h-full w-full flex flex-row md:flex-col items-center justify-center gap-2">
      {!isWinner ? (
        <p className="text-customGreen text-md md:text-lg">
          {winner?.playerName} has won
        </p>
      ) : (
        <p className="text-customGreen text-md md:text-lg">
          {currentTurn === ChessColors.white
            ? player[1].playerName
            : player[0].playerName}{" "}
          Turn
        </p>
      )}
    </div>
  );
};

export default HiddenMovesDisplay;
