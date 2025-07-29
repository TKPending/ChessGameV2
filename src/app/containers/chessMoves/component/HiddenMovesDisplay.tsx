import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { PlayerType } from "@/app/types/PlayerType";

const HiddenMovesDisplay = () => {
  const currentTurn: "White" | "Black" = useSelector(
    (state: RootState) => state.board.currentTurn
  );
  const player: PlayerType[] = useSelector(
    (state: RootState) => state.board.players
  );

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-2">
      <p className="text-customGreen">
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
