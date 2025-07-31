import { PieceType, PlayerType } from "@/app/types/ChessTypes";

type Props = {
  player: PlayerType;
};

const CapturedPieces = ({ player }: Props) => {
  const capturedPieces: PieceType[] = player.capturedPieces;

  return (
    <div className="flex gap-2">
      {capturedPieces.map((piece, index) => (
        <div key={index} className="h-8 w-8">
          <img
            src={`/${piece.pieceColor}-${piece.pieceName}.png`}
            className="h-8 w-8"
            alt={`${piece.pieceColor} ${piece.pieceName} piece`}
          />
        </div>
      ))}
    </div>
  );
};

export default CapturedPieces;
