import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import ChessMovesButton from "./ChessMovesButton";

const ChessMovesHeader = () => {
  const moveCount: number = useSelector(
    (state: RootState) => state.chessMoves.count
  );

  return (
    <div className="flex flex-row justify-between text-xs md:text-base px-2">
      <p className="text-customGreen">Moves: {moveCount - 1}</p>
      <ChessMovesButton />
    </div>
  );
};

export default ChessMovesHeader;
