import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { TileType } from "@/app/types/TileType";
import { convertTilePosition } from "@/app/utils/convertTilePosition";
import { getKingMoves } from "@/app/utils/moveLogic/getKingMoves";
import {
  setIsKingInCheck,
  setIsKingInCheckmate,
  setValidCheckMoves,
} from "@/app/redux/slices/board/boardSlice";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { findKing } from "./findKing";
import { pathToKing } from "./pathToKing";

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

  // Check if the king is in check
  const isKingInCheck = enemyMoves.some((enemy) =>
    enemy.moves.some(([row, col]) => row === kingRow && col === kingCol)
  );

  dispatch(setIsKingInCheck(isKingInCheck));

  // If the king isn't in check, return early
  if (!isKingInCheck) return;

  // Check for checkmate: all king moves are under attack
  const isCheckmate = kingMoves.every(([row, col]) =>
    enemyMoves.some((enemy) =>
      enemy.moves.some(
        ([enemyRow, enemyCol]) => enemyRow === row && enemyCol === col
      )
    )
  );

  if (isCheckmate) {
    console.log("King is in checkmate");
    dispatch(setIsKingInCheckmate(true));
    return;
  }

  // Combine all potential attack moves into a single set
  const validDefenseMoves = new Set<string>();

  // Generate paths to the king for sliding pieces vand direct attacks
  const attackingPaths = pathToKing(enemyMoves, [kingRow, kingCol]);
  attackingPaths.forEach(({ path }) => {
    path.forEach(([row, col]) => {
      validDefenseMoves.add(JSON.stringify([row, col]));
    });
  });

  // Convert back to an array of moves
  const validMovesArray = Array.from(validDefenseMoves).map((move) =>
    JSON.parse(move)
  );

  dispatch(setValidCheckMoves(validMovesArray));
};
