import { PieceType } from "@/app/types/ChessTypes";

/**
 * Checks whether a tile is empty or has an enemy on the tile
 * @param enemyPiece Enemy Piece on Tile
 * @param pieceToMoveColor Color of the current turn
 * @returns True: Tile is empty or has an Enemy on Tile. False: Friendly
 */
export const TileEmptyOrHasEnemy = (
  enemyPiece: PieceType | null,
  pieceToMoveColor: "White" | "Black"
) => {
  return !enemyPiece || enemyPiece.pieceColor !== pieceToMoveColor;
};
