import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Moves from "@/app/containers/chessboardMoveHistory/component/Moves";
import { selectMovesHistory } from "@/app/utils/selectors/chessboardHistoryStateSelector";
import {
  selectCurrentTurn,
  selectIsPlaying,
  selectPlayers,
  selectWinner,
} from "@/app/utils/selectors/gameStateSelectors";
import { setWinner } from "@/app/redux/slices/gameState/gameStateSlice";
import { ChessColors, MoveHistoryType } from "@/app/types/ChessTypes";

const ChessMovesContainer = () => {
  const dispatch = useDispatch();
  const isWinner = useSelector(selectIsPlaying);
  const players = useSelector(selectPlayers);
  const moveHistory: MoveHistoryType[] = useSelector(selectMovesHistory);
  const currentTurn = useSelector(selectCurrentTurn);
  const winner = useSelector(selectWinner);

  useEffect(() => {
    dispatch(
      setWinner(currentTurn === ChessColors.white ? players[1] : players[0])
    );
  }, [isWinner]);

  return (
    <div className="w-screen md:w-full w-full h-full flex rounded-md p-2 overflow-x-auto overflow-y-hidden md:overflow-y-auto scrollbar-thin scrollbar-thumb-rounded">
      <div className="flex flex-row md:flex-col gap-4 max-h-[80px] w-full">
        {!isWinner && (
          <div className="w-full text-center mb-2">
            <p className="text-customGreen font-semibold">
              {" "}
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
    </div>
  );
};

export default ChessMovesContainer;
