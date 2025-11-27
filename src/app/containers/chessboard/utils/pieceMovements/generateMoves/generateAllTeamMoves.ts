import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { generatePieceLegalMoves } from "./helper/generatePieceLegalMoves";
import { classifySlidingDirections } from "@/app/containers/chessboard/utils/pieceMovements/helpers/classifySlidingDirections";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { TileType, PieceType, ChessColors } from "@/app/types/ChessTypes";
import { convertTilePosition } from "@/app/utils/convertTilePosition";

/**
 * Generates all moves for the enemy team
 * @param dispatch Update redux state
 * @param chessboard Current chessboard state
 * @param teamColor Color of the enemy / Opposite team
 * @param simulation Whether this is a simulation or not
 * @returns All legal enemy moves
 */
export const generateAllTeamMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  teamColor: ChessColors.white | ChessColors.black,
  simulation: boolean
): EnemyAttackType[] => {
  const enemyMoves: EnemyAttackType[] = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = chessboard[row][col];
      const piece: PieceType | null = tile.pieceOnTile;

      if (piece && piece.pieceColor === teamColor) {
        const moves = generatePieceLegalMoves(
          dispatch,
          chessboard,
          piece,
          tile,
          simulation,
          true
        );

        if (moves.length > 0) {
          moves.push(convertTilePosition(tile.tilePosition));
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
