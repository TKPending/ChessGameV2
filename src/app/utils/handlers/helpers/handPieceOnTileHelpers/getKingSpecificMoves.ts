import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { filterKingSafeMoves } from "./filterKingSafeMoves";
import { filterCastleMoves } from "./filterCastleMoves";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { TileType, PieceName } from "@/app/types/ChessTypes";

/**
 * Gathers the moves specifically for the King such as Castling and Safe Moves
 * @param dispatch Update redux state
 * @param clickedTile Target Tile
 * @param chessboard Current chessboard state
 * @param enemyMoves All enemy moves
 * @param attackingPositions All positions of piece attacking the King
 * @param currentTurn Current team turn
 * @returns Castling moves and Moves that are valid for the King
 */
export const getKingSpecificMoves = (
  dispatch: Dispatch<UnknownAction>,
  clickedTile: TileType,
  chessboard: TileType[][],
  enemyMoves: EnemyAttackType[],
  attackingPositions: number[][],
  currentTurn: "White" | "Black"
): number[][] => {
  const pieceName: PieceName | undefined = clickedTile.pieceOnTile?.pieceName;
  if (!pieceName || pieceName !== "King") return [];

  const kingCastleMoves: number[][] = filterCastleMoves(
    chessboard,
    clickedTile,
    enemyMoves,
    currentTurn
  );

  const kingSafeMoves: number[][] = filterKingSafeMoves(
    dispatch,
    chessboard,
    clickedTile,
    enemyMoves,
    attackingPositions
  );

  return [...kingCastleMoves, ...kingSafeMoves];
};
