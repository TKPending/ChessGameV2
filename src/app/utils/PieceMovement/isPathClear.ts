// import { TileType } from "@/app/types/TileType";

// export const isPathClear = (
//   board: TileType[][],
//   rowStep: number,
//   colStep: number,
// ): boolean => {
//   let row = currentRow + rowStep;
//   let col = currentCol + colStep;

//   while (row !== targetRow || col !== targetCol) {
//     // Ensure row and col don't go out of bounds
//     if (
//       row < 0 ||
//       col < 0 ||
//       row >= 8 ||
//       col >= 8 ||
//       board[row]?.[col]?.pieceOnTile
//     ) {
//       return false;
//     }
//     row += rowStep;
//     col += colStep;
//   }
//   return true;
// };
