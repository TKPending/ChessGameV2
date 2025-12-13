import { convertTilePosition } from "@/app/utils/convertTilePosition";

// Check if move is valid within legal moves.
const validMoveCheck = (
  validMoves: number[][],
  targetRow: number,
  targetCol: number
): boolean => {
  return validMoves.some(
    ([row, col]) => targetRow === row && targetCol === col
  );
};

/**
 * Determines if the move to the clicked tile is valid based on the piece's legal moves.
 * @param validPieceMoves All legal moves for the selected piece.
 * @param clickedTilePosition The position of the tile that was clicked.
 * @returns True if move is valid, false otherwise.
 */
export const isMoveValid = (
  validPieceMoves: number[][],
  clickedTilePosition: string
): boolean => {
  const [targetRow, targetCol] = convertTilePosition(clickedTilePosition);

  return validMoveCheck(validPieceMoves, targetRow, targetCol);
};
