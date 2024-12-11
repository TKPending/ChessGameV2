import { setMoveHistoryVisibility } from "@/app/redux/slices/gameHistory/gameHistorySlice";
import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";

const DisplayMoves = () => {
  const dispatch = useDispatch();
  const isPreviousMovesHidden: boolean = useSelector(
    (state: RootState) => state.gameHistory.isPreviousMovesHidden
  );

  const handleDisplayMoves = () => {
    dispatch(setMoveHistoryVisibility());
  };

  return (
    <div
      className={`hidden sm:flex w-full items-center ${
        isPreviousMovesHidden ? "px-6 justify-end" : "justify-center"
      }`}
    >
      <p
        onClick={handleDisplayMoves}
        className="text-white text-xs hover:cursor-pointer hover:text-gray-200 transition duration-200 hover:underline"
      >
        {isPreviousMovesHidden ? "Hide" : "Show Moves"}
      </p>
    </div>
  );
};

export default DisplayMoves;
