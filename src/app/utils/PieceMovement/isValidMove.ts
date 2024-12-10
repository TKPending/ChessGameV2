import { convertTilePosition } from "../convertTilePosition";
import { TileType } from "@/app/types/TileType";
import { PieceType, PieceName } from "@/app/types/PieceType";

export const isValidMove = (
  piece: PieceType,
  currentTile: TileType,
  targetTile: TileType,
  board: TileType[][]
): boolean => {
  const targetPieceTeam: "White" | "Black" | undefined =
    targetTile.pieceOnTile?.pieceColor;
  const { pieceName, pieceColor, hasMoved } = piece;
  const [currentRow, currentCol] = convertTilePosition(
    currentTile.tilePosition
  );
  const [targetRow, targetCol] = convertTilePosition(targetTile.tilePosition);

  console.log({
    current: currentTile.tilePosition,
    target: targetTile.tilePosition,
  });

  const rowDiff = targetRow - currentRow;
  const colDiff = targetCol - currentCol;

  // Can't capture piece of the same team
  if (targetPieceTeam === pieceColor) {
    return false;
  }

  const isPathClear = (
    board: TileType[][],
    rowStep: number,
    colStep: number
  ): boolean => {
    let row = currentRow + rowStep;
    let col = currentCol + colStep;

    while (row !== targetRow || col !== targetCol) {
      if (
        row < 0 ||
        col < 0 ||
        row >= 8 ||
        col >= 8 ||
        board[row]?.[col]?.pieceOnTile
      ) {
        return false;
      }
      row += rowStep;
      col += colStep;
    }
    return true;
  };

  switch (pieceName) {
    case PieceName.pawn:
      const direction = pieceColor === "White" ? -1 : 1;
      const startingRow = pieceColor === "White" ? 6 : 1;
      const isEnemyOnTargetTile =
        targetTile.pieceOnTile &&
        targetTile.pieceOnTile.pieceColor !== pieceColor;

      // Double Move On Start
      if (
        colDiff === 0 &&
        rowDiff === 2 * direction &&
        currentRow === startingRow &&
        !targetTile.pieceOnTile &&
        isPathClear(board, direction, 0)
      ) {
        return true;
      }

      // Normal Forward Move
      if (colDiff === 0 && rowDiff === direction && !targetTile.pieceOnTile) {
        return true;
      }

      // Capturing Diagonally
      if (
        Math.abs(colDiff) === 1 &&
        rowDiff === direction &&
        isEnemyOnTargetTile
      ) {
        return true;
      }

      return false;
    case PieceName.knight:
      return (
        (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) ||
        (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2)
      );
    case PieceName.bishop:
      return (
        Math.abs(rowDiff) === Math.abs(colDiff) &&
        isPathClear(board, rowDiff > 0 ? 1 : -1, colDiff > 0 ? 1 : -1)
      );
    case PieceName.rook:
      return (
        (rowDiff === 0 && isPathClear(board, 0, colDiff > 0 ? 1 : -1)) ||
        (colDiff === 0 && isPathClear(board, rowDiff > 0 ? 1 : -1, 0))
      );
    case PieceName.queen:
      return (
        (Math.abs(rowDiff) === Math.abs(colDiff) &&
          isPathClear(board, rowDiff > 0 ? 1 : -1, colDiff > 0 ? 1 : -1)) ||
        (rowDiff === 0 && isPathClear(board, 0, colDiff > 0 ? 1 : -1)) ||
        (colDiff === 0 && isPathClear(board, rowDiff > 0 ? 1 : -1, 0))
      );

    case PieceName.king:
      return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;

    // Move once in any direction
    // Castling
    // Can't move into a capture position

    //   return true;
    default:
      return false;
  }
};
