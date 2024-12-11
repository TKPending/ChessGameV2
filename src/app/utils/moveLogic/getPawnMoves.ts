import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { chessboardSearch } from "./chessboardSearch";
import { TileType } from "@/app/types/TileType";

export const getPawnMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  pieceToMoveColor: "White" | "Black",
  currentRow: number,
  currentCol: number
) => {
  const direction: number = pieceToMoveColor === "White" ? -1 : 1;
  const isFirstMove =
    (pieceToMoveColor === "White" && currentRow === 6) ||
    (pieceToMoveColor === "Black" && currentRow === 1);

  const isPromotion =
    (pieceToMoveColor === "White" && currentRow === 0) ||
    (pieceToMoveColor === "Black" && currentRow === 7);

  const forward: [number, number] = [currentRow + direction, currentCol];
  const doubleForward: [number, number] = [
    currentRow + 2 * direction,
    currentCol,
  ];
  const pawnMoves: [number, number][] = [];

  if (!chessboard[forward[0]][forward[1]].pieceOnTile) {
    pawnMoves.push(forward);
  }

  if (isFirstMove) {
    const tileAhead: TileType = chessboard[forward[0]][forward[1]];
    const tileTwoAhead: TileType =
      chessboard[doubleForward[0]][doubleForward[1]];

    if (!tileAhead.pieceOnTile && !tileTwoAhead.pieceOnTile) {
      pawnMoves.push(doubleForward);
    }
  }

  // Diagonal capture moves
  const diagonalLeft: [number, number] = [
    currentRow + direction,
    currentCol - 1,
  ];
  const diagonalRight: [number, number] = [
    currentRow + direction,
    currentCol + 1,
  ];

  const diagonalMoves: [number, number][] = [];

  const leftTile: TileType = chessboard[diagonalLeft[0]][diagonalLeft[1]];
  if (
    leftTile.pieceOnTile &&
    leftTile.pieceOnTile.pieceColor !== pieceToMoveColor
  ) {
    diagonalMoves.push(diagonalLeft);
  }

  const rightTile: TileType = chessboard[diagonalRight[0]][diagonalRight[1]];
  if (
    rightTile.pieceOnTile &&
    rightTile.pieceOnTile.pieceColor !== pieceToMoveColor
  ) {
    diagonalMoves.push(diagonalRight);
  }

  const allPawnMoves = [...pawnMoves, ...diagonalMoves];

  return chessboardSearch(dispatch, chessboard, allPawnMoves, pieceToMoveColor);
};
