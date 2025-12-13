import Button from "@/app/components/Button";
import ModalTemplate from "@/app/containers/modal/ModalTemplate";

type ResetGameModalProsp = {
  resetGame: () => void;
  closeModal: () => void;
};

/**
 * Renders the modal for resetting the game
 * @param resetGame Function to reset the game
 * @param closeModal Function to close the modal
 * @returns Reset Game Modal
 */
const ResetGameModal = ({ resetGame, closeModal }: ResetGameModalProsp) => {
  return (
    <ModalTemplate>
      <p className="text-2xl font-semibold text-customGreen text-center">
        Are you sure you want to reset the game?
      </p>

      <div className="flex gap-6 w-full justify-center">
        <Button
          text="Reset"
          className="bg-customGreen hover:bg-customGreen/80 
            text-white px-8 py-3 rounded-xl 
            shadow-[0_0_12px_rgba(50,200,120,0.45)]
            hover:shadow-[0_0_20px_rgba(50,200,120,0.6)]
            transition-all w-auto"
          onClick={resetGame}
        />
        <Button
          text="Cancel"
          className="bg-red-500 hover:bg-red-400 
            text-white px-8 py-3 rounded-xl
            shadow-[0_0_12px_rgba(255,90,90,0.45)]
            hover:shadow-[0_0_20px_rgba(255,90,90,0.6)]
            transition-all"
          onClick={closeModal}
        />
      </div>
    </ModalTemplate>
  );
};

export default ResetGameModal;
