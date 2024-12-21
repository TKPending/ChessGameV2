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
