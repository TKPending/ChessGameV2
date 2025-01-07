import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { TileType } from "@/app/types/TileType";
import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";
import {
  setIsKingInCheck,
  setIsKingInCheckmate,
  setValidCheckMoves,
} from "@/app/redux/slices/board/boardSlice";
import { allDefensiveMoves } from "./helper/allDefensiveMoves";
import { findKing } from "./helper/findKing";
import { getKingMoves } from "@/app/utils/pieceMovements/getKingMoves";
import { kingCaptureOutOfCheck } from "./helper/kingCaptureOutOfCheck";
import { kingMovesOutOfCheck } from "./helper/kingMovesOutOfCheck";
import { preventCheckmate } from "./helper/preventCheckmate";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";

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

  const kingMoves: [number, number][] = getKingMoves(
    dispatch,
    chessboard,
    kingRow,
    kingCol,
    kingTile.pieceOnTile.pieceColor,
    false,
    [],
    true
  );

  if (kingMovesOutOfCheck(kingMoves, enemyMoves)) {
    return;
  }

  const kingValidCaptureMoves: number[][] = kingCaptureOutOfCheck(
    dispatch,
    chessboard,
    kingMoves,
    kingTile,
    enemyMoves,
    currentTurn
  );

  const kingDefensiveMoves: number[][] = allDefensiveMoves(
    dispatch,
    enemyMoves,
    kingRow,
    kingCol
  );

  dispatch(setValidCheckMoves(kingDefensiveMoves));

  const isCheckmate = !preventCheckmate(dispatch, chessboard, currentTurn, [
    ...kingDefensiveMoves,
    ...kingValidCaptureMoves,
  ]);

  dispatch(setIsKingInCheckmate(isCheckmate));
};
