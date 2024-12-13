import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { chessboardSearch } from "./chessboardSearch";
import { TileType } from "@/app/types/TileType";
import { possiblePieceMoves } from "../possiblePieceMoves";

export const getSlidingPieceMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  currentRow: number,
  currentCol: number,
  directions: number[][],
  pieceToMoveColor: "White" | "Black"
): number[][] => {
  const validMoves: [number, number][] = [];

  // Loop over all directions (e.g., up, down, left, right for rooks)
  directions.forEach(([rowChange, colChange]) => {
    let row = currentRow;
    let col = currentCol;

    // Keep moving in this direction until we hit an edge or obstruction
    while (true) {
      row += rowChange;
      col += colChange;

      // Check bounds
      if (row < 0 || row >= 8 || col < 0 || col >= 8) break;

      const targetTile = chessboard[row][col];
      const enemyPiece = targetTile.pieceOnTile;

      // If the tile is empty or occupied by an enemy piece, it is a valid move
      if (!enemyPiece || enemyPiece.pieceColor !== pieceToMoveColor) {
        validMoves.push([row, col]);

        // If the tile has an enemy piece, stop (capture)
        if (enemyPiece) break;
      } else {
        // Stop if it's a friendly piece
        break;
      }
    }
  });

  return possiblePieceMoves(dispatch, chessboard, validMoves, pieceToMoveColor);
};
