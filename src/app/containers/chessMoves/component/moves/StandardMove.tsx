import { PieceType } from "@/app/types/ChessTypes";

type Props = {
  piece: PieceType;
  destination: string;
};

const StandardMove = ({ piece, destination }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-between h-full w-full px-4">
      <img
        src={`${piece.pieceColor.toLowerCase()}-${piece.pieceName.toLowerCase()}.png`}
        className="h-6 w-6"
        alt={`${piece.pieceColor} ${piece.pieceName} piece`}
      />
      <span className="text-gray-800 text-lg">{`→`}</span>
      <p className="text-gray-800">{destination.toUpperCase()}</p>
    </div>
  );
};
export default StandardMove;
