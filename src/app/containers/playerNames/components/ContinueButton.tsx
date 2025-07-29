import { useDispatch } from "react-redux";
import { setIsGamePlaying } from "@/app/redux/slices/gameState/gameStateSlice";

const ContinueButton = () => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(setIsGamePlaying(true));
  };

  return (
    <div
      onClick={handleOnClick}
      className="border-customGreen border-2 text-customGreen h-18 w-32 p-2 flex items-center justify-center rounded-xl cursor-pointer hover:scale-105 transition duration-200"
    >
      <p className="text-2xl font-semibold">PLAY!</p>
    </div>
  );
};

export default ContinueButton;
