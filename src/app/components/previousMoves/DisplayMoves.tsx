import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setFullscreen } from "@/app/redux/slices/previousMoves/previousMovesSlice";

const DisplayMoves = () => {
  const dispatch = useDispatch();
  const previousMovesHidden: boolean = useSelector(
    (state: RootState) => state.previousMovesContainer.previousMovesHidden
  );

  const handleDisplayMoves = () => {
    dispatch(setFullscreen(!previousMovesHidden));
  };

  return (
    <div className={`hidden sm:flex w-full items-center ${previousMovesHidden ? "px-6 justify-end" : "justify-center"}`}>
      <p
        onClick={handleDisplayMoves}
        className="text-white text-xs hover:cursor-pointer hover:text-gray-200 transition duration-200 hover:underline"
      >
        {previousMovesHidden ? "Hide" : "Show Moves"}
      </p>
    </div>
  );
};

export default DisplayMoves;
