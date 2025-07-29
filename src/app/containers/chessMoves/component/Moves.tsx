import CaptureMove from "@/app/containers/chessMoves/component/moves/CaptureMove";
import StandardMove from "@/app/containers/chessMoves/component/moves/StandardMove";
import PawnPromotionMove from "@/app/containers/chessMoves/component/moves/PawnPromotionMove";
import { MoveHistoryType } from "@/app/types/GameHistoryType";
import { PieceType } from "@/app/types/PieceTypes";

type Props = {
  move: MoveHistoryType;
};

const MovesContainer = ({ move }: Props) => {
  if (!move.from.pieceOnTile) return;

  const piece: PieceType | null = move.from.pieceOnTile;
  const enemy: PieceType | null = move.to.pieceOnTile;
  const position: string = move.to.tilePosition;
  const captured: boolean = enemy ? true : false;

  return (
    <div className="bg-gray-800 min-h-[60px] max-h-[70px]  min-w-24 w-48 flex items-center justify-around rounded-md shadow-md overflow-hidden text-xs md:text-base font-semibold">
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

export default MovesContainer;
