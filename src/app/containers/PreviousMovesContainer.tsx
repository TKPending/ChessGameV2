import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import PreviousMove from "@/app/components/moveHistoryComponents/PreviousMove";
import { MoveHistoryType } from "@/app/types/GameHistoryType";

const PreviousMovesContainer = () => {
  const moveHistory: MoveHistoryType[] = useSelector(
    (state: RootState) => state.gameHistory.moveHistory
  );

  return (
    <div className="md:h-full w-full flex rounded-md px-4 overflow-x-auto md:overflow-y-auto scrollbar-thin scrollbar-thumb-rounded">
      {moveHistory.length === 0 ? (
        <div className="h-full w-full flex items-center justify-center text-center">
          <p className="text-customGreen">No Moves Have Been Made</p>
        </div>
      ) : (
        <div className="flex flex-row md:flex-col gap-4 max-h-[80px] w-full p-2">
          {moveHistory
            .slice()
            .reverse()
            .map((move: MoveHistoryType, index: number) => (
              <PreviousMove key={index} move={move} />
            ))}
        </div>
      )}
    </div>
  );
};

export default PreviousMovesContainer;
