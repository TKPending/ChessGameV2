import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import DisplayMovesHistory from "@/app/components/moveHistoryComponents/DisplayMoveHistory";
import PreviousMovesContainer from "./PreviousMovesContainer";

const GameHistoryContainer = () => {
  const previousMovesHidden: boolean = useSelector(
    (state: RootState) => state.gameHistory.isPreviousMovesHidden
  );
  const moveCount: number = useSelector(
    (state: RootState) => state.gameHistory.count
  );

  return (
    <div className="flex flex-col gap-4 absolute right-5 top-[10%] w-[15%] max-h-[80%]">
      <div className="flex justify-between px-6 text-xs">
        <p className="text-customGreen">Move: {moveCount - 1}</p>
        <DisplayMovesHistory />
      </div>

      {previousMovesHidden && <PreviousMovesContainer />}
      <div className="absoloute bottom-0 bg-white">test</div>
    </div>
  );
};

export default GameHistoryContainer;
