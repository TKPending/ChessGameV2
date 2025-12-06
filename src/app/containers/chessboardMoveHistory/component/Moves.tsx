import { useSelector, useDispatch } from "react-redux";
import CaptureMove from "@/app/containers/chessboardMoveHistory/component/moves/CaptureMove";
import StandardMove from "@/app/containers/chessboardMoveHistory/component/moves/StandardMove";
import PawnPromotionMove from "@/app/containers/chessboardMoveHistory/component/moves/PawnPromotionMove";
import { selectChessboardHistory } from "@/app/utils/selectors/chessboardHistoryStateSelector";
import { setChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { setSelectedMoveHistory } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";
import {
  PieceType,
  MoveHistoryType,
  ChessColors,
  TileType,
} from "@/app/types/ChessTypes";

type Props = {
  move: MoveHistoryType;
};

const MovesContainer = ({ move }: Props) => {
  if (!move.from.pieceOnTile) return;
  const dispatch = useDispatch();
  const chessboardHistory: TileType[][][] = useSelector(
    selectChessboardHistory
  );
  const currentTurn: string = move.from.pieceOnTile.pieceColor;

  const piece: PieceType | null = move.from.pieceOnTile;
  const enemy: PieceType | null = move.to.pieceOnTile;
  const position: string = move.to.tilePosition;
  const captured: boolean = enemy ? true : false;

  const handleOnClick = () => {
    const selectedHistory = chessboardHistory[move.moveCount];

    dispatch(setChessboard(selectedHistory));
    dispatch(setSelectedMoveHistory(move.moveCount));
  };

  return (
    <div
      onClick={handleOnClick}
      className={`${
        currentTurn === ChessColors.black ? "bg-light-tile" : "bg-dark-tile"
      } ${
        move.selected && "border-customGreen border-4"
      } min-h-[40px] md:min-h-[60px] max-h-[70px] min-w-36 md:w-full flex items-center justify-around rounded-md shadow-md overflow-hidden text-xs md:text-base font-semibold hover:cursor-pointer`}
    >
      {move.pawnPromotion ? (
        <PawnPromotionMove
          piece={piece}
          updatedPiece={move.updatedPiece}
          capturedPiece={enemy}
          destination={position}
        />
      ) : captured ? (
        <CaptureMove piece={piece} enemy={enemy} />
      ) : (
        <StandardMove piece={piece} destination={position} />
      )}
    </div>
  );
};

export default MovesContainer;
