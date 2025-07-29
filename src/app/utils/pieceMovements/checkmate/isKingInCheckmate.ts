import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { TileType } from "@/app/types/ChessTypes";
import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";
import { setValidCheckMoves } from "@/app/redux/slices/activeMoves/activeMovesSlice";
import {
  setKingInCheck,
  setKingInCheckmate,
} from "@/app/redux/slices/chessboard/chessboardSlice";
import { allDefensiveMoves } from "./helper/allDefensiveMoves";
import { findKing } from "./helper/findKing";
import { getKingMoves } from "@/app/utils/pieceMovements/getKingMoves";
import { kingCaptureOutOfCheck } from "./helper/kingCaptureOutOfCheck";
import { kingMovesOutOfCheck } from "./helper/kingMovesOutOfCheck";
import { preventCheckmate } from "./helper/preventCheckmate";
import { EnemyAttackType } from "@/app/types/MoveTypes";
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

  dispatch(setKingInCheck(isKingInCheck));

  if (!isKingInCheck) {
    dispatch(setKingInCheckmate(false));
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

  const kingDefensiveMoves: number[][] = allDefensiveMoves(
    dispatch,
    enemyMoves,
    kingRow,
    kingCol
  );
  dispatch(setValidCheckMoves(kingDefensiveMoves));

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

  const isCheckmate = !preventCheckmate(dispatch, chessboard, currentTurn, [
    ...kingDefensiveMoves,
    ...kingValidCaptureMoves,
  ]);

  dispatch(setKingInCheckmate(isCheckmate));
};
