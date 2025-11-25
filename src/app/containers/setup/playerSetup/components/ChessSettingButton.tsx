import Button from "@/app/components/Button";

type ChessSettingButtonProps = {
  isVisible: boolean;
  onClick: () => void;
};

const ChessSettingButton = ({
  isVisible,
  onClick,
}: ChessSettingButtonProps) => {
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

export default ChessSettingButton;
