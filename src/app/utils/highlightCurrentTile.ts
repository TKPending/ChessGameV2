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
  clearHighlights(dispatch, chessboard);
  dispatch(setPreviouslyClickedTile(clickedTile));
  dispatch(
    setSpecificTile({
      ...clickedTile,
      isHighlighted: true,
      highlightReason: "selected",
    })
  );
  const pieceValidMoves: [number, number][] = generatePieceMovements(
    dispatch,
    chessboard,
    clickedTile
  );
  dispatch(setValidMoves(pieceValidMoves));
};
