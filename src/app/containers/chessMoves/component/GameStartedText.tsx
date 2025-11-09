import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { ChessColors } from "@/app/types/ChessTypes";

const GameStartedText = () => {
  const currentTurn: ChessColors.black | ChessColors.white = useSelector(
    (state: RootState) => state.gameState.currentTurn
  );
  return (
    <div className="h-full w-full flex md:flex-col gap-4 items-center justify-center">
      <img
        src={`${currentTurn.toLowerCase()}-king.png`}
        className="h-12 w-12"
        alt={`${currentTurn} king piece`}
      />
      <p className="text-customGreen">Make your first move!</p>
    </div>
  );
};

export default GameStartedText;
