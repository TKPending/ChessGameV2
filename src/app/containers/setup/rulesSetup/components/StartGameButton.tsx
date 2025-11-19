import { useDispatch } from "react-redux";
// import set
import Button from "@/app/components/Button";

type StartGameButtonProps = {
  category: string;
  duration: string;
  increment: string;
  undoAllowed: boolean;
};

const StartGameButton = ({
  category,
  duration,
  increment,
  undoAllowed,
}: StartGameButtonProps) => {
  const dispatch = useDispatch();
  const handleStartGame = () => {
    // TODO: Handle redux state updates to start the game
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
