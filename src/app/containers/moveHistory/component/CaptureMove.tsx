import { PieceType } from "@/app/types/ChessTypes";

type Props = {
  piece: PieceType;
  enemy: PieceType | null;
};

/**
 * Renders the move component for capturing pieces
 * @param {PieceType} piece The piece that has been moved
 * @param {PieceType | null} enemy If the tile that the piece moved to has an enemy (Capture)
 * @returns Move Component For Capture
 */
const CaptureMove = ({ piece, enemy }: Props) => {
  if (!enemy) return null;

  return (
    <div className="h-full w-full flex items-center justify-between px-4">
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
