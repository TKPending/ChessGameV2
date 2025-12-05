import { useDispatch, useSelector } from "react-redux";
import ResetGameComponent from "./components/ResetGameComponent";
import {
  endViewingMode,
  setResetTrigger,
} from "@/app/redux/slices/gameState/gameStateSlice";
import { selectCurrentMoveCount } from "@/app/utils/selectors/chessboardHistoryStateSelector";

const ResetGameContainer = () => {
  const dispatch = useDispatch();
  const currentMoveCount = useSelector(selectCurrentMoveCount);

  const handleOnClick = () => {
    dispatch(setResetTrigger());
    dispatch(endViewingMode());
  };

  return currentMoveCount > 0 && <ResetGameComponent onReset={handleOnClick} />;
};

export default ResetGameContainer;
