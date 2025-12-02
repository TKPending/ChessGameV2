import { useSelector } from "react-redux";
import ChessMovesHeader from "./component/ChessMovesHeader";
import ChessMovesContainer from "./containers/ChessMovesContainer";
import ResetGame from "@/app/containers/features/resetGame/ResetGame";
import { selectCurrentMoveCount } from "@/app/utils/selectors/chessboardHistoryStateSelector";

const ChessboardMoveHistory = () => {
  const currentMoveCount: number = useSelector(selectCurrentMoveCount);

  return (
    <div className="min-h-[20px] h-[120px] md:h-full p-2 w-full md:max-w-[300px] mt-5 flex flex-col items-center justify-center">
      <section className="font-semibold bg-section-background p-2 shadow-lg rounded-lg h-full w-full flex flex-col gap-1 md:gap-4 overflow-x-hidden overflow-y-hidden md:overflow-y-auto">
        <ChessMovesHeader />

        <ChessMovesContainer />
      </section>

      <ResetGame />
    </div>
  );
};

export default ChessboardMoveHistory;
