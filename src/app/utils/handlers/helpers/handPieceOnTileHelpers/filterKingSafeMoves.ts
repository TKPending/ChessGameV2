import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { getKingMoves } from "@/app/utils/pieceMovements/getKingMoves";
import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { TileType } from "@/app/types/TileType";

export const filterKingSafeMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  kingTile: TileType,
  enemyMoves: EnemyAttackType[]
): number[][] => {
  if (!kingTile || !kingTile.pieceOnTile) return [];

  const [kingRow, kingCol] = convertTilePosition(kingTile.tilePosition);
  const kingMoves: [number, number][] = getKingMoves(
    dispatch,
    chessboard,
    kingRow,
    kingCol,
    kingTile.pieceOnTile?.pieceColor
  );

  return kingMoves.filter(
    ([row, col]) =>
      !enemyMoves.some((enemy) =>
        enemy.moves.some(
          ([enemyRow, enemyCol]) => enemyRow === row && enemyCol === col
        )
      )
  );
};
