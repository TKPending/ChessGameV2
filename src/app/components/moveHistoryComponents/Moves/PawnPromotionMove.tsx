import { PieceName, PieceType } from "@/app/types/PieceType";

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
    <div className="flex justify-between items-center h-full w-full p-2">
      <div className="flex items-center">
        <p className="text-white">{`(`}</p>
        <img
          src={`${piece.pieceColor}-${piece.pieceName}.png`}
          className="h-4 w-4"
        />
        <span className="text-customGreen text-xs">{`→`}</span>

        <img
          src={`${piece.pieceColor}-${updatedPiece}.png`}
          className="h-4 w-4"
        />
        <p className="text-white">{`)`}</p>
      </div>

      <span className="text-customGreen">{`→`}</span>

      {capturedPiece ? (
        <img
          src={`${capturedPiece.pieceColor}-${updatedPiece}.png`}
          className="h-6 w-6"
        />
      ) : (
        <p className="text-customGreen">{destination.toUpperCase()}</p>
      )}
    </div>
  );
};

export default PawnPromotionMove;
