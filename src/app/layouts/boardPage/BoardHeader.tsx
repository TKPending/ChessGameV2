import { useSelector } from "react-redux";
import BackButtonContainer from "@/app/containers/features/backButton/BackButtonContainer";
import { selectMoveCount } from "@/app/utils/selectors/historyStateSelectors";
import { PageEnum } from "@/app/types/PageTypes";

/**
 * Renders the Back Button and Move Counter (On Mobile)
 * @returns Back Button and Move Counter
 */
const BoardHeader = () => {
  const moveCount: number = useSelector(selectMoveCount);

  return (
    <div className="flex items-center justify-end">
      <BackButtonContainer
        currentPage={PageEnum.board}
        nextPage={PageEnum.enterPlayerNames}
        midGame={true}
      />

      <p className="flex pt-8 pr-12 md:hidden text-white">
        Move Count: {moveCount}
      </p>
    </div>
  );
};

export default BoardHeader;
