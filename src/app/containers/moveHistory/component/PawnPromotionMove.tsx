import { PieceName, PieceType } from "@/app/types/ChessTypes";

type Props = {
  piece: PieceType;
  updatedPiece: PieceName | undefined;
  capturedPiece: PieceType | null;
  destination: string;
};

/**
 * Renders the move component for promoting a piece
 * @param {PieceType} piece The piece that has been moved
 * @param {PieceType | null} updatedPiece Piece that the pawn has promoted into
 * @param {PieceType | null} capturedPiece The piece that was captured in the process (If captured)
 * @param {string} destination Destination of where the piece moved E.G: A1
 * @returns Move Component For Promoting Pawns
 */
const PawnPromotionMove = ({
  piece,
  updatedPiece,
  capturedPiece,
  destination,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-4">
      <div className="flex items-center gap-2">
        <img
          src={`${piece.pieceColor.toLowerCase()}-${piece.pieceName.toLowerCase()}.png`}
          className="h-6 w-6 hidden lg:flex"
          alt={`${piece.pieceColor} ${piece.pieceName} piece`}
        />
        <span className="text-gray-800 text-xs">Promotion</span>
        <img
          src={`${piece.pieceColor.toLowerCase()}-${updatedPiece?.toLowerCase()}.png`}
          className="h-6 w-6 hidden lg:flex"
          alt={`${piece.pieceColor} ${updatedPiece} piece`}
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <img
          src={`${piece.pieceColor.toLowerCase()}-${updatedPiece?.toLowerCase()}.png`}
          className="h-6 w-6"
          alt={`${piece.pieceColor} ${updatedPiece} piece`}
        />
        <span className="text-gray-800 text-base">{`→`}</span>

        {capturedPiece ? (
          <img
            src={`${capturedPiece.pieceColor.toLowerCase()}-${capturedPiece.pieceName.toLowerCase()}.png`}
            className="h-6 w-6"
            alt={`${capturedPiece.pieceName} ${capturedPiece} piece`}
          />
        ) : (
          <p className="text-gray-800">{destination.toUpperCase()}</p>
        )}
      </div>
    </div>
  );
};
export default PawnPromotionMove;
