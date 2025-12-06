import Button from "@/app/components/Button";

type ResetGameModalProsp = {
  resetGame: () => void;
  closeModal: () => void;
};

const ResetGameModal = ({ resetGame, closeModal }: ResetGameModalProsp) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div
        className="absolute inset-0 pointer-events-none 
        bg-[radial-gradient(circle_at_center,rgba(255,215,128,0.12),transparent_70%)]"
      />

      <div
        className="
        relative w-[500px] max-w-[92%]
        bg-[rgba(12,12,14,0.86)]
        backdrop-blur-xl
        border border-[rgba(255,215,128,0.35)]
        rounded-3xl shadow-[0_10px_45px_rgba(0,0,0,0.7)]
        p-12 flex flex-col items-center gap-10
        animate-premiumPop
        "
      >
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
      </div>
    </div>
  );
};

export default ResetGameModal;
