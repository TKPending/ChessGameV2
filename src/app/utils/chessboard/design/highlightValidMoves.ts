import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setSpecificTile } from "@/app/redux/slices/old/board/boardSlice";
import { PieceType } from "@/app/types/PieceTypes";
import { TileType } from "@/app/types/TileType";

/**
 * All the valid moves are highlighted on the Chessboard
 * @param dispatch To update the value in redux
 * @param chessboard Chessboard object that the Chess Game is going to be played on
 * @param validMoves All the valid moves, that should be highlighted once a Tile is clicked
 * @param currentTurn The current turn in a game
 */
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
