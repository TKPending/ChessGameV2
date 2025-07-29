import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/app/redux/store";
import {
  setChessboard,
  setEnemyMoves,
} from "@/app/redux/slices/board/boardSlice";
import { generateTiles } from "@/app/utils/chessboard/generateTiles";
import { generateAllEnemyMoves } from "@/app/utils/pieceMovements/generateMoves/generateAllEnemyMoves";
import { isKingInCheckmate } from "@/app/utils/pieceMovements/checkmate/isKingInCheckmate";
import ChessboardComponent from "./components/ChessboardComponent";
import CheckmateContainer from "@/app/containers/checkmate/CheckmateContainer";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import PawnPromotionContainer from "@/app/containers/chessboard/containers/PawnPromotionContainer";

const Chessboard = () => {
  const dispatch = useDispatch();
  const chessboard = useSelector((state: RootState) => state.board.chessboard);
  const currentTurn = useSelector(
    (state: RootState) => state.board.currentTurn
  );
  const enemyMoves = useSelector((state: RootState) => state.board.enemyMoves);
  const boardMoves: number = useSelector(
    (state: RootState) => state.gameHistory.count
  );

  const isInCheckmate: boolean = useSelector(
    (state: RootState) => state.board.isKingInCheckmate
  );
  const isInCheck: boolean = useSelector(
    (state: RootState) => state.board.isKingInCheck
  );
  const pawnPromotion = useSelector(
    (state: RootState) => state.board.pawnPromotion
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
