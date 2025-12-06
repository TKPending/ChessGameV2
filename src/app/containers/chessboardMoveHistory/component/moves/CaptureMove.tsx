import { PieceType } from "@/app/types/ChessTypes";

type Props = {
  piece: PieceType;
  enemy: PieceType | null;
};

const CaptureMove = ({ piece, enemy }: Props) => {
  if (!enemy) return null;

  return (
    <div className="flex items-center justify-between h-full w-full px-4">
      <img
        src={`${piece.pieceColor.toLowerCase()}-${piece.pieceName.toLowerCase()}.png`}
        className="h-6 w-6"
      />
      <span className="text-gray-800">{`→`}</span>
      <img
        src={`${enemy.pieceColor.toLowerCase()}-${enemy.pieceName.toLowerCase()}.png`}
        className="h-6 w-6"
      />
    </div>
  );
};
export default CaptureMove;
