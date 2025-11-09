import { setTileWithPromotedPawn } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { updateMovePawnPromotion } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";
import { useDispatch } from "react-redux";
import { PieceType, PieceName, ChessColors } from "@/app/types/ChessTypes";
import PawnPromotionComponent from "@/app/containers/chessboard/components/PawnPromotionComponent";

type Props = {
  currentTurn: "White" | "Black";
};

const PawnPromotionContainer = ({ currentTurn }: Props) => {
  const dispatch = useDispatch();
  const turnToChange: ChessColors =
    currentTurn === ChessColors.white ? ChessColors.black : ChessColors.white;

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
