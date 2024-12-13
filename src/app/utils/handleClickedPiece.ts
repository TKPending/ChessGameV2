import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { TileType } from "@/app/types/TileType";
import { clearHighlights } from "@/app/utils/clearHighlight";
import {
  setPreviouslyClickedTile,
  setSpecificTile,
  setValidMoves,
} from "@/app/redux/slices/board/boardSlice";
import { generateValidMoves } from "./generateValidMoves";
import { highlightValidMoves } from "./highlightValidMoves";
import { isInCheckFilter } from "./isInCheckFilter";

export const handleClickedPiece = (
  dispatch: Dispatch<UnknownAction>,
  clickedTile: TileType,
  chessboard: TileType[][],
  isInCheck: boolean,
  validCheckMoves: number[][]
) => {
  clearHighlights(dispatch, chessboard);

  dispatch(
    setSpecificTile({
      ...clickedTile,
      isHighlighted: true,
      highlightReason: "selected", // Blue
    })
  );

  dispatch(setPreviouslyClickedTile(clickedTile));

  // Generate the valid moves for the selected piece
  const pieceValidMoves: number[][] = generateValidMoves(
    dispatch,
    chessboard,
    clickedTile
  );

  // Filter moves if the King is in check
  const filteredMoves: number[][] = isInCheck
    ? isInCheckFilter(pieceValidMoves, validCheckMoves)
    : pieceValidMoves;

  // Highlight and dispatch the filtered moves
  highlightValidMoves(dispatch, chessboard, filteredMoves);
  dispatch(setValidMoves(filteredMoves));
};
