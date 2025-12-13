import { arePiecesInStartingPositions } from "@/app/utils/moveChecks/arePiecesInStartingPositions";
import { areTilesBetweenUnderAttack } from "@/app/utils/moveChecks/areTilesBetweenUnderAttack";
import { areTilesBetweenOccupiedByFriendlyPieces } from "@/app/utils/moveChecks/areTilesBetweenOccupiedByFriendlyPieces.ts";
import { ChessColors, TileType } from "@/app/types/ChessTypes";
import { CastleType, EnemyAttackType } from "@/app/types/MoveTypes";

/**
 * Generate moves for castling
 * @param chessboard Current chessboard state
 * @param clickedTile Tile the King would be moving to
 * @param enemyMoves All enemy potential moves
 * @param currentTurn Current turn in the game
 * @returns Moves if the king can castle
 */
export const generateCastlingMoves = (
  chessboard: TileType[][],
  enemyMoves: EnemyAttackType[],
  currentTurn: ChessColors.white | ChessColors.black,
  castleState: CastleType
): number[][] => {
  // Check if King and Rook are are in starting positions
  if (!arePiecesInStartingPositions(chessboard, currentTurn)) {
    return [];
  }

  // Get the King and Rook Positions
  const kingRow = currentTurn === ChessColors.white ? 7 : 0;
  const kingPosition: [number, number] = [kingRow, 4];
  const kingCastleMoves: number[][] = [];

  const queenSideRook: [number, number] = [kingRow, 0];
  const castleQueenSide: [number, number] = [kingRow, 1];
  if (
    !areTilesBetweenUnderAttack(enemyMoves, kingPosition, queenSideRook[1]) &&
    !areTilesBetweenOccupiedByFriendlyPieces(
      chessboard,
      kingPosition,
      queenSideRook[1],
      currentTurn
    ) &&
    castleState.queenSideCastling
  ) {
    kingCastleMoves.push(castleQueenSide);
  }
  const kingSideRook: [number, number] = [kingRow, 7];
  const castleKingSide: [number, number] = [kingRow, 6];
  if (
    !areTilesBetweenUnderAttack(enemyMoves, kingPosition, kingSideRook[1]) &&
    !areTilesBetweenOccupiedByFriendlyPieces(
      chessboard,
      kingPosition,
      kingSideRook[1],
      currentTurn
    ) &&
    castleState.kingSideCastling
  ) {
    kingCastleMoves.push(castleKingSide);
  }

  return kingCastleMoves;
};
