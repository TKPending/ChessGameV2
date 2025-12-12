import { useSelector } from "react-redux";
import MovesContainer from "@/app/containers/moveHistory/containers/MovesContainer";
import ResetGame from "@/app/containers/features/resetGame/ResetGame";
import {
  selectMoveCount,
  selectMovesHistory,
} from "@/app/utils/selectors/historyStateSelectors";
import { selectWinner } from "@/app/utils/selectors/gameStateSelectors";
import { MoveHistoryType, PlayerType } from "@/app/types/ChessTypes";

const MoveHistoryContainer = () => {
  const moveCount: number = useSelector(selectMoveCount);
  const moveHistory: MoveHistoryType[] = useSelector(selectMovesHistory);
  const winner: PlayerType | null = useSelector(selectWinner);

  const title = winner ? `${winner.playerName} Wins!` : "Stalemate!";

  return (
    <div className="hidden md:flex h-full p-2 w-full md:max-w-[300px] mt-5 flex-col items-center justify-center">
      <section className="bg-section-background shadow-lg rounded-lg p-2 h-full w-full flex flex-col gap-4 overflow-y-auto">
        {/* Move Counter */}
        <div className="flex justify-between text-base px-2 font-semibold">
          <p className="text-customGreen">Moves: {moveCount}</p>
        </div>

        {/* Moves */}
        <div className="flex flex-col gap-4 p-2">
          <p className="text-center text-customGreen font-semibold">{title}</p>

          {moveHistory
            .slice()
            .reverse()
            .map((move, index) => (
              <MovesContainer key={index} move={move} />
            ))}
        </div>
      </section>

      <ResetGame />
    </div>
  );
};

export default MoveHistoryContainer;
