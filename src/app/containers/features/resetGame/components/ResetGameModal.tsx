import Button from "@/app/components/Button";

type ResetGameModalProsp = {
  resetGame: () => void;
  closeModal: () => void;
};

const ResetGameModal = ({ resetGame, closeModal }: ResetGameModalProsp) => {
  return (
    <div className="h-auto w-auto p-12 bg-section-background shadow-lg flex items-center justify-center gap-8 flex-col text-center">
      <p className="text-2xl font-semibold text-customGreen">
        Are you sure you want to reset the game?
      </p>

      <div className="flex items-center justify-between gap-6">
        <Button
          text="Reset"
          className="bg-customGreen text-white hover:bg-opacity-80"
          onClick={resetGame}
        />
        <Button
          text="Cancel"
          className="bg-red-400 text-white hover:bg-opacity-80"
          onClick={closeModal}
        />
      </div>
    </div>
  );
};

export default ResetGameModal;
