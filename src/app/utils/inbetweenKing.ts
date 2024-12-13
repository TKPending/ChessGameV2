export const inbetweenKing = (
  kingPosition: [number, number],
  attackingMoves: number[][]
): number[][] => {
  const [kingRow, kingCol] = kingPosition;
  const blockableTiles: number[][] = [];

  attackingMoves.forEach(([row, col]) => {
    // Horizontal attack: the piece and the King are on the same row
    if (row === kingRow) {
      const range = col > kingCol ? [kingCol + 1, col] : [col + 1, kingCol];
      if (col > kingCol) {
        // Piece is to the left of the King (moving right)
        for (let c = range[0]; c < range[1]; c++) {
          blockableTiles.push([kingRow, c]);
        }
      } else if (col < kingCol) {
        // Piece is to the right of the King (moving left)
        for (let c = range[1]; c < range[0]; c++) {
          blockableTiles.push([kingRow, c]);
        }
      }
    }
    // Vertical attack: the piece and the King are on the same column
    else if (col === kingCol) {
      const range = row > kingRow ? [kingRow + 1, row] : [row + 1, kingRow];
      if (row > kingRow) {
        // Piece is below the King (moving up)
        for (let r = range[0]; r < range[1]; r++) {
          blockableTiles.push([r, kingCol]);
        }
      } else if (row < kingRow) {
        // Piece is above the King (moving down)
        for (let r = range[1]; r < range[0]; r++) {
          blockableTiles.push([r, kingCol]);
        }
      }
    }
    // Diagonal attack: the piece and the King are on the same diagonal
    else if (Math.abs(row - kingRow) === Math.abs(col - kingCol)) {
      const stepRow = row > kingRow ? 1 : -1;
      const stepCol = col > kingCol ? 1 : -1;
      let r = kingRow + stepRow;
      let c = kingCol + stepCol;

      // Only consider the path in the direction of the King, stop at King
      while (r !== row && c !== col) {
        blockableTiles.push([r, c]);
        r += stepRow;
        c += stepCol;
      }
    }
  });

  return blockableTiles;
};
