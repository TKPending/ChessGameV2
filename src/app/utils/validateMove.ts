import { TileType } from "@/app/types/TileType"
import { PieceName, PieceType } from "@/app/types/PieceType";

/**
 * Converts chess tile notation (e.g., "a1") to numerical indices.
 */
const convertTilePosition = (tilePosition: string): [number, number] => {
  const col = tilePosition.charCodeAt(0) - "a".charCodeAt(0);
  const row = 8 - parseInt(tilePosition[1], 10);
  return [row, col];
};

/**
 * Validates if a piece move is legal according to chess rules.
 */
export const isValidMove = (
  piece: PieceType,
  currentTile: TileType,
  targetTile: TileType,
  board: TileType[][]
): boolean => {
  if (!piece) return false;

  const { pieceName, pieceColor, hasMoved } = piece;
  const [currentRow, currentCol] = convertTilePosition(currentTile.tilePosition);
  const [targetRow, targetCol] = convertTilePosition(targetTile.tilePosition);

  const rowDiff = targetRow - currentRow;
  const colDiff = targetCol - currentCol;

  // Reject moves targeting a tile occupied by a friendly piece
  if (targetTile.pieceOnTile?.pieceColor === pieceColor) {
    return false;
  }

  // Helper: Check if a sliding piece's path is clear
  const isPathClear = (rowStep: number, colStep: number): boolean => {
    let row = currentRow + rowStep;
    let col = currentCol + colStep;
    while (row !== targetRow || col !== targetCol) {
      if (board[row]?.[col]?.pieceOnTile) return false;
      row += rowStep;
      col += colStep;
    }
    return true;
  };

  switch (pieceName) {
    case PieceName.pawn: {
      const direction = pieceColor === "White" ? -1 : 1;
      const startingRow = pieceColor === "White" ? 6 : 1;

      // Normal move
      if (colDiff === 0 && rowDiff === direction && !targetTile.pieceOnTile) {
        return true;
      }

      // Double move from starting position
      if (
        colDiff === 0 &&
        rowDiff === 2 * direction &&
        currentRow === startingRow &&
        !targetTile.pieceOnTile &&
        isPathClear(direction, 0)
      ) {
        return true;
      }

      // Capturing diagonally
      if (
        Math.abs(colDiff) === 1 &&
        rowDiff === direction &&
        targetTile.pieceOnTile?.pieceColor !== pieceColor
      ) {
        return true;
      }

      return false;
    }

    case PieceName.knight:
      return (
        (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) ||
        (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2)
      );

    case PieceName.bishop:
      return (
        Math.abs(rowDiff) === Math.abs(colDiff) &&
        isPathClear(rowDiff > 0 ? 1 : -1, colDiff > 0 ? 1 : -1)
      );

    case PieceName.rook:
      return (
        (rowDiff === 0 && isPathClear(0, colDiff > 0 ? 1 : -1)) || // Horizontal move
        (colDiff === 0 && isPathClear(rowDiff > 0 ? 1 : -1, 0)) // Vertical move
      );

    case PieceName.queen:
      return (
        (Math.abs(rowDiff) === Math.abs(colDiff) && isPathClear(rowDiff > 0 ? 1 : -1, colDiff > 0 ? 1 : -1)) || // Diagonal
        (rowDiff === 0 && isPathClear(0, colDiff > 0 ? 1 : -1)) || // Horizontal
        (colDiff === 0 && isPathClear(rowDiff > 0 ? 1 : -1, 0)) // Vertical
      );

    case PieceName.king: {
      // Normal King movement
      if (Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1) {
        return true;
      }

      // Castling logic
      if (!hasMoved && Math.abs(colDiff) === 2 && rowDiff === 0) {
        const rookCol = colDiff > 0 ? 7 : 0; // Rook's position on the same row
        const rookTile = board[currentRow][rookCol];

        // Check rook's conditions for castling
        if (
          rookTile.pieceOnTile?.pieceName === PieceName.rook &&
          !rookTile.pieceOnTile.hasMoved
        ) {
          // Ensure path is clear between King and Rook
          const colStep = colDiff > 0 ? 1 : -1;
          if (isPathClear(0, colStep)) {
            return true;
          }
        }
      }

      return false;
    }

    default:
      return false;
  }
};
