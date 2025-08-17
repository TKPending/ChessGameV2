import { PieceName, PieceType } from "@/app/types/ChessTypes";

type Props = {
  piece: PieceType;
  updatedPiece: PieceName | undefined;
  capturedPiece: PieceType | null;
  destination: string;
};

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
          alt={`${piece.pieceColor.toLowerCase()} ${piece.pieceName} piece`}
        />
        .toLowerCase()
        <span className="text-gray-800 text-xs">Promotion</span>
        <img
          src={`${piece.pieceColor.toLowerCase()}-${updatedPiece?.toLowerCase()}.png`}
          className="h-6 w-6 hidden lg:flex"
          alt={`${piece.pieceColor.toLowerCase()} ${updatedPiece} piece`}
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <img
          src={`${piece.pieceColor.toLowerCase()}-${updatedPiece?.toLowerCase()}.png`}
          className="h-6 w-6"
          alt={`${piece.pieceColor.toLowerCase()} ${updatedPiece} piece`}
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
