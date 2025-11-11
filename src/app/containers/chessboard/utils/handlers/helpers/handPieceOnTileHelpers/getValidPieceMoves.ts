import { filterMovesToAvoidCheck } from "./filterMovesToAvoidCheck";

/**
 * Gets the valid move for a specific piece
 * @param isInCheck Whether the King is in check or not
 * @param attackingPositions All positions of pieces attacking the King
 * @param validCheckMoves All valid moves against Check
 * @param selectedPieceValidMoves All selected piece legal moves
 * @returns Valid moves for the piece
 */
export const getValidPieceMoves = (
  isInCheck: boolean,
  attackingPositions: number[][],
  validCheckMoves: number[][],
  selectedPieceValidMoves: number[][]
) => {
  if (isInCheck) {
    const preventCheckMoves = [...attackingPositions, ...validCheckMoves];
    return filterMovesToAvoidCheck(selectedPieceValidMoves, preventCheckMoves);
  } else {
    return selectedPieceValidMoves;
  }
};
