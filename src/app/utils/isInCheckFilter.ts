export const isInCheckFilter = (
  pieceMoves: number[][],
  validCheckMoves: number[][]
): number[][] => {
  // Only keep moves that are part of validCheckMoves
  return pieceMoves.filter((move) =>
    validCheckMoves.some(
      (validMove) => validMove[0] === move[0] && validMove[1] === move[1]
    )
  );
};
