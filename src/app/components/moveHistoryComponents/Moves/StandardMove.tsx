import { PieceType } from "@/app/types/PieceType";

type Props = {
  piece: PieceType;
  destination: string;
};

const StandardMove = ({ piece, destination }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-between h-full w-full px-4">
      <img
        src={`${piece.pieceColor}-${piece.pieceName}.png`}
        className="h-6 w-6"
      />
      <span className="text-customGreen text-lg">{`→`}</span>
      <p className="text-customGreen">{destination.toUpperCase()}</p>
    </div>
  );
};
export default StandardMove;
