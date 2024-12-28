import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import PreviousMove from "@/app/components/moveHistoryComponents/PreviousMove";
import { MoveHistoryType } from "@/app/types/GameHistoryType";

const MoveHistoryContainer = () => {
  const moveHistory: MoveHistoryType[] = useSelector(
    (state: RootState) => state.gameHistory.moveHistory
  );

  return (
    <div className=" max-h-full w-full max-w-sm rounded-md scrollbar-thin scrollbar-thumb-rounded">
      {moveHistory.length === 0 ? (
        <div className="h-64 w-full flex items-center justify-center">
          <p className="text-white">No Moves Have Been Made</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-h-[80%] overflow-y-scroll w-full p-2 rounded-br-lg rounded-bl-lg">
          {moveHistory
            .slice()
            .reverse()
            .map((move: MoveHistoryType, index: number) => (
              <PreviousMove
                key={index}
                move={move}
                count={moveHistory.length - index}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default MoveHistoryContainer;
