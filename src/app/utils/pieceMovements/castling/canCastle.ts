import { areTilesBetweenUnderAttack } from "./helpers/areTilesBetweenUnderAttack";
import { arePiecesInStartingPositions } from "./helpers/arePiecesInStartingPositions";
import { ChessColors, TileType } from "@/app/types/ChessTypes";
import { areTilesBetweenOccupiedByFriendlyPieces } from "./helpers/areTilesBetweenOccupiedByFriendlyPieces.ts";

export const canCastle = (
  chessboard: TileType[][],
  enemyMoves: any,
  currentTurn: ChessColors.white | ChessColors.black
): { canCastleLeft: boolean; canCastleRight: boolean } => {
  if (!arePiecesInStartingPositions(chessboard, currentTurn)) {
    return { canCastleLeft: false, canCastleRight: false };
  }

  const row = currentTurn === ChessColors.white ? 7 : 0;
  const kingPosition: [number, number] = [row, 4];
  const leftRookPosition: [number, number] = [row, 0];
  const rightRookPosition: [number, number] = [row, 7];

  const king = chessboard[row][4];

  if (!king) {
    return { canCastleLeft: false, canCastleRight: false };
  }

  // Check if castling left is possible
  const canCastleLeft =
    !areTilesBetweenUnderAttack(enemyMoves, kingPosition, leftRookPosition) &&
    !areTilesBetweenOccupiedByFriendlyPieces(
      chessboard,
      kingPosition,
      leftRookPosition,
      currentTurn
    );

  // Check if castling right is possible
  const canCastleRight =
    !areTilesBetweenUnderAttack(enemyMoves, kingPosition, rightRookPosition) &&
    !areTilesBetweenOccupiedByFriendlyPieces(
      chessboard,
      kingPosition,
      rightRookPosition,
      currentTurn
    );

  return { canCastleLeft, canCastleRight };
};
