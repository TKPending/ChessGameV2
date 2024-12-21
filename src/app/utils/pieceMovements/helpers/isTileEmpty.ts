import { TileType } from "@/app/types/TileType";

export const isTileEmpty = (
  chessboard: TileType[][],
  position: [number, number]
): boolean => {
  const [row, col] = position;
  if (row < 0 || row >= 8 || col < 0 || col >= 8) return false;
  return !chessboard[row][col].pieceOnTile;
};
