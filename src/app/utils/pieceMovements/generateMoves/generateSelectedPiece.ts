import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { generatePieceLegalMoves } from "./helper/generatePieceLegalMoves";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { TileType } from "@/app/types/TileType";

/**
 * Generates all moves for the selected piece
 * @param dispatch Update redux state
 * @param chessboard Current chessboard state
 * @param previousClickedTile Originally clicked tile
 * @param enemyMoves All enemy legal moves
 * @returns All legal moves for the selected piece
 */
export const generateSelectedPieceValidMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  previousClickedTile: TileType | null,
  enemyMoves: EnemyAttackType[]
): number[][] => {
  if (!previousClickedTile?.pieceOnTile) return [];
  return generatePieceLegalMoves(
    dispatch,
    chessboard,
    previousClickedTile.pieceOnTile,
    previousClickedTile,
    false,
    false,
    enemyMoves
  );
};
