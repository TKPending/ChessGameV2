import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setSpecificTile } from "@/app/redux/slices/board/boardSlice";
import { convertTilePosition } from "@/app/utils/convertTilePosition";
import { PieceType, PieceName } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";
import {
  setChessboard,
  setCurrentTurn,
  setPlayerCapturedPiece,
} from "@/app/redux/slices/board/boardSlice";
import {
  setChessboardHistory,
  setMoveHistory,
  setMoveCounter,
} from "@/app/redux/slices/gameHistory/gameHistorySlice";

// Function to check if a move is valid based on the piece's color
const chessboardSearch = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  defaultMoves: [number, number][],
  pieceToMoveColor: "White" | "Black"
): [number, number][] => {
  const pieceValidMoves: [number, number][] = [];

  defaultMoves.forEach(([targetRow, targetCol]) => {
    if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
      const targetTile: TileType = chessboard[targetRow][targetCol];
      const enemyPiece: PieceType | null = targetTile.pieceOnTile;

      // Check if the target tile is occupied by a friendly piece
      if (!enemyPiece || enemyPiece.pieceColor !== pieceToMoveColor) {
        pieceValidMoves.push([targetRow, targetCol]);

        // Highlight valid move
        const enemyOrEmpty: "friendly" | "enemy" = enemyPiece
          ? "enemy"
          : "friendly";
        dispatch(
          setSpecificTile({
            ...targetTile,
            isHighlighted: true,
            highlightReason: enemyOrEmpty,
          })
        );
      } else {
        // If occupied by friendly piece, don't allow the move
        dispatch(setSpecificTile({ ...targetTile, isHighlighted: false }));
      }
    }
  });

  return pieceValidMoves;
};

// Helper function to calculate sliding piece moves (rooks, bishops, queens)
const getSlidingPieceMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  currentRow: number,
  currentCol: number,
  directions: [number, number][],
  pieceToMoveColor: "White" | "Black"
): [number, number][] => {
  const validMoves: [number, number][] = [];

  // Loop over all directions (e.g., up, down, left, right for rooks)
  directions.forEach(([rowChange, colChange]) => {
    let row = currentRow;
    let col = currentCol;

    // Keep moving in this direction until we hit an edge or obstruction
    while (true) {
      row += rowChange;
      col += colChange;

      // Check bounds
      if (row < 0 || row >= 8 || col < 0 || col >= 8) break;

      const targetTile = chessboard[row][col];
      const enemyPiece = targetTile.pieceOnTile;

      // If the tile is empty or occupied by an enemy piece, it is a valid move
      if (!enemyPiece || enemyPiece.pieceColor !== pieceToMoveColor) {
        validMoves.push([row, col]);

        // If the tile has an enemy piece, stop (capture)
        if (enemyPiece) break;
      } else {
        // Stop if it's a friendly piece
        break;
      }
    }
  });

  return chessboardSearch(dispatch, chessboard, validMoves, pieceToMoveColor);
};

// Helper function for knight's "jumping" moves
const getKnightMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  currentRow: number,
  currentCol: number,
  pieceToMoveColor: "White" | "Black"
): [number, number][] => {
  const knightMoves: [number, number][] = [
    [currentRow + 2, currentCol + 1],
    [currentRow + 2, currentCol - 1],
    [currentRow - 2, currentCol + 1],
    [currentRow - 2, currentCol - 1],
    [currentRow + 1, currentCol + 2],
    [currentRow + 1, currentCol - 2],
    [currentRow - 1, currentCol + 2],
    [currentRow - 1, currentCol - 2],
  ];

  // Now filter those moves using chessboardSearch
  return chessboardSearch(dispatch, chessboard, knightMoves, pieceToMoveColor);
};

// Helper function to calculate king's moves (1 square in any direction)
const getKingMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  currentRow: number,
  currentCol: number,
  pieceToMoveColor: "White" | "Black"
): [number, number][] => {
  const kingMoves: [number, number][] = [
    [currentRow + 1, currentCol],
    [currentRow - 1, currentCol],
    [currentRow, currentCol + 1],
    [currentRow, currentCol - 1],
    [currentRow + 1, currentCol + 1],
    [currentRow + 1, currentCol - 1],
    [currentRow - 1, currentCol + 1],
    [currentRow - 1, currentCol - 1],
  ];

  return chessboardSearch(dispatch, chessboard, kingMoves, pieceToMoveColor);
};

// Function to check if the King is in Checkmate
const isKingInCheckmate = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  kingPosition: [number, number],
  pieceToMoveColor: "White" | "Black"
): boolean => {
  // Generate all enemy moves
  const enemyMoves = generateEnemyMoves(
    dispatch,
    chessboard,
    pieceToMoveColor === "White" ? "Black" : "White"
  );

  // If the king's position is being attacked and there are no valid moves to escape check, it's checkmate
  return enemyMoves.some(([row, col]) => {
    // If any valid move puts the king in check, it's checkmate
    return row === kingPosition[0] && col === kingPosition[1];
  });
};

// Function to generate all enemy moves
const generateEnemyMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  enemyColor: "White" | "Black"
): [number, number][] => {
  const enemyMoves: [number, number][] = [];

  // Loop through all the pieces of the enemy and generate their valid moves
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = chessboard[row][col];
      const piece = tile.pieceOnTile;

      if (piece && piece.pieceColor === enemyColor) {
        // Depending on the piece type, generate moves (e.g., king, queen, rook, etc.)
        switch (piece.pieceName) {
          case PieceName.pawn:
            // Implement pawn movement logic for the enemy
            break;
          case PieceName.knight:
            // Implement knight movement logic for the enemy
            break;
          case PieceName.rook:
            // Implement rook movement logic for the enemy
            break;
          case PieceName.bishop:
            // Implement bishop movement logic for the enemy
            break;
          case PieceName.queen:
            // Implement queen movement logic for the enemy
            break;
          case PieceName.king:
            // Implement king movement logic for the enemy
            break;
        }
      }
    }
  }

  return enemyMoves;
};

// Main function to generate piece movements
export const generatePieceMovements = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  previousClickedTile: TileType | null
): [number, number][] => {
  const pieceToMoveColor: "White" | "Black" | undefined =
    previousClickedTile?.pieceOnTile?.pieceColor;
  if (!pieceToMoveColor || !previousClickedTile?.pieceOnTile) return [];

  const pieceName: PieceName = previousClickedTile.pieceOnTile.pieceName;
  const [currentRow, currentCol] = convertTilePosition(
    previousClickedTile.tilePosition
  );

  // Pawn logic
  if (pieceName === PieceName.pawn) {
    const direction: number = pieceToMoveColor === "White" ? -1 : 1;
    const initialRow: number = pieceToMoveColor === "White" ? 6 : 1; // Starting row for White and Black pawns
    const isFirstMove =
      (pieceToMoveColor === "White" && currentRow === 6) ||
      (pieceToMoveColor === "Black" && currentRow === 1);

    const isPromotion =
      (pieceToMoveColor === "White" && currentRow === 0) ||
      (pieceToMoveColor === "Black" && currentRow === 7);

    // Forward move (1 square ahead)
    const forward: [number, number] = [currentRow + direction, currentCol];
    // Double forward move (2 squares ahead on first move)
    const doubleForward: [number, number] = [
      currentRow + 2 * direction,
      currentCol,
    ];
    const pawnMoves: [number, number][] = [];

    if (!chessboard[forward[0]][forward[1]].pieceOnTile) {
      pawnMoves.push(forward);
    }

    if (isFirstMove) {
      const tileAhead: TileType = chessboard[forward[0]][forward[1]];
      const tileTwoAhead: TileType =
        chessboard[doubleForward[0]][doubleForward[1]];

      if (!tileAhead.pieceOnTile && !tileTwoAhead.pieceOnTile) {
        pawnMoves.push(doubleForward);
      }
    }

    // Diagonal capture moves
    const diagonalLeft: [number, number] = [
      currentRow + direction,
      currentCol - 1,
    ];
    const diagonalRight: [number, number] = [
      currentRow + direction,
      currentCol + 1,
    ];

    const diagonalMoves: [number, number][] = [];

    const leftTile: TileType = chessboard[diagonalLeft[0]][diagonalLeft[1]];
    if (
      leftTile.pieceOnTile &&
      leftTile.pieceOnTile.pieceColor !== pieceToMoveColor
    ) {
      diagonalMoves.push(diagonalLeft);
    }

    const rightTile: TileType = chessboard[diagonalRight[0]][diagonalRight[1]];
    if (
      rightTile.pieceOnTile &&
      rightTile.pieceOnTile.pieceColor !== pieceToMoveColor
    ) {
      diagonalMoves.push(diagonalRight);
    }

    // Combine all possible moves (forward and diagonal captures)
    const allPawnMoves = [...pawnMoves, ...diagonalMoves];

    return chessboardSearch(
      dispatch,
      chessboard,
      allPawnMoves,
      pieceToMoveColor
    );
  }

  // Handle other pieces (knight, rook, bishop, queen, king)
  switch (pieceName) {
    case PieceName.knight:
      return getKnightMoves(
        dispatch,
        chessboard,
        currentRow,
        currentCol,
        pieceToMoveColor
      );

    case PieceName.rook:
      return getSlidingPieceMoves(
        dispatch,
        chessboard,
        currentRow,
        currentCol,
        [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ],
        pieceToMoveColor
      );

    case PieceName.bishop:
      return getSlidingPieceMoves(
        dispatch,
        chessboard,
        currentRow,
        currentCol,
        [
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1],
        ],
        pieceToMoveColor
      );

    case PieceName.queen:
      return getSlidingPieceMoves(
        dispatch,
        chessboard,
        currentRow,
        currentCol,
        [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1],
        ],
        pieceToMoveColor
      );

    case PieceName.king:
      return getKingMoves(
        dispatch,
        chessboard,
        currentRow,
        currentCol,
        pieceToMoveColor
      );

    default:
      return [];
  }
};
