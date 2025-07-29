import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { getKingMoves } from "@/app/utils/pieceMovements/getKingMoves";
import { TileType } from "@/app/types/TileType";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { setIsKingInCheckmate } from "@/app/redux/slices/old/board/boardSlice";

/**
 * Check whether King can capture a piece attacking the King
 * @param dispatch Update the redux state
 * @param chessboard Object keeping tracking of Chessboard
 * @param kingRow Row King is on
 * @param kingCol Col King is on
 * @param kingTile Tile that the King is on
 * @param enemyMoves All enemy moves
 * @param currentTurn Current turn on the board
 * @returns All moves where a King can capture a piece
 */
export const kingCaptureOutOfCheck = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  kingMoves: [number, number][],
  kingTile: TileType,
  enemyMoves: EnemyAttackType[],
  currentTurn: "White" | "Black"
): number[][] => {
  if (!kingTile || !kingTile.pieceOnTile) return [];

  const kingCaptureMoves = kingMoves.filter(
    ([row, col]) =>
      chessboard[row][col].pieceOnTile?.pieceColor !== currentTurn &&
      chessboard[row][col].pieceOnTile
  );

  const kingValidCaptureMoves = kingCaptureMoves.filter(([row, col]) => {
    const isMoveSafe = enemyMoves.some((enemy) =>
      enemy.moves.some(
        ([enemyRow, enemyCol]) => enemyRow === row && enemyCol === col
      )
    );

    return isMoveSafe;
  });

  if (kingValidCaptureMoves.length > 0) {
    dispatch(setIsKingInCheckmate(false));
  }

  return kingValidCaptureMoves;
};
