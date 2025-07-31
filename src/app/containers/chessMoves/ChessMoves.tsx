import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import ChessMovesHeader from "./component/ChessMovesHeader";
import ChessMovesContainer from "./containers/ChessMovesContainer";
import HiddenMovesDisplay from "./component/HiddenMovesDisplay";

const ChessMoves = () => {
  const showMoves: boolean = useSelector(
    (state: RootState) => state.chessMoves.isMovesHidden
  );
  const moveCount: number = useSelector(
    (state: RootState) => state.chessMoves.count
  );

  return (
    <div className="min-h-[20px] h-[120px] md:h-full p-2 w-full md:max-w-[20%] md:w-64 flex items-center justify-center">
      <div className="h-full w-full md:h-[80%] min-h-24">
        <section className="h-full w-full flex flex-col gap-1 md:gap-4 overflow-x-hidden overflow-y-hidden md:overflow-y-auto">
          <ChessMovesHeader />

          {showMoves && <ChessMovesContainer />}
          {!showMoves && moveCount > 0 && <HiddenMovesDisplay />}
        </section>
      </div>
    </div>
  );
};

export default ChessMoves;
