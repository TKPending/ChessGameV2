import { TileType } from "@/app/types/TileType";
import { findKing } from "@/app/utils/pieceMovements/checkmate/helper/findKing";
import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";
import { updateChessboard } from "@/app/utils/handlers/helpers/handleMovePieceHelpers/updateChessboard";
import { generateAllEnemyMoves } from "@/app/utils/pieceMovements/generateMoves/generateAllEnemyMoves";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

/**
 * Simulates a move, to verify that the King doesn't get placed in check / checkmate
 * @param chessboard Current chessboard state
 * @param previousClickedTile Originally clicked tile
 * @param clickedTile Current Clicked Tile
 */
export const simulateMove = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  previousClickedTile: TileType,
  clickedTile: TileType,
  currentTurn: "White" | "Black"
) => {
  const simulatedChessboard: TileType[][] = updateChessboard(
    chessboard,
    previousClickedTile,
    clickedTile,
    true
  );

  const currentTurnKing: TileType | null = findKing(
    simulatedChessboard,
    currentTurn
  );
  if (!currentTurnKing) return true;

  const enemyColor: "White" | "Black" =
    currentTurn === "White" ? "Black" : "White";
  const simulatedEnemyMoves: EnemyAttackType[] = generateAllEnemyMoves(
    dispatch,
    simulatedChessboard,
    enemyColor,
    true
  );

  const [kingRow, kingCol] = convertTilePosition(currentTurnKing.tilePosition);
  return simulatedEnemyMoves.some((enemy) =>
    enemy.moves.some(([row, col]) => row === kingRow && col === kingCol)
  );
};
