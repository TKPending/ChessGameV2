import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import DisplayMovesHistory from "@/app/components/moveHistoryComponents/DisplayMoveHistory";
import PreviousMovesContainer from "./PreviousMovesContainer";
import { PlayerType } from "@/app/types/PlayerType";

const GameHistoryContainer = () => {
  const previousMovesHidden: boolean = useSelector(
    (state: RootState) => state.gameHistory.isPreviousMovesHidden
  );
  const moveCount: number = useSelector(
    (state: RootState) => state.gameHistory.count
  );
  const currentTurn: "White" | "Black" = useSelector(
    (state: RootState) => state.board.currentTurn
  );
  const player: PlayerType[] = useSelector(
    (state: RootState) => state.board.players
  );

  return (
    <div className="min-h-[20px] h-[120px] md:h-full p-2 w-full md:w-64 flex items-center justify-center">
      <div className="h-full w-full md:h-[80%] min-h-24">
        <section className="h-full w-full flex flex-col gap-4 overflow-x-auto md:overflow-y-auto">
          <div className="flex flex-row justify-between text-xs md:text-base px-2">
            <p className="text-customGreen">Moves: {moveCount - 1}</p>
            <DisplayMovesHistory />
          </div>

          {previousMovesHidden && <PreviousMovesContainer />}
          {!previousMovesHidden && moveCount > 0 && (
            <div className="h-full w-full flex flex-col items-center justify-center gap-2">
              <p className="text-customGreen">
                {currentTurn === "White"
                  ? player[1].playerName
                  : player[0].playerName}{" "}
                Turn
              </p>
              <img
                src={`${currentTurn.toLowerCase()}-king.png`}
                className="h-10 w-10"
                alt={`${currentTurn} king piece`}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default GameHistoryContainer;
