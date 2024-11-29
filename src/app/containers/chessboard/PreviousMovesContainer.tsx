import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { mockPreviousMoves } from "@/app/temp/PreviousMoves";
import PreviousMove from "@/app/components/previousMoves/PreviousMove";
import { PreviousMoveType } from "@/app/types/PreviousMoveType";
import { setFullscreen } from "@/app/redux/slices/previousMoves/previousMovesSlice";

const PreviousMovesContainer = () => {
  const dispatch = useDispatch();
  const [previousMovesHidden, setPreviousMovesHidden] = useState(false);
  const moveHistory: any[] = useSelector(
    (state: RootState) => state.board.moveHistory
  );

  const togglePreviousMoves = () => {
    setPreviousMovesHidden(!previousMovesHidden);
  };

  const handleHideContainer = () => {
    dispatch(setFullscreen(true));
  }

  return (
    <div className="h-auto max-h-[90%] w-[20%] max-w-sm rounded-md p-4 pt-[5%]">
      <p onClick={handleHideContainer} className="text-white hover:cursor-pointer">Hide</p>
      <p
        onClick={togglePreviousMoves}
        className={`text-black text-center bg-white text-xl p-4 ${
          !previousMovesHidden ? "rounded-tr-lg rounded-tl-lg" : "rounded-lg"
        } hover:cursor-pointer`}
      >
        {previousMovesHidden ? "Display Moves" : "Hide Moves"}
      </p>

      {!previousMovesHidden && (
        <div
          className={`flex flex-col gap-4 ${
            !previousMovesHidden && "h-full w-full bg-white"
          } overflow-y-scroll p-2 rounded-br-lg rounded-bl-lg`}
        >
          {mockPreviousMoves
            .slice()
            .reverse()
            .map((move: PreviousMoveType, index: number) => (
              <PreviousMove key={index} move={move} />
            ))}
        </div>
      )}
    </div>
  );
};

export default PreviousMovesContainer;
