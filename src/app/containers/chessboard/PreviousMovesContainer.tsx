import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { mockPreviousMoves } from "@/app/temp/PreviousMoves";
import PreviousMove from "@/app/components/previousMoves/PreviousMove";
import { PreviousMoveType } from "@/app/types/PreviousMoveType";

const PreviousMovesContainer = () => {
  const moveHistory: any[] = useSelector(
    (state: RootState) => state.board.moveHistory
  );

  return (
    <div className="h-auto max-h-[90%] w-full max-w-sm rounded-md">
      {moveHistory.length === 0 ? (
        <div className="h-64 w-full flex items-center justify-center">
          <p className="text-white">No Moves Have Been Made</p>
        </div>
      ) : (
        <div
          className="flex flex-col gap-4 h-full w-full
          overflow-y-scroll p-2 rounded-br-lg rounded-bl-lg"
        >
          {moveHistory
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
