import { useEffect, useState } from "react";
import FallingPiece from "./components/FallingPiece";

type AnimatedBackgroundProps = {
  count: number;
};

/**
 * Renders the falling chess piece that can be seen in the back
 * @param count The amount of pieces to be falling from the sky
 * @returns Animated background of falling chess pieces
 */
const AnimatedFallingChessBackground = ({
  count = 25,
}: AnimatedBackgroundProps) => {
  const [pieces, setPieces] = useState<number[]>([]);

  useEffect(() => {
    setPieces(Array.from({ length: count }, (_, i) => i));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {pieces.map((id) => (
        <FallingPiece key={id} id={id} />
      ))}

      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10%);
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedFallingChessBackground;
