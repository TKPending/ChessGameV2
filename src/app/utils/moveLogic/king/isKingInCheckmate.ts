import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { generateEnemyMoves } from "../generateEnemyMoves";
import { TileType } from "@/app/types/TileType";

export const isKingInCheckmate = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  kingPosition: [number, number],
  pieceToMoveColor: "White" | "Black"
): boolean => {
  // Generate all enemy moves
  const enemyMoves = generateEnemyMoves(
    dispatch,
    chessboard,
    pieceToMoveColor === "White" ? "Black" : "White"
  );

  // If the king's position is being attacked and there are no valid moves to escape check, it's checkmate
  return enemyMoves.some(([row, col]) => {
    // If any valid move puts the king in check, it's checkmate
    return row === kingPosition[0] && col === kingPosition[1];
  });
};
