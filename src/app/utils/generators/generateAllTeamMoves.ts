import { classifySlidingDirections } from "@/app/utils/pieceMovements/classifySlidingDirections";
import { generateIndividualPieceMoves } from "@/app/utils/generators/generateIndividualPieceMoves";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { TileType, PieceType, ChessColors } from "@/app/types/ChessTypes";

/**
 * Generates all moves for the enemy team
 * @param chessboard Current chessboard state
 * @param teamColor Color of the enemy / Opposite team
 * @param simulation Whether this is a simulation or not
 * @returns All legal enemy moves
 */
export const generateAllTeamMoves = (
  chessboard: TileType[][],
  teamColor: ChessColors.white | ChessColors.black,
  isEnemy: boolean = false
): EnemyAttackType[] => {
  const teamMoves: EnemyAttackType[] = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = chessboard[row][col];
      const piece: PieceType | null = tile.pieceOnTile;

      if (piece && piece.pieceColor === teamColor) {
        const moves: number[][] = generateIndividualPieceMoves(
          chessboard,
          piece,
          tile,
          isEnemy
        );

        if (moves.length > 0) {
          const direction = classifySlidingDirections(piece.pieceName);
          teamMoves.push({
            piecePosition: [row, col],
            piece,
            moves,
            direction,
          });
        }
      }
    }
  }

  return teamMoves;
};
