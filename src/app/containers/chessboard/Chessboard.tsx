import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/app/redux/store";
import { setChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { setEnemyMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { generateTiles } from "@/app/utils/chessboard/generateTiles";
import { generateAllEnemyMoves } from "@/app/utils/pieceMovements/generateMoves/generateAllEnemyMoves";
import { checkForCheckmate } from "@/app/utils/pieceMovements/checkmate/checkForCheckmate";
import ChessboardComponent from "./components/ChessboardComponent";
import CheckmateContainer from "@/app/containers/checkmate/CheckmateContainer";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import PawnPromotionContainer from "@/app/containers/chessboard/containers/PawnPromotionContainer";
import { ChessColors } from "@/app/types/ChessTypes";

const Chessboard = () => {
  const dispatch = useDispatch();
  const { chessboard, pawnPromotion } = useSelector(
    (state: RootState) => state.chessboardState
  );
  const { currentTurn, isKingInCheckmate } = useSelector(
    (state: RootState) => state.gameState
  );
  const { allEnemyMoves, isKingInCheck } = useSelector(
    (state: RootState) => state.moveAnalysisState
  );

  const currentMoveCount: number = useSelector(
    (state: RootState) => state.chessboardHistoryState.currentMoveCount
  );

  useEffect(() => {
    if (chessboard.length === 0) {
      dispatch(setChessboard(generateTiles()));
    }

    if (
      chessboard.length > 0 &&
      allEnemyMoves.length === 0 &&
      currentMoveCount > 3
    ) {
      const oppositeColor: ChessColors.white | ChessColors.black =
        currentTurn === ChessColors.white
          ? ChessColors.black
          : ChessColors.white;

      const notSimulation: boolean = false;

      const enemyLegalMoves: EnemyAttackType[] = generateAllEnemyMoves(
        dispatch,
        chessboard,
        oppositeColor,
        notSimulation
      );
      checkForCheckmate(dispatch, chessboard, enemyLegalMoves, currentTurn);

      dispatch(setEnemyMoves(enemyLegalMoves));
    }
  }, [
    chessboard,
    currentTurn,
    allEnemyMoves,
    isKingInCheck,
    dispatch,
    isKingInCheckmate,
  ]);

  return (
    <div className="h-auto w-auto">
      {isKingInCheckmate && <CheckmateContainer />}
      {pawnPromotion.isPawnPromotion && (
        <PawnPromotionContainer currentTurn={currentTurn} />
      )}
      <ChessboardComponent />
    </div>
  );
};

export default Chessboard;
