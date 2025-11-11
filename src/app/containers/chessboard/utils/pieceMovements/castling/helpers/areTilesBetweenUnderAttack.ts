import { EnemyAttackType } from "@/app/types/MoveTypes";

export const areTilesBetweenUnderAttack = (
  enemyMoves: EnemyAttackType[],
  kingPosition: [number, number],
  rookPosition: [number, number]
): boolean => {
  const [kingRow, kingCol] = kingPosition;
  const [rookRow, rookCol] = rookPosition;

  const startCol = Math.min(kingCol, rookCol) + 1;
  const endCol = Math.max(kingCol, rookCol);

  for (let col = startCol; col < endCol; col++) {
    if (
      enemyMoves.some((enemyMove) =>
        enemyMove.moves.some(
          ([enemyRow, enemyCol]) => enemyRow === kingRow && enemyCol === col
        )
      )
    ) {
      return true;
    }
  }

  return false;
};
