import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { findKing } from "@/app/utils/pieceMovements/checkmate/helper/findKing";
import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";
import { updateChessboard } from "@/app/utils/handlers/helpers/handleMovePieceHelpers/updateChessboard";
import { generateAllEnemyMoves } from "@/app/utils/pieceMovements/generateMoves/generateAllEnemyMoves";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { TileType } from "@/app/types/ChessTypes";

/**
 * Simulates a move, to verify that the King doesn't get placed in check / checkmate
 * @param chessboard Current chessboard state
 * @param previousClickedTile Originally clicked tile
 * @param clickedTile Current Clicked Tile
 * @returns True or False whether the King will be in check after move
 */
export const isKingSafeAfterMove = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  previousClickedTile: TileType,
  clickedTile: TileType,
  currentTeamColor: "White" | "Black",
  enemyTeamColor: "White" | "Black"
) => {
  const simulatedChessboard: TileType[][] = updateChessboard(
    chessboard,
    previousClickedTile,
    clickedTile,
    true
  );

  const currentTurnKing: TileType | null = findKing(
    simulatedChessboard,
    currentTeamColor
  );
  if (!currentTurnKing) return true;

  const simulatedEnemyMoves: EnemyAttackType[] = generateAllEnemyMoves(
    dispatch,
    simulatedChessboard,
    enemyTeamColor,
    true
  );

  const [kingRow, kingCol] = convertTilePosition(currentTurnKing.tilePosition);

  return simulatedEnemyMoves.some((enemy) =>
    enemy.moves.some(([row, col]) => row === kingRow && col === kingCol)
  );
};
