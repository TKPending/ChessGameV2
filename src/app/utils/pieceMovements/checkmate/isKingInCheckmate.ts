import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { TileType } from "@/app/types/TileType";
import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";
import { getKingMoves } from "@/app/utils/pieceMovements/getKingMoves";
import {
  setIsKingInCheck,
  setIsKingInCheckmate,
  setValidCheckMoves,
} from "@/app/redux/slices/board/boardSlice";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { findKing } from "./helper/findKing";
import { pathToKing } from "./helper/pathToKing";

export const isKingInCheckmate = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  enemyMoves: EnemyAttackType[],
  currentTurn: "White" | "Black"
) => {
  const kingTile = findKing(chessboard, currentTurn);
  if (!kingTile || !kingTile.pieceOnTile) return;

  const [kingRow, kingCol] = convertTilePosition(kingTile.tilePosition);
  const kingMoves: [number, number][] = getKingMoves(
    dispatch,
    chessboard,
    kingRow,
    kingCol,
    kingTile.pieceOnTile.pieceColor
  );

  // Check if the King is in check
  const isKingInCheck = enemyMoves.some((enemy) =>
    enemy.moves.some(([row, col]) => row === kingRow && col === kingCol)
  );

  dispatch(setIsKingInCheck(isKingInCheck));

  // If the King is not in check, no checkmate
  if (!isKingInCheck) {
    dispatch(setIsKingInCheckmate(false));
    return;
  }

  // Check if the King can capture attacking pieces
  const kingCaptureMoves = kingMoves.filter(
    ([row, col]) =>
      chessboard[row][col].pieceOnTile?.pieceColor !== currentTurn &&
      chessboard[row][col].pieceOnTile
  );

  const kingValidCaptureMoves = kingCaptureMoves.filter(
    ([row, col]) =>
      !enemyMoves.some((enemy) =>
        enemy.moves.some(
          ([enemyRow, enemyCol]) => enemyRow === row && enemyCol === col
        )
      )
  );

  if (kingValidCaptureMoves.length > 0) {
    dispatch(setIsKingInCheckmate(false));
    return;
  }

  // Combine all potential defense moves
  const validDefenseMoves = new Set<string>();
  const attackingPaths = pathToKing(enemyMoves, [kingRow, kingCol]);

  attackingPaths.forEach(({ path }) => {
    path.forEach(([row, col]) => {
      validDefenseMoves.add(JSON.stringify([row, col]));
    });
  });

  const validMovesArray = Array.from(validDefenseMoves).map((move) =>
    JSON.parse(move)
  );

  dispatch(setValidCheckMoves(validMovesArray));

  // If no defense moves and no King escape, it is checkmate
  const isCheckmate = validMovesArray.length === 0;
  dispatch(setIsKingInCheckmate(isCheckmate));
};
