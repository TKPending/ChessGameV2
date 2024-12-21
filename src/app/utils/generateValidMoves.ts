import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { getSlidingPieceMoves } from "./moveLogic/getSlidingPieceMoves";
import { getKnightMoves } from "./moveLogic/getKnightMoves";
import { getKingMoves } from "./moveLogic/getKingMoves";
import { getPawnMoves } from "./moveLogic/getPawnMoves";
import { convertTilePosition } from "@/app/utils/helpers/convertTilePosition";
import { PieceName } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";

export const generateValidMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  previousClickedTile: TileType | null,
  enemyMoves: EnemyAttackType[]
): number[][] => {
  const pieceToMoveColor: "White" | "Black" | undefined =
    previousClickedTile?.pieceOnTile?.pieceColor;
  if (!pieceToMoveColor || !previousClickedTile?.pieceOnTile) return [];

  const pieceName: PieceName = previousClickedTile.pieceOnTile.pieceName;
  const [currentRow, currentCol] = convertTilePosition(
    previousClickedTile.tilePosition
  );

  switch (pieceName) {
    case PieceName.pawn:
      return getPawnMoves(
        dispatch,
        chessboard,
        pieceToMoveColor,
        currentRow,
        currentCol
      );
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
        pieceToMoveColor,
        enemyMoves
      );

    default:
      return [];
  }
};
