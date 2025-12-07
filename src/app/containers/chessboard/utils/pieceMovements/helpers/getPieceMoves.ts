import { convertTilePosition } from "@/app/utils/convertTilePosition";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { TileType } from "@/app/types/ChessTypes";

/***
 * Return the moves of the selected piece
 * @param clickedTile Tile clicked by user
 * @param currentTeamMoves All moves of the current team
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
    (piece: EnemyAttackType) =>
      piece.piecePosition[0] === tilePosition[0] &&
      piece.piecePosition[1] === tilePosition[1]
  );

  return match ? match.moves : null;
};
