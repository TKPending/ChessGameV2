import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTurn } from "@/app/utils/selectors/gameStateSelectors";
import { setTileWithPromotedPawn } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { updateMovePawnPromotion } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";
import { PieceType, PieceName, ChessColors } from "@/app/types/ChessTypes";
import PawnPromotionComponent from "@/app/containers/chessboard/features/pawnPromotion/components/PawnPromotionComponent";
import { getPlayerColor } from "@/app/utils/getPlayerColor";

const PawnPromotionContainer = () => {
  const dispatch = useDispatch();
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const turnToChange: ChessColors = getPlayerColor(currentTurn, true);

  const handlePiecePromotion = (pieceName: PieceName) => {
    const promotedPiece: PieceType = {
      pieceName,
      pieceColor: turnToChange,
      isAlive: true,
      hasMoved: false,
      isPromotion: false,
    };

    dispatch(
      updateMovePawnPromotion({
        pawnPromotion: true,
        updatedPiece: pieceName,
      })
    );
    dispatch(setTileWithPromotedPawn(promotedPiece));
  };

  return <PawnPromotionComponent handlePiecePromotion={handlePiecePromotion} />;
};

export default PawnPromotionContainer;
