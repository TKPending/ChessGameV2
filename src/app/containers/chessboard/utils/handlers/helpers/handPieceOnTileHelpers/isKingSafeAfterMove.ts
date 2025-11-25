import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { findKing } from "@/app/containers/chessboard/utils/pieceMovements/checkmate/helper/findKing";
import { convertTilePosition } from "@/app/utils/convertTilePosition";
import { updateChessboard } from "@/app/containers/chessboard/utils/handlers/helpers/handleMovePieceHelpers/updateChessboard";
import { generateAllEnemyMoves } from "@/app/containers/chessboard/utils/pieceMovements/generateMoves/generateAllEnemyMoves";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { ChessColors, TileType } from "@/app/types/ChessTypes";

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
  currentTeamColor: ChessColors.white | ChessColors.black,
  enemyTeamColor: ChessColors.white | ChessColors.black
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
