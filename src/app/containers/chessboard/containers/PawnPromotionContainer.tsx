import { setTileWithPromotedPiece } from "@/app/redux/slices/old/board/boardSlice";
import { PieceName } from "@/app/types/PieceTypes";
import { useDispatch } from "react-redux";
import { PieceType } from "@/app/types/PieceTypes";
import { setPawnPromotionMoveHistory } from "@/app/redux/slices/old/gameHistory/gameHistorySlice";
import PawnPromotionComponent from "@/app/containers/chessboard/components/PawnPromotionComponent";

type Props = {
  currentTurn: "White" | "Black";
};

const PawnPromotionContainer = ({ currentTurn }: Props) => {
  const dispatch = useDispatch();
  const turnToChange: "White" | "Black" =
    currentTurn === "White" ? "Black" : "White";

  const handlePiecePromotion = (pieceName: PieceName) => {
    const promotedPiece: PieceType = {
      pieceName,
      pieceColor: turnToChange,
      isAlive: true,
      hasMoved: false,
      isPromotion: false,
    };

    dispatch(
      setPawnPromotionMoveHistory({
        pawnPromotion: true,
        updatedPiece: pieceName,
      })
    );
    dispatch(setTileWithPromotedPiece(promotedPiece));
  };

  return <PawnPromotionComponent handlePiecePromotion={handlePiecePromotion} />;
};

export default PawnPromotionContainer;
