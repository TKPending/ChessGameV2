import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { convertTilePosition } from "./helpers/convertTilePosition";
import { getKingMoves } from "./moveLogic/getKingMoves";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { TileType } from "@/app/types/TileType";

export const kingSafeMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  kingTile: TileType,
  enemyMoves: EnemyAttackType[]
) => {
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
