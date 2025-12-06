import { TileType } from "@/app/types/ChessTypes";

/**
 * Checks whether a tile is empty or has an enemy on the tile
 * @param enemyPiece Enemy Piece on Tile
 * @param pieceToMoveColor Color of the current turn
 * @returns True: Tile is empty or has an Enemy on Tile. False: Friendly
 */
export const checkTile = (
  targetTile: TileType,
  pieceToMoveColor: "White" | "Black"
) => {
  // There's nothing on the Tile
  if (!targetTile.pieceOnTile) {
    return true;
  }
  // Piece on tile is enemy
  if (targetTile.pieceOnTile?.pieceColor !== pieceToMoveColor) {
    return true;
  }

  // Friendly or Empty
  return false;
};
