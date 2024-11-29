import { RootState } from "@/app/redux/store";
import { useSelector} from "react-redux";
import { mockPreviousMoves } from "@/app/temp/PreviousMoves";
import PreviousMove from "@/app/components/previousMoves/PreviousMove";
import { PreviousMoveType } from "@/app/types/PreviousMoveType";

const PreviousMovesContainer = () => {
  const moveHistory: any[] = useSelector(
    (state: RootState) => state.board.moveHistory
  );

  return (
    <div className="h-auto max-h-[90%] w-full max-w-sm rounded-md">
        <div
          className="flex flex-col gap-4 h-full w-full
          overflow-y-scroll p-2 rounded-br-lg rounded-bl-lg"
        >
          {mockPreviousMoves
            .slice()
            .reverse()
            .map((move: PreviousMoveType, index: number) => (
              <PreviousMove key={index} move={move} />
            ))}
        </div>
    </div>
  );
};

export default PreviousMovesContainer;
