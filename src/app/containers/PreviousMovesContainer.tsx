import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import PreviousMove from "@/app/components/moveHistoryComponents/PreviousMove";
import { MoveHistoryType } from "@/app/types/GameHistoryType";

const PreviousMovesContainer = () => {
  const moveHistory: MoveHistoryType[] = useSelector(
    (state: RootState) => state.gameHistory.moveHistory
  );

  return (
    <div className="h-full overflow-y-scroll w-full max-w-sm overflow-y-scroll rounded-md scrollbar-thin scrollbar-thumb-rounded">
      {moveHistory.length === 0 ? (
        <div className="h-64 w-full flex items-center justify-center">
          <p className="text-customGreen">No Moves Have Been Made</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 h-full overflow-y-scroll w-full p-2 rounded-br-lg rounded-bl-lg">
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
