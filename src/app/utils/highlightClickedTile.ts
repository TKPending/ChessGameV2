import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { TileType } from "@/app/types/TileType";
import { clearHighlights } from "@/app/utils/clearHighlight";
import {
  setPreviouslyClickedTile,
  setSpecificTile,
  setValidMoves,
} from "@/app/redux/slices/board/boardSlice";
import { generatePieceMovements } from "./generatePieceMovements";

export const highlightClickedTile = (
  dispatch: Dispatch<UnknownAction>,
  clickedTile: TileType,
  chessboard: TileType[][]
) => {
  clearHighlights(dispatch, chessboard); // Clear previous highlights

  // Highlight the clicked tile
  dispatch(
    setSpecificTile({
      ...clickedTile,
      isHighlighted: true,
      highlightReason: "selected", // Blue
    })
  );

  dispatch(setPreviouslyClickedTile(clickedTile));

  const pieceValidMoves: [number, number][] = generatePieceMovements(
    dispatch,
    chessboard,
    clickedTile
  );

  // Highlight valid moves
  pieceValidMoves.forEach(([row, col]) => {
    const targetTile = chessboard[row][col];
    const enemyPiece = targetTile.pieceOnTile;

    dispatch(
      setSpecificTile({
        ...targetTile,
        isHighlighted: true,
        highlightReason: enemyPiece ? "enemy" : "friendly", // Red or Green
      })
    );
  });

  dispatch(setValidMoves(pieceValidMoves)); // Update state with valid moves
};
