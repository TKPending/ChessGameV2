import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { TileType } from "@/app/types/TileType";
import { PieceType } from "@/app/types/PieceType";
import { convertTilePosition } from "@/app/utils/convertTilePosition";
import { getKingMoves } from "../getKingMoves";
import { setIsKingInCheckmate } from "@/app/redux/slices/board/boardSlice";

export const isKingInCheckmate = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  enemyMoves: number[][]
) => {
  let kingTile: TileType | null = null;
  let kingColor: "White" | "Black" | null = null;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = chessboard[row][col];
      const piece = tile.pieceOnTile;
      if (piece && piece.pieceName === "King") {
        kingTile = tile;
        kingColor = piece.pieceColor;
        break;
      }
    }
    if (kingTile) break;
  }

  if (!kingTile || !kingColor) return;

  const [kingRow, kingCol] = convertTilePosition(kingTile.tilePosition);

  const kingMoves = getKingMoves(
    dispatch,
    chessboard,
    kingRow,
    kingCol,
    kingColor
  );

  const isCurrentPositionUnderThreat = enemyMoves.some(
    ([enemyRow, enemyCol]) => enemyRow === kingRow && enemyCol === kingCol
  );

  if (!isCurrentPositionUnderThreat) {
    return;
  }

  const isCheckmate = kingMoves.every(([row, col]) =>
    enemyMoves.some(
      ([enemyRow, enemyCol]) => enemyRow === row && enemyCol === col
    )
  );

  if (isCheckmate) {
    dispatch(setIsKingInCheckmate(true));
  } else {
    console.log("King is in check, but not checkmate.");
  }
};
