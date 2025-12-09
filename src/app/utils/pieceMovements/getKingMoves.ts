import { pieceMoves } from "@/app/utils/pieceMoves";
import { ChessColors, TileType } from "@/app/types/ChessTypes";

/**
 * Get's all the moves that the King can make
 * @param chessboard Object that keeps track of the current state
 * @param currentRow The current row that the King is in
 * @param currentCol The current col that the King is in
 * @param pieceToMoveColor The color of the piece that needs to be moved
 * @returns All valid King Moves
 */
export const getKingMoves = (
  chessboard: TileType[][],
  currentRow: number,
  currentCol: number,
  pieceToMoveColor: ChessColors.white | ChessColors.black
): [number, number][] => {
  let kingMoves: [number, number][] = [
    [currentRow + 1, currentCol],
    [currentRow - 1, currentCol],
    [currentRow, currentCol + 1],
    [currentRow, currentCol - 1],
    [currentRow + 1, currentCol + 1],
    [currentRow + 1, currentCol - 1],
    [currentRow - 1, currentCol + 1],
    [currentRow - 1, currentCol - 1],
  ];

  const kingPotentialMoves = pieceMoves(
    chessboard,
    kingMoves,
    pieceToMoveColor
  );

  return kingPotentialMoves;
};
