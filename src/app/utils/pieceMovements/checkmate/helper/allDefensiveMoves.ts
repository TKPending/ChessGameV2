import { pathToKing } from "./pathToKing";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";

/**
 * Check all moves that the King can make when in Check
 * @param enemyMoves All enemy moves
 * @param kingRow Row king is on
 * @param kingCol Row king is on
 * @returns All King moves that can get the King out of Check
 */
export const allDefensiveMoves = (
  enemyMoves: EnemyAttackType[],
  kingRow: number,
  kingCol: number
): number[][] => {
  const validDefenseMoves = new Set<string>();
  const attackingPaths = pathToKing(enemyMoves, [kingRow, kingCol]);

  attackingPaths.forEach(({ path }) => {
    path.forEach(([row, col]) => {
      validDefenseMoves.add(JSON.stringify([row, col]));
    });
  });

  return Array.from(validDefenseMoves).map((move) => JSON.parse(move));
};
