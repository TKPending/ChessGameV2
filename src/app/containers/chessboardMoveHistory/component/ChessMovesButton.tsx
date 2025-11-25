import { useSelector, useDispatch } from "react-redux";
import { setIsMovesHidden } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";
import { selectIsMovesHidden } from "@/app/utils/selectors/chessboardHistoryStateSelector";

const ChessMovesButton = () => {
  const dispatch = useDispatch();
  const isMovesHidden: boolean = useSelector(selectIsMovesHidden);

  const handleDisplayMoves = () => {
    dispatch(setIsMovesHidden());
  };

  return (
    <div>
      <p
        onClick={handleDisplayMoves}
        className="text-customGreen cursor-pointer hover:underline"
      >
        {isMovesHidden ? "Hide" : "Show"}
      </p>
    </div>
  );
};

export default ChessMovesButton;
