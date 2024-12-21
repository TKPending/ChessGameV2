import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { TileType } from "@/app/types/TileType";
import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";
import {
  setIsKingInCheck,
  setIsKingInCheckmate,
  setValidCheckMoves,
} from "@/app/redux/slices/board/boardSlice";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { findKing } from "./helper/findKing";
import { pathToKing } from "./helper/pathToKing";
import { kingCaptureOutOfCheck } from "./helper/kingCaptureOutOfCheck";
import { allDefensiveMoves } from "./helper/allDefensiveMoves";

/**
 * Checks whether the King piece is in check or checkmate
 * @param dispatch Update the redux state
 * @param chessboard Chessboard Object that the game is being tracked on
 * @param enemyMoves All possible enemy moves
 * @param currentTurn The current turn in the game
 */

export const isKingInCheckmate = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  enemyMoves: EnemyAttackType[],
  currentTurn: "White" | "Black"
) => {
  const kingTile = findKing(chessboard, currentTurn);
  if (!kingTile || !kingTile.pieceOnTile) return;

  const [kingRow, kingCol] = convertTilePosition(kingTile.tilePosition);

  // Check if the King is in check
  const isKingInCheck = enemyMoves.some((enemy) =>
    enemy.moves.some(([row, col]) => row === kingRow && col === kingCol)
  );

  dispatch(setIsKingInCheck(isKingInCheck));

  if (!isKingInCheck) {
    dispatch(setIsKingInCheckmate(false));
    return;
  }

  const kingValidCaptureMoves: number[][] = kingCaptureOutOfCheck(
    dispatch,
    chessboard,
    kingRow,
    kingCol,
    kingTile,
    enemyMoves,
    currentTurn
  );

  if (kingValidCaptureMoves.length > 0) {
    return;
  }

  const kingDefensiveMoves: number[][] = allDefensiveMoves(
    enemyMoves,
    kingRow,
    kingCol
  );

  dispatch(setValidCheckMoves(kingDefensiveMoves));

  const isCheckmate = kingDefensiveMoves.length === 0;
  dispatch(setIsKingInCheckmate(isCheckmate));
};
