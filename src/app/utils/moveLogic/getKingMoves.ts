import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { chessboardSearch } from "./chessboardSearch";
import { TileType } from "@/app/types/TileType";

export const getKingMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  currentRow: number,
  currentCol: number,
  pieceToMoveColor: "White" | "Black"
): [number, number][] => {
  const kingMoves: [number, number][] = [
    [currentRow + 1, currentCol],
    [currentRow - 1, currentCol],
    [currentRow, currentCol + 1],
    [currentRow, currentCol - 1],
    [currentRow + 1, currentCol + 1],
    [currentRow + 1, currentCol - 1],
    [currentRow - 1, currentCol + 1],
    [currentRow - 1, currentCol - 1],
  ];

  return chessboardSearch(dispatch, chessboard, kingMoves, pieceToMoveColor);
};
