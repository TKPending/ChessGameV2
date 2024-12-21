import { canCastle } from "@/app/utils/pieceMovements/castling/canCastle";
import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { TileType } from "@/app/types/TileType";

export const filterCastleMoves = (
  chessboard: TileType[][],
  clickedTile: TileType,
  enemyMoves: EnemyAttackType[],
  currentTurn: "White" | "Black"
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
