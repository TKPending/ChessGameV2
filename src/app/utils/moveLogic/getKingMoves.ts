import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { possiblePieceMoves } from "@/app/utils/possiblePieceMoves";
import { TileType } from "@/app/types/TileType";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";

export const getKingMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  currentRow: number,
  currentCol: number,
  pieceToMoveColor: "White" | "Black",
  enemyMoves?: EnemyAttackType[]
): [number, number][] => {
  let kingMoves: [number, number][] = [
    [currentRow + 1, currentCol],
    [currentRow - 1, currentCol],
    [currentRow, currentCol + 1],
    [currentRow, currentCol - 1],
    [currentRow + 1, currentCol + 1],
    [currentRow + 1, currentCol - 1],
    [currentRow - 1, currentCol + 1],
    [currentRow - 1, currentCol - 1],
  ];

  if (enemyMoves) {
    kingMoves = kingMoves.filter(
      ([row, col]) =>
        !enemyMoves.some((enemy) =>
          enemy.moves.some(([moveRow, moveCol]) => {
            return moveRow === row && moveCol === col;
          })
        )
    );
  }

  const kingPotentialMoves = possiblePieceMoves(
    dispatch,
    chessboard,
    kingMoves,
    pieceToMoveColor
  );

  return kingPotentialMoves;
};
