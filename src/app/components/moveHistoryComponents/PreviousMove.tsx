import CaptureMove from "./Moves/CaptureMove";
import StandardMove from "./Moves/StandardMove";
import PawnPromotionMove from "./Moves/PawnPromotionMove";
import { MoveHistoryType } from "@/app/types/GameHistoryType";
import { PieceType } from "@/app/types/PieceType";

type Props = {
  move: MoveHistoryType;
};

const PreviousMove = ({ move }: Props) => {
  if (!move.from.pieceOnTile) return;

  const piece: PieceType | null = move.from.pieceOnTile;
  const enemy: PieceType | null = move.to.pieceOnTile;
  const position: string = move.to.tilePosition;
  const captured: boolean = enemy ? true : false;

  return (
    <div className="bg-gray-800 min-h-14 min-w-24 flex items-center justify-around rounded-md shadow-md overflow-hidden">
      {move.pawnPromotion ? (
        <PawnPromotionMove
          piece={piece}
          updatedPiece={move.updatedPiece}
          capturedPiece={enemy}
          destination={position}
        />
      ) : captured ? (
        <CaptureMove piece={piece} destination={position} enemy={enemy} />
      ) : (
        <StandardMove piece={piece} destination={position} />
      )}
    </div>
  );
};

export default PreviousMove;
