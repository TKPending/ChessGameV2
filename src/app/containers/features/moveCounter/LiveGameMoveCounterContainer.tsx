import { selectMoveCount } from "@/app/utils/selectors/historyStateSelectors";
import { useSelector } from "react-redux";

const LiveGameMoveCounterContainer = () => {
  const moveCount: number = useSelector(selectMoveCount);

  return (
    <div className="flex">
      <p className="text-white opacity-80">Current Move: {moveCount}</p>
    </div>
  );
};

export default LiveGameMoveCounterContainer;
