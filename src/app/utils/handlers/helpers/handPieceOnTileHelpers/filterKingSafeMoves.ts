import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { getKingMoves } from "@/app/utils/pieceMovements/getKingMoves";
import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { TileType } from "@/app/types/ChessTypes";

/**
 * Checks all King's moves against enemy moves and attacking pieces.
 * @param dispatch Update Redux State
 * @param chessboard Current Chessboard State
 * @param kingTile Tile that the King is on
 * @param enemyMoves All enemy potential moves
 * @param attackingPieces Positions of pieces currently attacking the King
 * @returns All moves that are legal for the King piece
 */
export const filterKingSafeMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  kingTile: TileType,
  enemyMoves: EnemyAttackType[],
  attackingPieces: number[][]
): number[][] => {
  if (!kingTile || !kingTile.pieceOnTile) return [];

  const [kingRow, kingCol] = convertTilePosition(kingTile.tilePosition);
  const kingMoves: [number, number][] = getKingMoves(
    dispatch,
    chessboard,
    kingRow,
    kingCol,
    kingTile.pieceOnTile?.pieceColor,
    false
  );

  return kingMoves.filter(([row, col]) => {
    const isThreatenedByEnemy = enemyMoves.some((enemy) =>
      enemy.moves.some(
        ([enemyRow, enemyCol]) => enemyRow === row && enemyCol === col
      )
    );

    const isAttackingPiece = attackingPieces.some(
      ([attackingRow, attackingCol]) =>
        attackingRow === row && attackingCol === col
    );

    // Allow capturing attacking pieces, but avoid other threats
    return isAttackingPiece || !isThreatenedByEnemy;
  });
};
