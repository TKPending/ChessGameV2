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
    <div className="flex flex-col items-center justify-center h-full w-full px-4">
      <div className="flex items-center gap-2">
        <img
          src={`${piece.pieceColor}-${piece.pieceName}.png`}
          className="h-6 w-6 hidden lg:flex"
        />
        <span className="text-customGreen text-xs">Promotion</span>
        <img
          src={`${piece.pieceColor}-${updatedPiece}.png`}
          className="h-6 w-6 hidden lg:flex"
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <img
          src={`${piece.pieceColor}-${updatedPiece}.png`}
          className="h-6 w-6"
        />
        <span className="text-customGreen text-base">{`→`}</span>

        {capturedPiece ? (
          <img
            src={`${capturedPiece.pieceColor}-${capturedPiece.pieceName}.png`}
            className="h-6 w-6"
          />
        ) : (
          <p className="text-customGreen">{destination.toUpperCase()}</p>
        )}
      </div>
    </div>
  );
};
export default PawnPromotionMove;
