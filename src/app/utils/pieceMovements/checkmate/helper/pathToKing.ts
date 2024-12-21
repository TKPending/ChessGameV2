import { EnemyAttackType } from "@/app/types/EnemyAttackType";

/**
 * Finds the paths leading to the King under attack.
 * @param enemyMoves List of enemy pieces and their valid moves.
 * @param kingPosition The position of the King under attack [row, col].
 * @returns An array of attack paths, each containing the attacker and tiles leading to the King.
 */
export const pathToKing = (
  enemyMoves: EnemyAttackType[],
  kingPosition: [number, number]
): { attacker: EnemyAttackType; path: [number, number][] }[] => {
  const attackPaths: { attacker: EnemyAttackType; path: [number, number][] }[] =
    [];

  // Loop through each enemy move set
  enemyMoves.forEach((enemyMove) => {
    const { piece, moves, piecePosition } = enemyMove;

    // Check if the King is in the moves of the attacker
    const [kingRow, kingCol] = kingPosition;
    const isKingUnderAttack = moves.some(
      ([moveRow, moveCol]) => moveRow === kingRow && moveCol === kingCol
    );

    if (isKingUnderAttack) {
      let path: [number, number][] = [];

      // Handle sliding pieces (Rook, Bishop, Queen)
      if (["Rook", "Bishop", "Queen"].includes(piece.pieceName)) {
        const [attackerRow, attackerCol] = piecePosition;

        // Determine direction vector towards the King
        const rowDirection = Math.sign(kingRow - attackerRow);
        const colDirection = Math.sign(kingCol - attackerCol);

        let currentRow = attackerRow + rowDirection;
        let currentCol = attackerCol + colDirection;

        // Collect all tiles along the path to the King
        while (currentRow !== kingRow || currentCol !== kingCol) {
          path.push([currentRow, currentCol]);
          currentRow += rowDirection;
          currentCol += colDirection;
        }
      }

      // Non-sliding pieces (Pawn, Knight, King) directly attack the King
      else {
        path = [[kingRow, kingCol]];
      }

      // Add the attack information to the result
      attackPaths.push({ attacker: enemyMove, path });
    }
  });

  return attackPaths;
};
