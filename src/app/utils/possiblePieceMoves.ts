import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setSpecificTile } from "@/app/redux/slices/board/boardSlice";
import { TileType } from "@/app/types/TileType";
import { PieceType } from "@/app/types/PieceType";

export const possiblePieceMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  defaultMoves: [number, number][],
  pieceToMoveColor: "White" | "Black"
): [number, number][] => {
  const pieceValidMoves: [number, number][] = [];

  defaultMoves.forEach(([targetRow, targetCol]) => {
    if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
      const targetTile: TileType = chessboard[targetRow][targetCol];
      const enemyPiece: PieceType | null = targetTile.pieceOnTile;

      // Check if the target tile is occupied by a friendly piece
      if (!enemyPiece || enemyPiece.pieceColor !== pieceToMoveColor) {
        pieceValidMoves.push([targetRow, targetCol]);
      } else {
        dispatch(setSpecificTile({ ...targetTile, isHighlighted: false }));
      }
    }
  });

  return pieceValidMoves;
};
