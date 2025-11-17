import Button from "@/app/components/Button";

const StartGameButton = () => {
  const handleStartGame = () => {
    console.log("Game Started");
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
