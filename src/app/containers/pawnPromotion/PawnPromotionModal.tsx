import { useDispatch, useSelector } from "react-redux";
import PawnPromotionComponent from "@/app/containers/pawnPromotion/components/PawnPromotionComponent";
import { selectCurrentTurn } from "@/app/utils/selectors/gameStateSelectors";
import { setTileWithPromotedPawn } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { updateMovePawnPromotion } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";
import { getPlayerColor } from "@/app/utils/getPlayerColor";
import { PieceType, PieceName, ChessColors } from "@/app/types/ChessTypes";

const PawnPromotionModal = () => {
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

export default PawnPromotionModal;
