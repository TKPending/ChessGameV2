import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import ChessMovesHeader from "./component/ChessMovesHeader";
import ChessMovesContainer from "./containers/ChessMovesContainer";
import HiddenMovesDisplay from "./component/HiddenMovesDisplay";

const ChessMoves = () => {
  const isPreviousMovesHidden: boolean = useSelector(
    (state: RootState) => state.gameHistory.isPreviousMovesHidden
  );
  const moveCount: number = useSelector(
    (state: RootState) => state.gameHistory.count
  );

  return (
    <div className="min-h-[20px] h-[120px] md:h-full p-2 w-full md:w-64 flex items-center justify-center">
      <div className="h-full w-full md:h-[80%] min-h-24">
        <section className="h-full w-full flex flex-col gap-4 overflow-x-auto md:overflow-y-auto">
          <ChessMovesHeader />

          {isPreviousMovesHidden && <ChessMovesContainer />}
          {!isPreviousMovesHidden && moveCount > 0 && <HiddenMovesDisplay />}
        </section>
      </div>
    </div>
  );
};

export default ChessMoves;
