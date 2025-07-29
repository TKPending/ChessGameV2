import { setTileWithPromotedPiece } from "@/app/redux/slices/board/boardSlice";
import { PieceName } from "@/app/types/PieceType";
import { useDispatch } from "react-redux";
import { PieceType } from "@/app/types/PieceType";
import { setPawnPromotionMoveHistory } from "@/app/redux/slices/gameHistory/gameHistorySlice";
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
