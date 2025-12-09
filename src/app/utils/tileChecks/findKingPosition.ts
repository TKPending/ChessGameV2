import { TileType, ChessColors, PieceName } from "@/app/types/ChessTypes";

/**
 * Scans the board to find the [row, col] of the King of the specified color
 * @param board Chessboard State
 * @param color Search for the King of this team
 */
export const findKingPosition = (
  board: TileType[][],
  color: ChessColors
): [number, number] | null => {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c].pieceOnTile;
      if (
        piece &&
        piece.pieceName === PieceName.king &&
        piece.pieceColor === color
      ) {
        return [r, c];
      }
    }
  }
  return null;
};
