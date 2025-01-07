import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { allSelectedPieceLegalMoves } from "@/app/utils/pieceMovements/helpers/allSelectedPieceLegalMoves";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { TileType } from "@/app/types/TileType";

/**
 * Get's all the moves that the King can make
 * @param dispatch Update the Redux State
 * @param chessboard Object that keeps track of the current state
 * @param currentRow The current row that the King is in
 * @param currentCol The current col that the King is in
 * @param pieceToMoveColor The color of the piece that needs to be moved
 * @param enemyMoves All enemy moves to check whether a King move is valid
 * @returns All valid King Moves
 */
export const getKingMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  currentRow: number,
  currentCol: number,
  pieceToMoveColor: "White" | "Black",
  simulation: boolean,
  enemyMoves?: EnemyAttackType[],
  test?: boolean
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

  const kingPotentialMoves = allSelectedPieceLegalMoves(
    dispatch,
    chessboard,
    kingMoves,
    pieceToMoveColor,
    simulation
  );

  return kingPotentialMoves;
};
