import { EnemyAttackType } from "@/app/types/MoveTypes";

export const areTilesBetweenUnderAttack = (
  enemyMoves: EnemyAttackType[],
  kingPosition: [number, number],
  rookCol: number
): boolean => {
  const [kingRow, kingCol] = kingPosition;

  const startCol = Math.min(kingCol, rookCol) + 1;
  const endCol = Math.max(kingCol, rookCol);

  for (let col = startCol; col < endCol; col++) {
    const squareUnderAttack = enemyMoves.some((enemyMove: EnemyAttackType) =>
      enemyMove.moves.some(([enemyRow, enemyCol]: number[]) => {
        enemyRow === kingRow && enemyCol === col;
      })
    );

    if (squareUnderAttack) return true;
  }

  return false;
};
