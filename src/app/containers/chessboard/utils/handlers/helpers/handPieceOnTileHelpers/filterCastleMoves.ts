import { canCastle } from "@/app/containers/chessboard/utils/pieceMovements/castling/canCastle";
import { convertTilePosition } from "@/app/utils/convertTilePosition";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { ChessColors, TileType } from "@/app/types/ChessTypes";

/**
 * Filters all moves to see if King can Castle
 * @param chessboard Current chessboard state
 * @param clickedTile Tile the King would be moving to
 * @param enemyMoves All enemy potential moves
 * @param currentTurn Current turn in the game
 * @returns Moves if the king can castle
 */
export const filterCastleMoves = (
  chessboard: TileType[][],
  clickedTile: TileType,
  enemyMoves: EnemyAttackType[],
  currentTurn: ChessColors.white | ChessColors.black
): number[][] => {
  const kingCastleMoves: number[][] = [];
  const [kingRow, kingCol] = convertTilePosition(clickedTile.tilePosition);

  const { canCastleLeft, canCastleRight } = canCastle(
    chessboard,
    enemyMoves,
    currentTurn
  );

  let castleLeftMove: [number, number] = [kingRow, 0];
  let castleRightMove: [number, number] = [kingRow, 7];

  if (canCastleLeft) {
    kingCastleMoves.push(castleLeftMove);
  }
  if (canCastleRight) {
    kingCastleMoves.push(castleRightMove);
  }

  return kingCastleMoves;
};
