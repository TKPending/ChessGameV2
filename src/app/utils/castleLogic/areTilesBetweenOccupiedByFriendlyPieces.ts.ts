import { TileType } from "@/app/types/TileType";

export const areTilesBetweenOccupiedByFriendlyPieces = (
  chessboard: TileType[][],
  kingPosition: [number, number],
  rookPosition: [number, number],
  currentTurn: "White" | "Black"
): boolean => {
  const [kingRow, kingCol] = kingPosition;
  const [rookRow, rookCol] = rookPosition;

  const startCol = Math.min(kingCol, rookCol) + 1;
  const endCol = Math.max(kingCol, rookCol);

  for (let col = startCol; col < endCol; col++) {
    const tile = chessboard[kingRow][col];
    const piece = tile.pieceOnTile;

    if (piece && piece.pieceColor === currentTurn) {
      return true;
    }
  }

  return false;
};
