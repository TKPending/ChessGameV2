import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { generatePieceLegalMoves } from "./helper/generatePieceLegalMoves";
import { classifySlidingDirections } from "@/app/utils/pieceMovements/helpers/classifySlidingDirections";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";

/**
 * Generates all moves for the enemy team
 * @param dispatch Update redux state
 * @param chessboard Current chessboard state
 * @param enemyColor Color of the enemy / Opposite team
 * @returns All legal enemy moves
 */
export const generateAllEnemyMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  enemyColor: "White" | "Black",
  simulation: boolean
): EnemyAttackType[] => {
  const enemyMoves: EnemyAttackType[] = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = chessboard[row][col];
      const piece: PieceType | null = tile.pieceOnTile;

      if (piece && piece.pieceColor === enemyColor) {
        const moves = generatePieceLegalMoves(
          dispatch,
          chessboard,
          piece,
          tile,
          simulation,
          true
        );

        if (moves.length > 0) {
          const direction = classifySlidingDirections(piece.pieceName);
          enemyMoves.push({
            piecePosition: [row, col],
            piece,
            moves,
            direction,
          });
        }
      }
    }
  }

  return enemyMoves;
};
