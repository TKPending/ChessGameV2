import CaptureMove from "@/app/containers/chessMoves/component/moves/CaptureMove";
import StandardMove from "@/app/containers/chessMoves/component/moves/StandardMove";
import PawnPromotionMove from "@/app/containers/chessMoves/component/moves/PawnPromotionMove";
import {
  PieceType,
  MoveHistoryType,
  ChessColors,
} from "@/app/types/ChessTypes";

type Props = {
  move: MoveHistoryType;
};

const MovesContainer = ({ move }: Props) => {
  if (!move.from.pieceOnTile) return;

  const currentTurn: string = move.from.pieceOnTile.pieceColor;

  const piece: PieceType | null = move.from.pieceOnTile;
  const enemy: PieceType | null = move.to.pieceOnTile;
  const position: string = move.to.tilePosition;
  const captured: boolean = enemy ? true : false;

  return (
    <div
      className={`${
        currentTurn === ChessColors.black ? "bg-light-tile" : "bg-dark-tile"
      } min-h-[40px] md:min-h-[60px] max-h-[70px] min-w-36 md:w-full flex items-center justify-around rounded-md shadow-md overflow-hidden text-xs md:text-base font-semibold`}
    >
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
