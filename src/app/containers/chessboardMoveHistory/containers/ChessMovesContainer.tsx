import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import Moves from "@/app/containers/chessboardMoveHistory/component/Moves";
import { MoveHistoryType } from "@/app/types/ChessTypes";

const ChessMovesContainer = () => {
  const moveHistory: MoveHistoryType[] = useSelector(
    (state: RootState) => state.chessboardHistoryState.movesHistory
  );
  const winner = useSelector((state: RootState) => state.gameState.winner);
  const isWinner = useSelector((state: RootState) => state.gameState.isPlaying);

  return (
    <div className="w-screen md:w-full w-full h-full flex rounded-md p-2 overflow-x-auto overflow-y-hidden md:overflow-y-auto scrollbar-thin scrollbar-thumb-rounded">
      {moveHistory.length === 0 ? (
        <div className="h-full w-full flex items-center justify-center text-center">
          <p className="text-customGreen">No Moves Have Been Made</p>
        </div>
      ) : (
        <div className="flex flex-row md:flex-col gap-4 max-h-[80px] w-full">
          {!isWinner && (
            <div className="w-full text-center mb-2">
              <p className="text-customGreen font-semibold">
                {winner?.playerName} Wins!
              </p>
            </div>
          )}
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
