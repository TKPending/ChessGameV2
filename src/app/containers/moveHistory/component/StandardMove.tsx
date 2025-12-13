import { PieceType } from "@/app/types/ChessTypes";

type Props = {
  piece: PieceType;
  destination: string;
};

/**
 * Renders the move component for promoting a piece
 * @param {PieceType} piece The piece that has been moved
 * @param {string} destination Destination of where the piece moved E.G: A1
 * @returns Move Component For A Standard Move
 */
const StandardMove = ({ piece, destination }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-between px-4">
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
