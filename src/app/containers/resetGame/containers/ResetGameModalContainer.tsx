import { useDispatch } from "react-redux";
import ResetGameModal from "../components/ResetGameModal";
import { resetChessGame } from "@/app/utils/chessboard/resetChessGame";
import { setResetTrigger } from "@/app/redux/slices/gameState/gameStateSlice";

const ResetGameModalContainer = () => {
  const dispatch = useDispatch();

  const handleResetGame = () => {
    resetChessGame(dispatch);
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
