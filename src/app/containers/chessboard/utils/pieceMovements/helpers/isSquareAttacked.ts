import { EnemyAttackType } from "@/app/types/MoveTypes";

/**
 * Checks if a specific square (the King's position) is included in any enemy move list
 */
export const isSquareAttacked = (
  enemyMoves: EnemyAttackType[],
  targetPos: [number, number]
): boolean => {
  const [targetRow, targetCol] = targetPos;

  // Check every enemy piece
  return enemyMoves.some((enemy) =>
    enemy.moves.some(([r, c]) => r === targetRow && c === targetCol)
  );
};
