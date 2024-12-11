// export const generatePieceMovements = (
//   chessboard: TileType[][],
//   pieceName: PieceName,
//   currentTile: TileType
// ): [number, number][] => {
//   const [currentRow, currentCol] = convertTilePosition(currentTile.tilePosition);
//   const validMoves: [number, number][] = [];

//   switch (pieceName) {
//     case PieceName.pawn: {
//       // Pawns can move one square forward (two squares from the starting position)
//       const direction = currentTile.pieceOnTile?.pieceColor === "White" ? -1 : 1;
//       const forward = [currentRow + direction, currentCol]; // 1 square forward
//       const doubleForward = [currentRow + 2 * direction, currentCol]; // 2 squares forward

//       // Check for forward movement (empty space or enemy piece)
//       if (isValidMove(chessboard, forward)) validMoves.push(forward);
//       // Check for double forward movement (only from starting position)
//       if (
//         currentRow === (currentTile.pieceOnTile?.pieceColor === "White" ? 6 : 1) &&
//         isValidMove(chessboard, doubleForward)
//       )
//         validMoves.push(doubleForward);
//       return validMoves;
//     }

//     case PieceName.knight: {
//       // Knight moves in an "L" shape
//       const knightMoves = [
//         [currentRow + 2, currentCol + 1],
//         [currentRow + 2, currentCol - 1],
//         [currentRow - 2, currentCol + 1],
//         [currentRow - 2, currentCol - 1],
//         [currentRow + 1, currentCol + 2],
//         [currentRow + 1, currentCol - 2],
//         [currentRow - 1, currentCol + 2],
//         [currentRow - 1, currentCol - 2],
//       ];

//       knightMoves.forEach((move) => {
//         if (isValidMove(chessboard, move)) validMoves.push(move);
//       });
//       return validMoves;
//     }

//     case PieceName.bishop: {
//       // Bishop moves diagonally in all four directions
//       const directions = [
//         [1, 1],
//         [1, -1],
//         [-1, 1],
//         [-1, -1],
//       ];
//       directions.forEach(([dirRow, dirCol]) => {
//         let r = currentRow + dirRow;
//         let c = currentCol + dirCol;
//         while (isValidMove(chessboard, [r, c])) {
//           validMoves.push([r, c]);
//           if (chessboard[r][c].pieceOnTile) break; // Stop at first piece
//           r += dirRow;
//           c += dirCol;
//         }
//       });
//       return validMoves;
//     }

//     case PieceName.rook: {
//       // Rook moves vertically and horizontally
//       const directions = [
//         [1, 0], // down
//         [-1, 0], // up
//         [0, 1], // right
//         [0, -1], // left
//       ];
//       directions.forEach(([dirRow, dirCol]) => {
//         let r = currentRow + dirRow;
//         let c = currentCol + dirCol;
//         while (isValidMove(chessboard, [r, c])) {
//           validMoves.push([r, c]);
//           if (chessboard[r][c].pieceOnTile) break; // Stop at first piece
//           r += dirRow;
//           c += dirCol;
//         }
//       });
//       return validMoves;
//     }

//     case PieceName.queen: {
//       // Queen is a combination of rook and bishop
//       const rookMoves = generatePieceMovements(chessboard, PieceName.rook, currentTile);
//       const bishopMoves = generatePieceMovements(chessboard, PieceName.bishop, currentTile);
//       return [...rookMoves, ...bishopMoves];
//     }

//     default:
//       return [];
//   }
// };

// // Helper to check if a move is valid (i.e., within bounds)
// const isValidMove = (chessboard: TileType[][], [row, col]: [number, number]): boolean => {
//   return row >= 0 && col >= 0 && row < 8 && col < 8 && !chessboard[row][col].isHighlighted;
// };
