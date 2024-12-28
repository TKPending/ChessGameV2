import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { allSelectedPieceLegalMoves } from "@/app/utils/pieceMovements/helpers/allSelectedPieceLegalMoves";
import { TileType } from "@/app/types/TileType";

/**
 * Returns all the moves that a Pawn can do
 * @param dispatch Update Redux State
 * @param chessboard Object that keeps track of the Chessboard
 * @param pieceToMoveColor Color of the piece that is going to be moved
 * @param currentRow Row of the current Pawn
 * @param currentCol Col of the current Pawn
 * @returns All the moves that a Pawn can make
 */
export const getPawnMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  pieceToMoveColor: "White" | "Black",
  currentRow: number,
  currentCol: number,
  simulation: boolean
) => {
  const direction: number = pieceToMoveColor === "White" ? -1 : 1;
  const isFirstMove =
    (pieceToMoveColor === "White" && currentRow === 6) ||
    (pieceToMoveColor === "Black" && currentRow === 1);

  // Promote piece
  const isPromotion =
    (pieceToMoveColor === "White" && currentRow === 0) ||
    (pieceToMoveColor === "Black" && currentRow === 7);

  if (isPromotion) {
    return [];
  }

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

  const leftTile: TileType | null =
    chessboard[diagonalLeft[0]][diagonalLeft[1]];
  if (leftTile) {
    if (
      leftTile.pieceOnTile &&
      leftTile.pieceOnTile.pieceColor !== pieceToMoveColor
    ) {
      diagonalMoves.push(diagonalLeft);
    }
  }

  const rightTile: TileType | null =
    chessboard[diagonalRight[0]][diagonalRight[1]];
  if (rightTile) {
    if (
      rightTile.pieceOnTile &&
      rightTile.pieceOnTile.pieceColor !== pieceToMoveColor
    ) {
      diagonalMoves.push(diagonalRight);
    }
  }

  const allPawnMoves = [...pawnMoves, ...diagonalMoves];

  return allSelectedPieceLegalMoves(
    dispatch,
    chessboard,
    allPawnMoves,
    pieceToMoveColor,
    simulation
  );
};
