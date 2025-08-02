import { useDispatch } from "react-redux";
import Button from "@/app/components/Button";
import { setIsGamePlaying } from "@/app/redux/slices/gameState/gameStateSlice";
import { navigateToPage } from "@/app/utils/page/navigateToPage";
import { PageEnum } from "@/app/types/PageTypes";

type StartGameButtonProps = {
  isVisible: boolean;
};

const StartGameButton = ({ isVisible }: StartGameButtonProps) => {
  const dispatch = useDispatch();

  const handleStartChessGame = () => {
    if (!isVisible) return;
    dispatch(setIsGamePlaying(true));
    navigateToPage(dispatch, PageEnum.enterPlayers, PageEnum.chessGame);
  };

  return (
    <div>
      <Button
        text="Start Game"
        className={`${
          isVisible ? "flex" : "opacity-0 cursor-default"
        } bg-customGreen text-white w-auto p-4 transition duration-400 hover:bg-opacity-90`}
        onClick={handleStartChessGame}
      />
    </div>
  );
};

export default StartGameButton;
