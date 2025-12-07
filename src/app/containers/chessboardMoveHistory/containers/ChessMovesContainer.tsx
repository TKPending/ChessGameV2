import { useSelector } from "react-redux";
import Moves from "@/app/containers/chessboardMoveHistory/component/Moves";
import { selectMovesHistory } from "@/app/utils/selectors/chessboardHistoryStateSelector";
import {
  selectIsPlaying,
  selectWinner,
} from "@/app/utils/selectors/gameStateSelectors";
import { MoveHistoryType, PlayerType } from "@/app/types/ChessTypes";

const ChessMovesContainer = () => {
  const isWinner = useSelector(selectIsPlaying);
  const moveHistory: MoveHistoryType[] = useSelector(selectMovesHistory);
  const winner: PlayerType | null = useSelector(selectWinner);

  return (
    <div className="w-screen md:w-full w-full h-full flex rounded-md p-2 overflow-x-auto overflow-y-hidden md:overflow-y-auto scrollbar-thin scrollbar-thumb-rounded">
      <div className="flex flex-row md:flex-col gap-4 max-h-[80px] w-full">
        <div className="w-full text-center mb-2">
          <p className="text-customGreen font-semibold">
            {" "}
            {!winner ? "Stalemate!" : `${winner?.playerName} Wins!`}
          </p>
        </div>

        {moveHistory
          .slice()
          .reverse()
          .map((move: MoveHistoryType, index: number) => (
            <Moves key={index} move={move} />
          ))}
      </div>
    </div>
  );
};

export default ChessMovesContainer;
