import { EnemyAttackType } from "@/app/types/EnemyAttackType";

/**
 * Checks if there are any king moves that are not under threat from enemy moves.
 * @param kingMoves List of possible king moves [row, col].
 * @param enemyMoves List of enemy attack moves with their details.
 * @returns {boolean} True if at least one king move is safe, false otherwise.
 */
export const kingMovesOutOfCheck = (
  kingMoves: number[][],
  enemyMoves: EnemyAttackType[]
): boolean => {
  for (const [kingRow, kingCol] of kingMoves) {
    const isSafe = enemyMoves.every(({ moves }) =>
      moves.every(
        ([enemyRow, enemyCol]) => enemyRow !== kingRow || enemyCol !== kingCol
      )
    );

    if (isSafe) {
      return true;
    }
  }

  return false;
};
