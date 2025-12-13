import { useDispatch } from "react-redux";
import Button from "@/app/components/Button";
import {
  setGameSettings,
  startGame,
  setRedoAvailiability,
} from "@/app/redux/slices/gameState/gameStateSlice";
import { navigateToPage } from "@/app/utils/navigateToPage";
import { PageEnum } from "@/app/types/PageTypes";

type StartGameButtonProps = {
  category: string;
  duration: string;
  increment: string;
  undoAllowed: boolean;
};

/**
 * Renders the 'Start Game' button
 * @param category The category chosen for the game (Blitz, Rapid or Classical)
 * @param duration The original time for each player
 * @param increment The increment value
 * @param undoAllowed Whether undo is allowed
 * @returns Start Game Button
 */
const StartGameButton = ({
  category,
  duration,
  increment,
  undoAllowed,
}: StartGameButtonProps) => {
  const dispatch = useDispatch();
  const handleStartGame = () => {
    dispatch(setRedoAvailiability(undoAllowed));
    dispatch(
      setGameSettings({
        category,
        duration,
        increment,
      })
    );

    dispatch(startGame(true));
    navigateToPage(dispatch, PageEnum.gameSettings, PageEnum.board);
  };

  return (
    <Button
      text="Start Game"
      className="w-auto bg-customGreen hover:bg-green-700 text-white font-semibold transition-colors p-4"
      textStyle="text-lg"
      onClick={handleStartGame}
    />
  );
};

export default StartGameButton;
