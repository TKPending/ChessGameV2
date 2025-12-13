import { useSelector } from "react-redux";
import { selectMoveCount } from "@/app/utils/selectors/historyStateSelectors";

/**
 * Renders the Back Button and Move Counter (On Mobile)
 * @returns Back Button and Move Counter
 */
const BoardHeader = () => {
  const moveCount: number = useSelector(selectMoveCount);

  return (
    <div className="flex items-center justify-end">
      <p className="flex pt-8 pr-12 md:hidden text-white">
        Move Count: {moveCount}
      </p>
    </div>
  );
};

export default BoardHeader;
