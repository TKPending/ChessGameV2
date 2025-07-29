import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setMoveHistoryVisibility } from "@/app/redux/slices/gameHistory/gameHistorySlice";

const ChessMovesButton = () => {
  const dispatch = useDispatch();
  const isPreviousMovesHidden: boolean = useSelector(
    (state: RootState) => state.gameHistory.isPreviousMovesHidden
  );

  const handleDisplayMoves = () => {
    dispatch(setMoveHistoryVisibility());
  };

  return (
    <div>
      <p onClick={handleDisplayMoves} className="text-white cursor-pointer">
        {isPreviousMovesHidden ? "Hide" : "Show"}
      </p>
    </div>
  );
};

export default ChessMovesButton;
