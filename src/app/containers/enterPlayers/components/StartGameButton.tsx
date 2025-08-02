import { useDispatch } from "react-redux";
import Button from "@/app/components/Button";
import { setIsGamePlaying } from "@/app/redux/slices/gameState/gameStateSlice";
import { navigateToPage } from "@/app/utils/page/navigateToPage";
import { PageEnum } from "@/app/types/PageTypes";

const StartGameButton = () => {
  const dispatch = useDispatch();

  const handleStartChessGame = () => {
    dispatch(setIsGamePlaying(true));
    navigateToPage(dispatch, PageEnum.enterPlayers, PageEnum.chessGame);
  };

  return (
    <div>
      <Button
        text="Start Game"
        className="bg-customGreen text-white w-auto p-4 transition duration-400 hover:bg-opacity-90"
        onClick={handleStartChessGame}
      />
    </div>
  );
};

export default StartGameButton;
