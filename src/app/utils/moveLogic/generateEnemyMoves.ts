import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { TileType } from "@/app/types/TileType";
import { PieceName } from "@/app/types/PieceType";
import { getPawnMoves } from "./getPawnMoves";
import { getKnightMoves } from "./getKnightMoves";
import { getSlidingPieceMoves } from "./getSlidingPieceMoves";
import { getKingMoves } from "./getKingMoves";
import { convertTilePosition } from "@/app/utils/convertTilePosition";

export const generateEnemyMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  enemyColor: "White" | "Black"
): number[][] => {
  const enemyMoves: Set<string> = new Set();

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = chessboard[row][col];
      const piece = tile.pieceOnTile;

      if (piece && piece.pieceColor === enemyColor) {
        const [enemyRow, enemyCol] = convertTilePosition(tile.tilePosition);

        switch (piece.pieceName) {
          case PieceName.pawn:
            getPawnMoves(
              dispatch,
              chessboard,
              enemyColor,
              enemyRow,
              enemyCol
            ).forEach((move) => enemyMoves.add(`${move[0]}-${move[1]}`));
            break;
          case PieceName.knight:
            getKnightMoves(
              dispatch,
              chessboard,
              enemyRow,
              enemyCol,
              enemyColor
            ).forEach((move) => enemyMoves.add(`${move[0]}-${move[1]}`));
            break;
          case PieceName.rook:
            getSlidingPieceMoves(
              dispatch,
              chessboard,
              enemyRow,
              enemyCol,
              [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1],
              ],
              enemyColor
            ).forEach((move) => enemyMoves.add(`${move[0]}-${move[1]}`));
            break;
          case PieceName.bishop:
            getSlidingPieceMoves(
              dispatch,
              chessboard,
              enemyRow,
              enemyCol,
              [
                [1, 1],
                [1, -1],
                [-1, 1],
                [-1, -1],
              ],
              enemyColor
            ).forEach((move) => enemyMoves.add(`${move[0]}-${move[1]}`));
            break;
          case PieceName.queen:
            getSlidingPieceMoves(
              dispatch,
              chessboard,
              enemyRow,
              enemyCol,
              [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1],
                [1, 1],
                [1, -1],
                [-1, 1],
                [-1, -1],
              ],
              enemyColor
            ).forEach((move) => enemyMoves.add(`${move[0]}-${move[1]}`));
            break;
          case PieceName.king:
            getKingMoves(
              dispatch,
              chessboard,
              enemyRow,
              enemyCol,
              enemyColor
            ).forEach((move) => enemyMoves.add(`${move[0]}-${move[1]}`));
            break;
        }
      }
    }
  }

  // Convert the Set back to an array and return it
  return Array.from(enemyMoves).map((move) => move.split("-").map(Number));
};
