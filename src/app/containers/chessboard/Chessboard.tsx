import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/app/redux/store";
import { setChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { setEnemyMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { generateTiles } from "@/app/utils/chessboard/generateTiles";
import { generateAllEnemyMoves } from "@/app/utils/pieceMovements/generateMoves/generateAllEnemyMoves";
import { checkForCheckmate } from "@/app/utils/pieceMovements/checkmate/checkForCheckmate";
import CheckmateContainer from "@/app/containers/features/checkmate/CheckmateContainer";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import PawnPromotionContainer from "@/app/containers/chessboard/features/pawnPromotion/PawnPromotionContainer";
import { ChessColors } from "@/app/types/ChessTypes";
import TileContainer from "@/app/containers/chessboard/features/tile/TileContainer";
import { TileType } from "@/app/types/ChessTypes";

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
    <div className="h-auto w-full flex items-center justify-center">
      {isKingInCheckmate && <CheckmateContainer />}
      {pawnPromotion.isPawnPromotion && (
        <PawnPromotionContainer currentTurn={currentTurn} />
      )}
      <div className="h-full w-full chessboard">
        {chessboard.map((row: TileType[], rowIndex: number) =>
          row.map((tile: TileType, colIndex: number) => (
            <TileContainer key={`${rowIndex}-${colIndex}`} tile={tile} />
          ))
        )}
      </div>
    </div>
  );
};

export default Chessboard;
