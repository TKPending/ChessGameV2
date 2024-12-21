import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";

const validMoveCheck = (
  validMoves: number[][],
  targetRow: number,
  targetCol: number
): boolean => {
  return validMoves.some(
    ([row, col]) => targetRow === row && targetCol === col
  );
};

export const isMoveValid = (
  validPieceMoves: number[][],
  clickedTilePosition: string
): boolean => {
  const [targetRow, targetCol] = convertTilePosition(clickedTilePosition);

  return validMoveCheck(validPieceMoves, targetRow, targetCol);
};
