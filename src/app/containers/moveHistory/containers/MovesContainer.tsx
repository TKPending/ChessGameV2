import { useSelector, useDispatch } from "react-redux";
import CaptureMove from "@/app/containers/moveHistory/component/CaptureMove";
import StandardMove from "@/app/containers/moveHistory/component/StandardMove";
import PawnPromotionMove from "@/app/containers/moveHistory/component/PawnPromotionMove";
import { selectChessboardHistory } from "@/app/utils/selectors/chessboardHistoryStateSelector";
import { setSelectedMoveHistory } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";
import { setChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { setUiPreviousMoveTile } from "@/app/redux/slices/uiChessboard/uiChessboardSlice";
import { MoveHistoryType, ChessColors, TileType } from "@/app/types/ChessTypes";

type Props = {
  move: MoveHistoryType;
};

const MovesContainer = ({ move }: Props) => {
  if (!move.from.pieceOnTile) return null;

  const dispatch = useDispatch();
  const chessboardHistory: TileType[][][] = useSelector(
    selectChessboardHistory
  );

  const piece = move.from.pieceOnTile;
  const enemy = move.to.pieceOnTile;
  const destination = move.to.tilePosition;
  const isBlack = piece.pieceColor === ChessColors.black;

  const onClick = () => {
    const boardSnapshot: TileType[][] = chessboardHistory[move.moveCount];

    dispatch(
      setUiPreviousMoveTile({
        from: move.from.tilePosition,
        to: move.to.tilePosition,
      })
    );

    dispatch(setChessboard(boardSnapshot));
    dispatch(setSelectedMoveHistory(move.moveCount));
  };

  const renderMove = () => {
    if (move.pawnPromotion)
      return (
        <PawnPromotionMove
          piece={piece}
          updatedPiece={move.updatedPiece}
          capturedPiece={enemy}
          destination={destination}
        />
      );

    if (enemy) return <CaptureMove piece={piece} enemy={enemy} />;

    return <StandardMove piece={piece} destination={destination} />;
  };

  return (
    <div
      onClick={onClick}
      className={`
        ${isBlack ? "bg-light-tile" : "bg-dark-tile"}
        ${move.selected && "border-customGreen border-4"}
        min-h-[60px] w-full flex items-center justify-around rounded-md
        shadow-md text-base font-semibold cursor-pointer
      `}
    >
      {renderMove()}
    </div>
  );
};

export default MovesContainer;
