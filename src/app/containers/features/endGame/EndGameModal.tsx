import { useSelector, useDispatch } from "react-redux";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import Checkmate from "./components/Checkmate";
import Button from "@/app/components/Button";
import Stalemate from "./components/Stalemate";
import WinnerOnTime from "./components/WinnerOnTime";
import {
  selectIsKingInCheckmate,
  selectStalemate,
  selectWinByTime,
} from "@/app/utils/selectors/gameStateSelectors";
import { resetChessGame } from "@/app/utils/resetChessGame";
import { closeModal } from "@/app/redux/slices/gameState/gameStateSlice";
import { resetUiPreviousMoveTiles } from "@/app/redux/slices/uiChessboard/uiChessboardSlice";

const EndGameModal = () => {
  const dispatch = useDispatch();

  const isCheckmate = useSelector(selectIsKingInCheckmate);
  const isStalemate = useSelector(selectStalemate);
  const winByTime = useSelector(selectWinByTime);

  const { width, height } = useWindowSize();

  const handleResetGame = () => {
    resetChessGame(dispatch, { swapColors: true });
  };

  const handleExitModal = () => {
    dispatch(resetUiPreviousMoveTiles());
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Soft spotlight behind modal */}
      <div
        className="absolute inset-0 pointer-events-none 
        bg-[radial-gradient(circle_at_center,rgba(255,215,128,0.12),transparent_70%)]"
      />

      <Confetti width={width} height={height} numberOfPieces={220} />
      <div
        className="
        relative w-[500px] max-w-[92%]
        bg-[rgba(12,12,14,0.86)]
        backdrop-blur-xl
        border border-[rgba(255,215,128,0.35)]
        rounded-3xl shadow-[0_10px_45px_rgba(0,0,0,0.7)]
        p-12 flex flex-col items-center gap-10
        animate-premiumPop
        "
      >
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
      </div>
    </div>
  );
};

export default EndGameModal;
