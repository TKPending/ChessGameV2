import { TileType, ChessColors, PieceName } from "@/app/types/ChessTypes";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { generateAllTeamMoves } from "@/app/containers/chessboard/utils/pieceMovements/generateMoves/generateAllTeamMoves";
import { getPlayerColor } from "@/app/utils/getPlayerColor";
import { findKingPosition } from "../../helpers/findKingPosition";
import { isSquareAttacked } from "../../helpers/isSquareAttacked";
import { setIsKingInCheck } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";

/**
 * Simulates moves to filter out those that leave the King in check.
 * * @param chessboard The current actual state of the board
 * @param currentTeamMoves The pseudo-legal moves generated for the current turn
 * @param currentTurn The color of the player currently moving
 * @returns A filtered list of EnemyAttackType containing only legal moves
 */
export const simulateTeamMoves = (
  dispatch: any,
  chessboard: TileType[][],
  currentTeamMoves: EnemyAttackType[],
  currentTurn: ChessColors.white | ChessColors.black
): EnemyAttackType[] => {
  const legalMoves: EnemyAttackType[] = [];

  // Iterate through every piece that attempts to move
  currentTeamMoves.forEach((pieceEntry) => {
    const validMovesForPiece: number[][] = [];
    const [startRow, startCol] = pieceEntry.piecePosition;

    // Iterate through every target square that piece tries to go to
    pieceEntry.moves.forEach(([targetRow, targetCol]) => {
      // Create a Deep Copy of the board to simulate on.
      const simulatedBoard = chessboard.map((row) =>
        row.map((tile) => ({
          ...tile,
          pieceOnTile: tile.pieceOnTile ? { ...tile.pieceOnTile } : null,
        }))
      );

      // Execute the move on the simulated board
      simulatedBoard[startRow][startCol].pieceOnTile = null;
      simulatedBoard[targetRow][targetCol].pieceOnTile = {
        ...pieceEntry.piece,
        hasMoved: true,
      };

      // Find where our King is on this new board state
      const kingPosition = findKingPosition(simulatedBoard, currentTurn);
      if (!kingPosition) return;

      // Generate ALL enemy responses on this new board
      const enemyColor = getPlayerColor(currentTurn, true);

      // Regenerate enemy moves because the board state changed!
      const enemyResponses = generateAllTeamMoves(simulatedBoard, enemyColor);

      // Check if the King is attacked by any of those responses
      const kingIsSafe = !isSquareAttacked(enemyResponses, kingPosition);

      // If King is safe, this is a valid move
      if (kingIsSafe) {
        validMovesForPiece.push([targetRow, targetCol]);
      }
    });

    // Only add this piece to the final list if it actually has valid moves
    if (validMovesForPiece.length > 0) {
      legalMoves.push({
        ...pieceEntry,
        moves: validMovesForPiece,
      });
    }
  });

  return legalMoves;
};
