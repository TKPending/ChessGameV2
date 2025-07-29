import { setTileWithPromotedPawn } from "@/app/redux/slices/chessboard/chessboardSlice";
import { updateMovePawnPromotion } from "@/app/redux/slices/chessMoves/chessMovesSlice";
import { useDispatch } from "react-redux";
import { PieceType, PieceName } from "@/app/types/ChessTypes";
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
