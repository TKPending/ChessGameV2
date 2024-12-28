import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setSpecificTile } from "@/app/redux/slices/board/boardSlice";
import { TileType } from "@/app/types/TileType";
import { PieceType } from "@/app/types/PieceType";
import { TileEmptyOrHasEnemy } from "./TileEmptyOrHasEnemy";

/**
 * Checks all potential moves
 * @param dispatch Update redux state
 * @param chessboard Current chessboard state
 * @param defaultMoves All possible moves a piece can make
 * @param pieceToMoveColor Color of the piece that is being checked
 * @returns All moves that are legal
 */
export const allSelectedPieceLegalMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  defaultMoves: [number, number][],
  pieceToMoveColor: "White" | "Black",
  simulation: boolean
): [number, number][] => {
  const pieceValidMoves: [number, number][] = [];

  defaultMoves.forEach(([targetRow, targetCol]) => {
    if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
      const targetTile: TileType = chessboard[targetRow][targetCol];
      const enemyPiece: PieceType | null = targetTile.pieceOnTile;

      if (TileEmptyOrHasEnemy(enemyPiece, pieceToMoveColor)) {
        pieceValidMoves.push([targetRow, targetCol]);
      } else {
        if (!simulation) {
          dispatch(setSpecificTile({ ...targetTile, isHighlighted: false }));
        }
      }
    }
  });

  return pieceValidMoves;
};
