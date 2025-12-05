import { TileType } from "@/app/types/ChessTypes";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { convertTilePosition } from "@/app/utils/convertTilePosition";

/***
 * Return the moves of the selected piece
 * @param clickedTile Tile clicked by user
 */
export const getPieceMoves = (
  clickedTile: TileType,
  currentTeamMoves: EnemyAttackType[]
): number[][] | null => {
  if (!clickedTile.pieceOnTile) {
    return null;
  }

  const tilePosition = convertTilePosition(clickedTile.tilePosition);

  const match = currentTeamMoves.find(
    (piece) =>
      piece.piecePosition[0] === tilePosition[0] &&
      piece.piecePosition[1] === tilePosition[1]
  );

  return match ? match.moves : null;
};
