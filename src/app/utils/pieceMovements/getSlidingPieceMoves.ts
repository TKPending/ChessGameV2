import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { TileType } from "@/app/types/TileType";
import { possiblePieceMoves } from "./helpers/possiblePieceMoves";

export const getSlidingPieceMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  currentRow: number,
  currentCol: number,
  directions: number[][],
  pieceToMoveColor: "White" | "Black"
): number[][] => {
  const validMoves: [number, number][] = [];

  directions.forEach(([rowChange, colChange]) => {
    let row = currentRow;
    let col = currentCol;

    while (true) {
      row += rowChange;
      col += colChange;

      if (row < 0 || row >= 8 || col < 0 || col >= 8) break;

      const targetTile = chessboard[row][col];
      const enemyPiece = targetTile.pieceOnTile;

      if (!enemyPiece || enemyPiece.pieceColor !== pieceToMoveColor) {
        validMoves.push([row, col]);

        if (enemyPiece) break;
      } else {
        break;
      }
    }
  });

  return possiblePieceMoves(dispatch, chessboard, validMoves, pieceToMoveColor);
};
