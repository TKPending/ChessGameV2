import { TileType } from "@/app/types/ChessTypes";

/**
 * Returns all tiles (E.G: a1) that are attacked
 * @param chessboard Chessboard object that the Chess Game is going to be played on
 * @param validMoves All the valid moves, that should be highlighted once a Tile is clicked
 * @param currentTurn The current turn in a game
 */
export const findEnemyTiles = (
  chessboard: TileType[][],
  validMoves: number[][],
  currentTurn: "White" | "Black"
): string[] => {
  const attackedTiles: string[] = [];
  validMoves.forEach(([row, col]) => {
    const validMoveTiles: TileType = chessboard[row][col];
    if (!validMoveTiles.pieceOnTile) {
      return;
    }

    if (validMoveTiles.pieceOnTile.pieceColor !== currentTurn) {
      attackedTiles.push(validMoveTiles.tilePosition);
    }
  });

  return attackedTiles;
};
