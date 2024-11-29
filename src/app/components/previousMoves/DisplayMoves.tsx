import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setFullscreen } from "@/app/redux/slices/previousMoves/previousMovesSlice";

const DisplayMoves = () => {
  const dispatch = useDispatch();
  const displayMoves: boolean = useSelector(
    (state: RootState) => state.previousMovesContainer.previousMovesHidden
  );

  const handleDisplayMoves = () => {
    dispatch(setFullscreen(!displayMoves));
  };

  return (
    <div className="w-full flex items-center justify-end px-6">
      <p
        onClick={handleDisplayMoves}
        className="text-white text-xs hover:cursor-pointer hover:text-gray-200 transition duration-200 hover:underline"
      >
        {displayMoves ? "Hide" : "Show Moves"}
      </p>
    </div>
  );
};

export default DisplayMoves;
