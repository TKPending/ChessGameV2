import { setPiecesAttackingKing } from "@/app/redux/slices/old/board/boardSlice";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

/**
 * Finds the paths leading to the King under attack.
 * @param enemyMoves List of enemy pieces and their valid moves.
 * @param kingPosition The position of the King under attack [row, col].
 * @returns An array of attack paths, each containing the attacker and tiles leading to the King.
 */
export const pathToKing = (
  dispatch: Dispatch<UnknownAction>,
  enemyMoves: EnemyAttackType[],
  kingPosition: [number, number],
  enemy: boolean
): { attacker: EnemyAttackType; path: [number, number][] }[] => {
  const attackPaths: { attacker: EnemyAttackType; path: [number, number][] }[] =
    [];
  const [kingRow, kingCol] = kingPosition;

  enemyMoves.forEach((enemyMove) => {
    const { piece, moves, piecePosition } = enemyMove;

    const isKingUnderAttack = moves.some(
      ([moveRow, moveCol]) => moveRow === kingRow && moveCol === kingCol
    );

    if (isKingUnderAttack) {
      let path: [number, number][] = [];
      if (["Rook", "Bishop", "Queen"].includes(piece.pieceName)) {
        const [attackerRow, attackerCol] = piecePosition;

        const rowDirection = Math.sign(kingRow - attackerRow);
        const colDirection = Math.sign(kingCol - attackerCol);

        let currentRow = attackerRow + rowDirection;
        let currentCol = attackerCol + colDirection;

        while (currentRow !== kingRow || currentCol !== kingCol) {
          path.push([currentRow, currentCol]);
          currentRow += rowDirection;
          currentCol += colDirection;
        }
      } else {
        path = [[kingRow, kingCol]];
      }

      attackPaths.push({ attacker: enemyMove, path });
      if (enemy) {
        dispatch(setPiecesAttackingKing(enemyMove));
      }
    }
  });

  return attackPaths;
};
