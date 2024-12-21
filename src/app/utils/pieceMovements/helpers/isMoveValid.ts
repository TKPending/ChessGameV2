import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";

const validMoveCheck = (
  validMoves: [number, number][],
  targetRow: number,
  targetCol: number
): boolean => {
  return validMoves.some(
    (move: [number, number]) => targetRow === move[0] && targetCol === move[1]
  );
};

export const isMoveValid = (
  validPieceMoves: [number, number][],
  clickedTilePosition: string
): boolean => {
  const [targetRow, targetCol] = convertTilePosition(clickedTilePosition);

  return validMoveCheck(validPieceMoves, targetRow, targetCol);
};
