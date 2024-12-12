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

export const handleClickedPiece = (
  dispatch: Dispatch<UnknownAction>,
  clickedTile: TileType,
  chessboard: TileType[][]
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

  const pieceValidMoves: [number, number][] = generateValidMoves(
    dispatch,
    chessboard,
    clickedTile
  );

  highlightValidMoves(dispatch, chessboard, pieceValidMoves);

  dispatch(setValidMoves(pieceValidMoves));
};
