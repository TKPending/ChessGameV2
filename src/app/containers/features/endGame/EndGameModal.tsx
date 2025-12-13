import { useSelector, useDispatch } from "react-redux";
import Checkmate from "./components/Checkmate";
import Button from "@/app/components/Button";
import Stalemate from "./components/Stalemate";
import WinnerOnTime from "./components/WinnerOnTime";
import ModalTemplate from "@/app/containers/modal/ModalTemplate";

import {
  selectIsKingInCheckmate,
  selectStalemate,
  selectWinByTime,
} from "@/app/utils/selectors/gameStateSelectors";

import { resetChessGame } from "@/app/utils/resetChessGame";
import { closeModal } from "@/app/redux/slices/gameState/gameStateSlice";
import { clearUiPreviousMove } from "@/app/redux/slices/uiChessboard/uiChessboardSlice";

/**
 * Renders the modal for End Game (There is a winner)
 * @returns End Game Modal
 */
const EndGameModal = () => {
  const dispatch = useDispatch();

  const isCheckmate = useSelector(selectIsKingInCheckmate);
  const isStalemate = useSelector(selectStalemate);
  const winByTime = useSelector(selectWinByTime);

  const handleResetGame = () => {
    resetChessGame(dispatch, { swapColors: true });
  };

  const handleExitModal = () => {
    dispatch(clearUiPreviousMove());
    dispatch(closeModal());
  };

  let content = null;

  if (isCheckmate) {
    content = <Checkmate />;
  } else if (isStalemate) {
    content = <Stalemate />;
  } else if (winByTime) {
    content = <WinnerOnTime />;
  } else {
    return null;
  }

  return (
    <ModalTemplate confetti={true}>
      {content}
      <div className="flex gap-6 w-full justify-center">
        <Button
          text="Play Again"
          className="bg-customGreen hover:bg-customGreen/80 
            text-white px-8 py-3 rounded-xl 
            shadow-[0_0_12px_rgba(50,200,120,0.45)]
            hover:shadow-[0_0_20px_rgba(50,200,120,0.6)]
            transition-all w-auto"
          onClick={handleResetGame}
        />

        <Button
          text="Exit"
          className="bg-red-500 hover:bg-red-400 
            text-white px-8 py-3 rounded-xl
            shadow-[0_0_12px_rgba(255,90,90,0.45)]
            hover:shadow-[0_0_20px_rgba(255,90,90,0.6)]
            transition-all"
          onClick={handleExitModal}
        />
      </div>
    </ModalTemplate>
  );
};

export default EndGameModal;
