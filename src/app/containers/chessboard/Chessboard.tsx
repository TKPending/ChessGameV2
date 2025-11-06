import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/app/redux/store";
import { setChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { setEnemyMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { generateTiles } from "@/app/utils/chessboard/generateTiles";
import { generateAllEnemyMoves } from "@/app/utils/pieceMovements/generateMoves/generateAllEnemyMoves";
import { isKingInCheckmate } from "@/app/utils/pieceMovements/checkmate/isKingInCheckmate";
import ChessboardComponent from "./components/ChessboardComponent";
import CheckmateContainer from "@/app/containers/checkmate/CheckmateContainer";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import PawnPromotionContainer from "@/app/containers/chessboard/containers/PawnPromotionContainer";

const Chessboard = () => {
  const dispatch = useDispatch();
  const chessboard = useSelector((state: RootState) => state.chessboard.board);
  const currentTurn = useSelector(
    (state: RootState) => state.chessboard.currentTurn
  );
  const enemyMoves = useSelector(
    (state: RootState) => state.activeMoves.enemyMoves
  );
  const boardMoves: number = useSelector(
    (state: RootState) => state.chessMoves.count
  );

  const isInCheckmate: boolean = useSelector(
    (state: RootState) => state.chessboard.isKingInCheckmate
  );
  const isInCheck: boolean = useSelector(
    (state: RootState) => state.chessboard.isKingInCheck
  );
  const pawnPromotion = useSelector(
    (state: RootState) => state.chessboard.pawnPromotion
  );

  useEffect(() => {
    if (chessboard.length === 0) {
      dispatch(setChessboard(generateTiles()));
    }

    if (chessboard.length > 0 && enemyMoves.length === 0 && boardMoves > 3) {
      const oppositeColor: "White" | "Black" =
        currentTurn === "White" ? "Black" : "White";

      const notSimulation: boolean = false;

      const enemyLegalMoves: EnemyAttackType[] = generateAllEnemyMoves(
        dispatch,
        chessboard,
        oppositeColor,
        notSimulation
      );
      isKingInCheckmate(dispatch, chessboard, enemyLegalMoves, currentTurn);

      dispatch(setEnemyMoves(enemyLegalMoves));
    }
  }, [chessboard, currentTurn, enemyMoves, isInCheck, dispatch, isInCheckmate]);

  return (
    <div className="h-auto w-auto">
      {isInCheckmate && <CheckmateContainer />}
      {pawnPromotion.isPawnPromotion && (
        <PawnPromotionContainer currentTurn={currentTurn} />
      )}
      <ChessboardComponent />
    </div>
  );
};

export default Chessboard;
