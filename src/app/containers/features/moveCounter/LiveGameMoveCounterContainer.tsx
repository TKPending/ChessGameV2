import { selectCurrentMoveCount } from "@/app/utils/selectors/chessboardHistoryStateSelector";
import { useSelector } from "react-redux";

const LiveGameMoveCounterContainer = () => {
  const moveCounter: number = useSelector(selectCurrentMoveCount);

  return (
    <div className="flex">
      <p className="text-white opacity-80">Current Move: {moveCounter}</p>
    </div>
  );
};

export default LiveGameMoveCounterContainer;
