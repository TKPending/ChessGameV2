import { pieceMoves } from "@/app/utils/pieceMoves";
import { ChessColors, TileType } from "@/app/types/ChessTypes";

/**
 * Returns all the moves of a Knight piece
 * @param chessboard Object keeping track of the chessboard
 * @param currentRow Row of the current Knight
 * @param currentCol Col of the current Knight
 * @param pieceToMoveColor Color of the current Knight
 * @returns
 */
export const getKnightMoves = (
  chessboard: TileType[][],
  currentRow: number,
  currentCol: number,
  pieceToMoveColor: ChessColors.white | ChessColors.black
): [number, number][] => {
  const knightMoves: [number, number][] = [
    [currentRow + 2, currentCol + 1],
    [currentRow + 2, currentCol - 1],
    [currentRow - 2, currentCol + 1],
    [currentRow - 2, currentCol - 1],
    [currentRow + 1, currentCol + 2],
    [currentRow + 1, currentCol - 2],
    [currentRow - 1, currentCol + 2],
    [currentRow - 1, currentCol - 2],
  ];

  return pieceMoves(chessboard, knightMoves, pieceToMoveColor);
};
