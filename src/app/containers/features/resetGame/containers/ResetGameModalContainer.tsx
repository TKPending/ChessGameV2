import { useDispatch } from "react-redux";
import ResetGameModal from "@/app/containers/features/resetGame/components/ResetGameModal";
import { resetChessGame } from "@/app/utils/resetChessGame";
import {
  setResetTrigger,
  endViewingMode,
} from "@/app/redux/slices/gameState/gameStateSlice";

const ResetGameModalContainer = () => {
  const dispatch = useDispatch();

  const handleResetGame = () => {
    resetChessGame(dispatch, { swapColors: true });
    dispatch(endViewingMode());
  };

  const handleCancelReset = () => {
    dispatch(setResetTrigger());
  };

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <ResetGameModal
        resetGame={handleResetGame}
        closeModal={handleCancelReset}
      />
    </div>
  );
};

export default ResetGameModalContainer;
