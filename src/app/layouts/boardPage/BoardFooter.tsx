import { useSelector } from "react-redux";
import LiveGameMoveCounterContainer from "@/app/containers/features/moveCounter/LiveGameMoveCounterContainer";
import UndoButtonContainer from "@/app/containers/features/undoButton/UndoButtonContainer";
import {
  selectIsRedoAvaialble,
  selectIsRedoVisible,
} from "@/app/utils/selectors/gameStateSelectors";

/**
 * Renders the Undo Button and Live Move Counter
 * @returns Undo Button and Live Move Counter
 */
const BoardFooter = () => {
  const isRedoAvailable: boolean = useSelector(selectIsRedoAvaialble);
  const isRedoVisible: boolean = useSelector(selectIsRedoVisible);
  return (
    <div className="hidden sm:flex absolute right-20 bottom-10 flex flex-col gap-4 lg:gap-1 w-40">
      {isRedoAvailable && isRedoVisible && <UndoButtonContainer />}

      <LiveGameMoveCounterContainer />
    </div>
  );
};

export default BoardFooter;
