import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

type ModalTemplateProps = {
  confetti?: boolean;
  children: any;
};

/**
 * Renders the Modal Template to be used in End Game scenarios and Pawn Promotion
 * @param confetti If there's a win, showcase the winning confetti
 * @param children Render the individual components that go into each Modal
 * @returns Modal Template
 */
const ModalTemplate = ({ confetti = false, children }: ModalTemplateProps) => {
  const { width, height } = useWindowSize();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Soft spotlight behind modal */}
      <div
        className="absolute inset-0 pointer-events-none 
        bg-[radial-gradient(circle_at_center,rgba(255,215,128,0.12),transparent_70%)]"
      />

      {confetti && (
        <Confetti width={width} height={height} numberOfPieces={220} />
      )}
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
        {children}
      </div>
    </div>
  );
};

export default ModalTemplate;
