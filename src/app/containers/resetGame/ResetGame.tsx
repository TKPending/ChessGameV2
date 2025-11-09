import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import ResetGameComponent from "./components/ResetGameComponent";
import { setResetTrigger } from "@/app/redux/slices/gameState/gameStateSlice";

const ResetGameContainer = () => {
  const dispatch = useDispatch();
  const currentMoveCount = useSelector(
    (state: RootState) => state.chessboardHistoryState.currentMoveCount
  );

  const handleOnClick = () => {
    dispatch(setResetTrigger());
  };

  return currentMoveCount > 0 && <ResetGameComponent onReset={handleOnClick} />;
};

export default ResetGameContainer;
