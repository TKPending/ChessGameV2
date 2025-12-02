import { getPawnMoves } from "@/app/containers/chessboard/utils/pieceMovements/getPawnMoves";
import { getKnightMoves } from "@/app/containers/chessboard/utils/pieceMovements/getKnightMoves";
import { getSlidingPieceMoves } from "@/app/containers/chessboard/utils/pieceMovements/getSlidingPieceMoves";
import { getKingMoves } from "@/app/containers/chessboard/utils/pieceMovements/getKingMoves";
import { convertTilePosition } from "@/app/utils/convertTilePosition";
import { TileType, PieceType, PieceName } from "@/app/types/ChessTypes";

/**
 * Generates the moves for specific pieces
 * @param chessboard Current chessboard state
 * @param piece Piece that the moves are being generate for
 * @param tile Current tile the piece is on
 * @param isEnemy When generating enemy moves, include Pawn Capture moves
 * @returns Legal moves for a piece
 */
export const indiviualPieceMoves = (
  chessboard: TileType[][],
  piece: PieceType,
  tile: TileType,
  isEnemy: boolean = false
): number[][] => {
  const [currentRow, currentCol] = convertTilePosition(tile.tilePosition);

  switch (piece.pieceName) {
    case PieceName.pawn: {
      const moves = getPawnMoves(
        chessboard,
        piece.pieceColor,
        currentRow,
        currentCol
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
        chessboard,
        currentRow,
        currentCol,
        piece.pieceColor
      );
    }
    case PieceName.rook: {
      return getSlidingPieceMoves(
        chessboard,
        currentRow,
        currentCol,
        [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1], // Horizontal and vertical
        ],
        piece.pieceColor
      );
    }
    case PieceName.bishop: {
      return getSlidingPieceMoves(
        chessboard,
        currentRow,
        currentCol,
        [
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1], // Diagonal
        ],
        piece.pieceColor
      );
    }
    case PieceName.queen: {
      return getSlidingPieceMoves(
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
        piece.pieceColor
      );
    }
    case PieceName.king: {
      return getKingMoves(chessboard, currentRow, currentCol, piece.pieceColor);
    }
    default: {
      return [];
    }
  }
};
