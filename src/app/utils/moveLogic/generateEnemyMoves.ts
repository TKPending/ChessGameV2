import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { TileType } from "@/app/types/TileType";
import { PieceType, PieceName } from "@/app/types/PieceType";
import { getPawnMoves } from "./getPawnMoves";
import { getKnightMoves } from "./getKnightMoves";
import { getSlidingPieceMoves } from "./getSlidingPieceMoves";
import { getKingMoves } from "./getKingMoves";
import { convertTilePosition } from "@/app/utils/helpers/convertTilePosition";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";

// Helper to classify sliding pieces' directions
const classifySlidingDirections = (
  pieceName: PieceName
): "horizontal" | "vertical" | "diagonal" | "all" => {
  if (pieceName === PieceName.rook) return "horizontal"; // Rook moves horizontally and vertically
  if (pieceName === PieceName.bishop) return "diagonal"; // Bishop moves diagonally
  if (pieceName === PieceName.queen) return "all"; // Queen moves both diagonally and horizontally/vertically
  return "all";
};

export const generateEnemyMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  enemyColor: "White" | "Black"
): EnemyAttackType[] => {
  const enemyMoves: EnemyAttackType[] = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = chessboard[row][col];
      const piece: PieceType | null = tile.pieceOnTile;

      if (piece && piece.pieceColor === enemyColor) {
        const [enemyRow, enemyCol] = convertTilePosition(tile.tilePosition);

        let moves: number[][] = [];

        switch (piece.pieceName) {
          case PieceName.pawn: {
            // Pawns can only move diagonally for attacking
            moves = getPawnMoves(
              dispatch,
              chessboard,
              enemyColor,
              enemyRow,
              enemyCol
            );
            moves = moves.filter(
              ([moveRow, moveCol]) =>
                Math.abs(moveRow - enemyRow) === 1 &&
                Math.abs(moveCol - enemyCol) === 1
            ); // Only diagonal captures
            break;
          }
          case PieceName.knight: {
            moves = getKnightMoves(
              dispatch,
              chessboard,
              enemyRow,
              enemyCol,
              enemyColor
            );
            break;
          }
          case PieceName.rook:
          case PieceName.bishop:
          case PieceName.queen: {
            const directions = {
              [PieceName.rook]: [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1], // Horizontal and vertical
              ],
              [PieceName.bishop]: [
                [1, 1],
                [1, -1],
                [-1, 1],
                [-1, -1], // Diagonal
              ],
              [PieceName.queen]: [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1],
                [1, 1],
                [1, -1],
                [-1, 1],
                [-1, -1], // All directions
              ],
            };

            moves = getSlidingPieceMoves(
              dispatch,
              chessboard,
              enemyRow,
              enemyCol,
              directions[piece.pieceName],
              enemyColor
            );
            break;
          }
          case PieceName.king: {
            moves = getKingMoves(
              dispatch,
              chessboard,
              enemyRow,
              enemyCol,
              enemyColor
            );
            break;
          }
          default:
            break;
        }

        // If the piece has no valid moves, skip it
        if (moves.length === 0) {
          continue;
        }

        // Add the piece with its valid moves and direction
        const direction = classifySlidingDirections(piece.pieceName);
        enemyMoves.push({
          piecePosition: [enemyRow, enemyCol],
          piece,
          moves,
          direction,
        });
      }
    }
  }

  return enemyMoves;
};
