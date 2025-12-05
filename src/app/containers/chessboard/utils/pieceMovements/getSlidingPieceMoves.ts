import { pieceMoves } from "./helpers/pieceMoves";
import { ChessColors, TileType } from "@/app/types/ChessTypes";

/**
 * Returns all the moves of the Bishop, Rook and Queen
 * @param chessboard Object keeping track of the Chessboard
 * @param currentRow Row of the current piece
 * @param currentCol Col of the current piece
 * @param directions The direction that the piece is going to move in
 * @param pieceToMoveColor Color of the piece selected to move
 * @returns All possible moves that the piece can make
 */
export const getSlidingPieceMoves = (
  chessboard: TileType[][],
  currentRow: number,
  currentCol: number,
  directions: number[][],
  pieceToMoveColor: ChessColors.white | ChessColors.black
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

  return pieceMoves(chessboard, validMoves, pieceToMoveColor);
};
