import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { generateAllEnemyMoves } from "@/app/utils/pieceMovements/generateMoves/generateAllEnemyMoves";
import { isKingSafeAfterMove } from "@/app/utils/handlers/helpers/handPieceOnTileHelpers/isKingSafeAfterMove";
import { ChessColors, TileType } from "@/app/types/ChessTypes";
import { getPlayerColor } from "@/app/utils/chessColors/getPlayerColor";

export const preventCheckmate = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  currentTurn: ChessColors.white | ChessColors.black,
  defensiveMoves: number[][]
): boolean => {
  // Generate all legal moves for the current team
  const currentTeamLegalMoves = generateAllEnemyMoves(
    dispatch,
    chessboard,
    currentTurn,
    true
  );

  // Check if any move matches defensive moves and keeps the King safe
  for (const move of currentTeamLegalMoves) {
    const { piece, moves } = move;

    for (const [moveRow, moveCol] of moves) {
      if (
        defensiveMoves.some(
          ([defRow, defCol]) => defRow === moveRow && defCol === moveCol
        )
      ) {
        const [row, col] = move.piecePosition;

        const previousTile = chessboard[row][col];
        const targetTile = chessboard[moveRow][moveCol];

        const enemyTeamColor: ChessColors.white | ChessColors.black =
          getPlayerColor(currentTurn);

        if (
          !isKingSafeAfterMove(
            dispatch,
            chessboard,
            previousTile,
            targetTile,
            currentTurn,
            enemyTeamColor
          )
        ) {
          return true;
        }
        continue;
      }
    }
  }

  return false;
};
