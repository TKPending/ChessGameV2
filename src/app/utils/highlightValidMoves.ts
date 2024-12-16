import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setSpecificTile } from "../redux/slices/board/boardSlice";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";

export const highlightValidMoves = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  validMoves: number[][],
  currentTurn: "White" | "Black"
) => {
  validMoves.forEach(([row, col]) => {
    const potentialTargetTile: TileType = chessboard[row][col];
    const enemyPiece: PieceType | null = potentialTargetTile.pieceOnTile;

    const enemyOrEmpty: "friendly" | "enemy" =
      enemyPiece?.pieceColor === currentTurn
        ? "friendly"
        : enemyPiece
        ? "enemy"
        : "friendly";

    dispatch(
      setSpecificTile({
        ...potentialTargetTile,
        isHighlighted: true,
        highlightReason: enemyOrEmpty,
      })
    );
  });
};
