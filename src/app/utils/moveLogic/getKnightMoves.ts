import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { chessboardSearch } from "./chessboardSearch";
import { possiblePieceMoves } from "@/app/utils/possiblePieceMoves";
import { TileType } from "@/app/types/TileType";

export const getKnightMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  currentRow: number,
  currentCol: number,
  pieceToMoveColor: "White" | "Black"
): [number, number][] => {
  const knightMoves: [number, number][] = [
    [currentRow + 2, currentCol + 1],
    [currentRow + 2, currentCol - 1],
    [currentRow - 2, currentCol + 1],
    [currentRow - 2, currentCol - 1],
    [currentRow + 1, currentCol + 2],
    [currentRow + 1, currentCol - 2],
    [currentRow - 1, currentCol + 2],
    [currentRow - 1, currentCol - 2],
  ];

  return possiblePieceMoves(
    dispatch,
    chessboard,
    knightMoves,
    pieceToMoveColor
  );
  // return chessboardSearch(dispatch, chessboard, validMoves, pieceToMoveColor);
};
