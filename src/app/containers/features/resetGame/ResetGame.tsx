import { useDispatch } from "react-redux";
import ResetGameComponent from "./components/ResetGameComponent";
import { setResetTrigger } from "@/app/redux/slices/gameState/gameStateSlice";

const ResetGameContainer = () => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(setResetTrigger());
  };

  return <ResetGameComponent onReset={handleOnClick} />;
};

export default ResetGameContainer;
