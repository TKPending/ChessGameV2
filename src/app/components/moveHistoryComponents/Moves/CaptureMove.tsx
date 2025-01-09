import { PieceType } from "@/app/types/PieceType";

type Props = {
  piece: PieceType;
  destination: string;
  enemy: PieceType | null;
};

const CaptureMove = ({ piece, destination, enemy }: Props) => {
  if (!enemy) return null;

  return (
    <div className="flex items-center justify-between h-full w-full px-4">
      <img
        src={`${piece.pieceColor}-${piece.pieceName}.png`}
        className="h-6 w-6"
      />
      <span className="text-customGreen">{`→`}</span>
      <img
        src={`${enemy.pieceColor}-${enemy.pieceName}.png`}
        className="h-6 w-6"
      />
    </div>
  );
};
export default CaptureMove;
