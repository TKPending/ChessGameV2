import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { PlayerType } from "@/app/types/ChessTypes";

const HiddenMovesDisplay = () => {
  const currentTurn: "White" | "Black" = useSelector(
    (state: RootState) => state.chessboard.currentTurn
  );
  const player: PlayerType[] = useSelector(
    (state: RootState) => state.gameState.players
  );

  return (
    <div className="h-10 md:h-full w-full flex flex-row md:flex-col items-center justify-center gap-2">
      <p className="text-customGreen text-lg">
        {currentTurn === "White" ? player[1].playerName : player[0].playerName}{" "}
        Turn
      </p>
      <img
        src={`${currentTurn.toLowerCase()}-king.png`}
        className="h-10 w-10"
        alt={`${currentTurn} king piece`}
      />
    </div>
  );
};

export default HiddenMovesDisplay;
