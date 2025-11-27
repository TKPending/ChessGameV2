import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { generateAllTeamMoves } from "@/app/containers/chessboard/utils/pieceMovements/generateMoves/generateAllTeamMoves";
import { isKingSafeAfterMove } from "@/app/containers/chessboard/utils/handlers/helpers/handPieceOnTileHelpers/isKingSafeAfterMove";
import { getPlayerColor } from "@/app/utils/getPlayerColor";
import { setStalemate } from "@/app/redux/slices/gameState/gameStateSlice";
import { ChessColors, TileType } from "@/app/types/ChessTypes";
import { EnemyAttackType } from "@/app/types/MoveTypes";

export const stalemate = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  currentTurn: ChessColors,
  allEnemyMoves: EnemyAttackType[],
  isKingInCheck: boolean
) => {
  if (isKingInCheck) return;

  const currentTurnPieceWithMoves = generateAllTeamMoves(
    dispatch,
    chessboard,
    currentTurn,
    false
  );

  const enemyTeamColor = getPlayerColor(currentTurn, true);

  const safeMoves: number[][] = [];

  currentTurnPieceWithMoves.forEach((piece) => {
    piece.moves.forEach(([targetRow, targetCol]) => {
      const [fromRow, fromCol] = piece.piecePosition;

      const kingUnsafeAfterMove = isKingSafeAfterMove(
        dispatch,
        chessboard,
        chessboard[fromRow][fromCol],
        chessboard[targetRow][targetCol],
        currentTurn,
        enemyTeamColor
      );

      // isKingSafeAfterMove returns TRUE when the king *IS in danger*
      // So the move is safe if kingUnsafeAfterMove === false
      if (!kingUnsafeAfterMove) {
        safeMoves.push([targetRow, targetCol]);
      }
    });
  });

  if (safeMoves.length > 0) {
    return;
  } else {
    dispatch(setStalemate());
  }
};
