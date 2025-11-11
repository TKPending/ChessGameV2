import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { getPawnMoves } from "@/app/containers/chessboard/utils/pieceMovements/getPawnMoves";
import { getKnightMoves } from "@/app/containers/chessboard/utils/pieceMovements/getKnightMoves";
import { getSlidingPieceMoves } from "@/app/containers/chessboard/utils/pieceMovements/getSlidingPieceMoves";
import { getKingMoves } from "@/app/containers/chessboard/utils/pieceMovements/getKingMoves";
import { convertTilePosition } from "@/app/utils/convertTilePosition";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { TileType, PieceType, PieceName } from "@/app/types/ChessTypes";

/**
 * Generates the moves for specific pieces
 * @param dispatch Update redux state
 * @param chessboard Current chessboard state
 * @param piece Piece that the moves are being generate for
 * @param tile Current tile the piece is on
 * @param isEnemy Whether we're generating moves for friendly or enemy
 * @param enemyMoves All enemy moves
 * @returns Legal moves for a piece
 */
export const generatePieceLegalMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  piece: PieceType,
  tile: TileType,
  isEnemy: boolean = false,
  simulation: boolean,
  enemyMoves?: EnemyAttackType[]
): number[][] => {
  const [currentRow, currentCol] = convertTilePosition(tile.tilePosition);

  switch (piece.pieceName) {
    case PieceName.pawn: {
      const moves = getPawnMoves(
        dispatch,
        chessboard,
        piece.pieceColor,
        currentRow,
        currentCol,
        simulation
      );
      return isEnemy
        ? moves.filter(
            ([moveRow, moveCol]) =>
              Math.abs(moveRow - currentRow) === 1 &&
              Math.abs(moveCol - currentCol) === 1 // Only diagonal captures for enemies
          )
        : moves;
    }
    case PieceName.knight: {
      return getKnightMoves(
        dispatch,
        chessboard,
        currentRow,
        currentCol,
        piece.pieceColor,
        simulation
      );
    }
    case PieceName.rook: {
      return getSlidingPieceMoves(
        dispatch,
        chessboard,
        currentRow,
        currentCol,
        [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1], // Horizontal and vertical
        ],
        piece.pieceColor,
        simulation
      );
    }
    case PieceName.bishop: {
      return getSlidingPieceMoves(
        dispatch,
        chessboard,
        currentRow,
        currentCol,
        [
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1], // Diagonal
        ],
        piece.pieceColor,
        simulation
      );
    }
    case PieceName.queen: {
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
          [-1, -1], // All directions
        ],
        piece.pieceColor,
        simulation
      );
    }
    case PieceName.king: {
      return getKingMoves(
        dispatch,
        chessboard,
        currentRow,
        currentCol,
        piece.pieceColor,
        simulation,
        enemyMoves || []
      );
    }
    default: {
      return [];
    }
  }
};
