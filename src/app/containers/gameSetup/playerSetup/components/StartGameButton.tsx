import Button from "@/app/components/Button";

type StartGameButtonProps = {
  isVisible: boolean;
  onClick: () => void;
};

const StartGameButton = ({ isVisible, onClick }: StartGameButtonProps) => {
  return (
    <div>
      <Button
        text="Start Game"
        className={`${
          isVisible ? "flex" : "opacity-0 cursor-default"
        } bg-customGreen text-white w-auto p-4 transition duration-400 hover:bg-opacity-90`}
        onClick={onClick}
      />
    </div>
  );
};

export default StartGameButton;
