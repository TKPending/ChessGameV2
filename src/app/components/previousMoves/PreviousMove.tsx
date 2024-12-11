import { PieceType } from "@/app/types/PieceType";
import { MoveHistoryType } from "@/app/types/GameHistoryType";

type Props = {
  move: MoveHistoryType;
  count: number;
};

const PreviousMove = ({ move, count }: Props) => {
  const piece: PieceType | null = move.from.pieceOnTile;
  const enemy: PieceType | null = move.to.pieceOnTile;
  const position: string = move.to.tilePosition;
  const captured: boolean = enemy ? true : false;

  return (
    <div className="bg-gray-800 min-h-14 w-full flex items-center justify-around px-4 rounded-md shadow-md">
      <span className="text-white text-sm font-semibold w-2/5 text-left">
        Move #{count}
      </span>

      <div className="text-gray-200 text-sm flex items-center justify-center gap-8 w-3/5">
        <img
          src={`/${piece?.pieceColor}-${piece?.pieceName}.png`}
          className="h-6 w-6"
        />
        <span className="text-gray-500 ">{`→`}</span>
        <div className="flex items-center justify-start gap-2">
          <span className="font-bold">{position.toUpperCase()}</span>
          {captured && (
            <img
              src={`/${enemy?.pieceColor}-${enemy?.pieceName}.png`}
              className="h-4 w-4"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviousMove;
