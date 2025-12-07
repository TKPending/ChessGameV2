import { useSelector } from "react-redux";
import ChessMovesContainer from "./containers/ChessMovesContainer";
import ResetGame from "@/app/containers/features/resetGame/ResetGame";
import { selectCurrentMoveCount } from "@/app/utils/selectors/chessboardHistoryStateSelector";

const ChessboardMoveHistory = () => {
  const currentMoveCount: number = useSelector(selectCurrentMoveCount);

  return (
    <div className="hidden md:flex min-h-[20px] h-[120px] md:h-full p-2 w-full md:max-w-[300px] mt-5 flex flex-col items-center justify-center">
      <section className="font-semibold bg-section-background p-2 shadow-lg rounded-lg h-full w-full flex flex-col gap-1 md:gap-4 overflow-x-hidden overflow-y-hidden md:overflow-y-auto">
        <div className="flex flex-row justify-between text-xs md:text-base px-2">
          <p className="text-customGreen">Moves: {currentMoveCount}</p>
        </div>

        <ChessMovesContainer />
      </section>

      <ResetGame />
    </div>
  );
};

export default ChessboardMoveHistory;
