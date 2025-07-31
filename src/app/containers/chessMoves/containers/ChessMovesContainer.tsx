import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import Moves from "@/app/containers/chessMoves/component/Moves";
import { MoveHistoryType } from "@/app/types/ChessTypes";

const ChessMovesContainer = () => {
  const moveHistory: MoveHistoryType[] = useSelector(
    (state: RootState) => state.chessMoves.moveHistory
  );

  return (
    <div className="w-screen md:w-full w-full md:h-full flex rounded-md p-2 overflow-x-auto md:overflow-y-auto scrollbar-thin scrollbar-thumb-rounded">
      {moveHistory.length === 0 ? (
        <div className="h-full w-full flex items-center justify-center text-center">
          <p className="text-customGreen">No Moves Have Been Made</p>
        </div>
      ) : (
        <div className="flex flex-row md:flex-col gap-4 max-h-[80px] w-full">
          {moveHistory
            .slice()
            .reverse()
            .map((move: MoveHistoryType, index: number) => (
              <Moves key={index} move={move} />
            ))}
        </div>
      )}
    </div>
  );
};

export default ChessMovesContainer;
