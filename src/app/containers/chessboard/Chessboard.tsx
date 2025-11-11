import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { setEnemyMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { generateTiles } from "@/app/containers/chessboard/utils/chessboard/generateTiles";
import { generateAllEnemyMoves } from "@/app/containers/chessboard/utils/pieceMovements/generateMoves/generateAllEnemyMoves";
import { checkForCheckmate } from "@/app/containers/chessboard/utils/pieceMovements/checkmate/checkForCheckmate";
import CheckmateContainer from "@/app/containers/features/checkmate/CheckmateContainer";
import { EnemyAttackType, PawnPromotionType } from "@/app/types/MoveTypes";
import PawnPromotionContainer from "@/app/containers/chessboard/features/pawnPromotion/PawnPromotionContainer";
import { ChessColors } from "@/app/types/ChessTypes";
import TileContainer from "@/app/containers/chessboard/features/tile/TileContainer";
import { TileType } from "@/app/types/ChessTypes";
import {
  selectChessboard,
  selectPawnPromotion,
} from "@/app/utils/selectors/chessboardStateSelectors";
import {
  selectCurrentTurn,
  selectIsKingInCheckmate,
} from "@/app/utils/selectors/gameStateSelectors";
import {
  selectAllEnemyMoves,
  selectIsKingInCheck,
} from "@/app/utils/selectors/moveAnalysisStateSelector";
import { selectCurrentMoveCount } from "@/app/utils/selectors/chessboardHistoryStateSelector";
import { getPlayerColor } from "@/app/utils/getPlayerColor";

const Chessboard = () => {
  const dispatch = useDispatch();
  const chessboard: TileType[][] = useSelector(selectChessboard);
  const pawnPromotion: PawnPromotionType = useSelector(selectPawnPromotion);
  const currentTurn: ChessColors.white | ChessColors.black =
    useSelector(selectCurrentTurn);
  const isKingInCheckmate: boolean = useSelector(selectIsKingInCheckmate);
  const allEnemyMoves: EnemyAttackType[] = useSelector(selectAllEnemyMoves);
  const isKingInCheck: boolean = useSelector(selectIsKingInCheck);
  const currentMoveCount: number = useSelector(selectCurrentMoveCount);

  useEffect(() => {
    if (chessboard.length === 0) {
      dispatch(setChessboard(generateTiles()));
    }

    if (
      chessboard.length > 0 &&
      allEnemyMoves.length === 0 &&
      currentMoveCount > 3
    ) {
      const enemyColor: ChessColors = getPlayerColor(currentTurn, true);

      const notSimulation: boolean = false;

      const enemyLegalMoves: EnemyAttackType[] = generateAllEnemyMoves(
        dispatch,
        chessboard,
        enemyColor,
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
