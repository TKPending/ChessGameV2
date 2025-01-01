import { PieceType } from "@/app/types/PieceType";

type Props = {
  piece: PieceType;
  destination: string;
  enemy: PieceType | null;
};

const CaptureMove = ({ piece, destination, enemy }: Props) => {
  if (!enemy) return;

  return (
    <div className="flex h-full w-full p-2 justify-around items-center">
      <img
        src={`${piece.pieceColor}-${piece.pieceName}.png`}
        className="h-6 w-6"
      />
      <span className="text-customGreen ">{`→`}</span>

      <img
        src={`${enemy.pieceColor}-${piece.pieceName}.png`}
        className="h-6 w-6"
      />
    </div>
  );
};

export default CaptureMove;
