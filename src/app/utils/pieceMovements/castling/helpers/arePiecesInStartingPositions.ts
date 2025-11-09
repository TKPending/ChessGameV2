import { ChessColors, TileType } from "@/app/types/ChessTypes";

export const arePiecesInStartingPositions = (
  chessboard: TileType[][],
  currentTurn: ChessColors.white | ChessColors.black
): boolean => {
  const row = currentTurn === ChessColors.white ? 7 : 0;

  const kingTile = chessboard[row][4];
  if (!kingTile.pieceOnTile || kingTile.pieceOnTile.pieceName !== "King")
    return false;

  const leftRookTile = chessboard[row][0];
  const rightRookTile = chessboard[row][7];

  if (
    !leftRookTile.pieceOnTile ||
    leftRookTile.pieceOnTile.pieceName !== "Rook" ||
    !rightRookTile.pieceOnTile ||
    rightRookTile.pieceOnTile.pieceName !== "Rook"
  ) {
    return false;
  }

  return true;
};
