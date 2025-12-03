import { ChessColors, TileType } from "@/app/types/ChessTypes";

export const areTilesBetweenOccupiedByFriendlyPieces = (
  chessboard: TileType[][],
  kingPosition: [number, number],
  rookCol: number,
  currentTurn: ChessColors.white | ChessColors.black
): boolean => {
  const [kingRow, kingCol] = kingPosition;

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
