/**
 * Checks moves stops the King from being in Check
 * @param pieceMoves All moves of the selected piece
 * @param validCheckMoves All enemy moves that put the King in check
 * @returns Moves that stop the King from being in check
 */
export const filterMovesToAvoidCheck = (
  pieceMoves: number[][],
  validCheckMoves: number[][]
): number[][] => {
  return pieceMoves.filter((move) =>
    validCheckMoves.some(
      (validMove) => validMove[0] === move[0] && validMove[1] === move[1]
    )
  );
};
