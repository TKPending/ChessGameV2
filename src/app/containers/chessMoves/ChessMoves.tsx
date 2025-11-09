import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import ChessMovesHeader from "./component/ChessMovesHeader";
import ChessMovesContainer from "./containers/ChessMovesContainer";
import HiddenMovesDisplay from "./component/HiddenMovesDisplay";
import GameStartedText from "./component/GameStartedText";
import ResetGame from "@/app/containers/resetGame/ResetGame";

const ChessMoves = () => {
  const { isMovesHidden, currentMoveCount } = useSelector(
    (state: RootState) => state.chessboardHistoryState
  );

  return (
    <div className="min-h-[20px] h-[120px] md:h-full p-2 w-full md:max-w-[300px] flex items-center justify-center">
      <div className="h-full w-full md:h-[80%] min-h-24">
        <section className="font-semibold bg-section-background p-2 shadow-lg rounded-lg h-full w-full flex flex-col gap-1 md:gap-4 overflow-x-hidden overflow-y-hidden md:overflow-y-auto">
          <ChessMovesHeader />

          {isMovesHidden && <ChessMovesContainer />}
          {!isMovesHidden && currentMoveCount > 0 && <HiddenMovesDisplay />}
          {!isMovesHidden && currentMoveCount === 0 && <GameStartedText />}
        </section>

        <ResetGame />
      </div>
    </div>
  );
};

export default ChessMoves;
