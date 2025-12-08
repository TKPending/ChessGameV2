import Button from "@/app/components/Button";

type GameSettingsButtonProps = {
  isVisible: boolean;
  onClick: () => void;
};

/**
 * Render button to change page to 'Game Settings'
 * @param isVisible If names are valid
 * @param onClick Handle changing the page
 * @returns
 */
const GameSettingsButton = ({
  isVisible,
  onClick,
}: GameSettingsButtonProps) => {
  return (
    <div>
      <Button
        text="Game Settings"
        className={`${
          isVisible ? "flex" : "opacity-0 cursor-default"
        } bg-customGreen text-white w-auto p-4 transition duration-400 hover:bg-opacity-90`}
        onClick={onClick}
      />
    </div>
  );
};

export default GameSettingsButton;
