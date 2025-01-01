import { PieceType } from "@/app/types/PieceType";

type Props = {
  piece: PieceType;
  destination: string;
};

const StandardMove = ({ piece, destination }: Props) => {
  return (
    <div className="flex justify-between items-center h-full w-full p-2">
      <img
        src={`${piece.pieceColor}-${piece.pieceName}.png`}
        className="h-6 w-6"
      />
      <span className="text-customGreen ">{`→`}</span>
      <p className="text-customGreen text-sm">{destination.toUpperCase()}</p>
    </div>
  );
};

export default StandardMove;
