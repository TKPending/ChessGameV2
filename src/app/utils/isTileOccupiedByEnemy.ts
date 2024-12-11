import { TileType } from "@/app/types/TileType";
import { PieceType } from "@/app/types/PieceType";

export const isTileOccupiedByEnemy = (
  chessboard: TileType[][],
  position: [number, number],
  pieceColor: "White" | "Black"
): boolean => {
  const [row, col] = position;

  if (row < 0 || row >= 8 || col < 0 || col >= 8) return false;

  const piece: PieceType | null = chessboard[row][col].pieceOnTile;

  return piece && piece.pieceColor !== pieceColor;
};
