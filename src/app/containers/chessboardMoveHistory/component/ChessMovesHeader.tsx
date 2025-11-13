import { useSelector } from "react-redux";
import ChessMovesButton from "./ChessMovesButton";
import { selectCurrentMoveCount } from "@/app/utils/selectors/chessboardHistoryStateSelector";

const ChessMovesHeader = () => {
  const currentMoveCount: number = useSelector(selectCurrentMoveCount);

  return (
    <div className="flex flex-row justify-between text-xs md:text-base px-2">
      <p className="text-customGreen">Moves: {currentMoveCount}</p>
      <ChessMovesButton />
    </div>
  );
};

export default ChessMovesHeader;
