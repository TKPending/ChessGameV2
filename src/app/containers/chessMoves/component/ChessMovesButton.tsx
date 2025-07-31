import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setIsMovesHidden } from "@/app/redux/slices/chessMoves/chessMovesSlice";

const ChessMovesButton = () => {
  const dispatch = useDispatch();
  const isPreviousMovesHidden: boolean = useSelector(
    (state: RootState) => state.chessMoves.isMovesHidden
  );

  const handleDisplayMoves = () => {
    dispatch(setIsMovesHidden());
  };

  return (
    <div>
      <p
        onClick={handleDisplayMoves}
        className="text-customGreen cursor-pointer hover:underline"
      >
        {isPreviousMovesHidden ? "Hide" : "Show"}
      </p>
    </div>
  );
};

export default ChessMovesButton;
