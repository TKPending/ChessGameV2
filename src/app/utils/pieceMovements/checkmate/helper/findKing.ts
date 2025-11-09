import { ChessColors, TileType } from "@/app/types/ChessTypes";

export const findKing = (
  chessboard: TileType[][],
  currentTurn: ChessColors.white | ChessColors.black
) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = chessboard[row][col];
      const piece = tile.pieceOnTile;
      if (
        piece &&
        piece.pieceName === "King" &&
        piece.pieceColor === currentTurn
      ) {
        return tile;
      }
    }
  }

  return null;
};
