import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  setClickedTile,
  setPreviouslyClickedTile,
  setValidMoves,
} from "@/app/redux/slices/board/boardSlice";
import { clearHighlights } from "@/app/utils/chessboard/design/clearHighlight";
import { TileType } from "@/app/types/TileType";

export const resetTiles = (
  dispatch: Dispatch<UnknownAction>,
  updatedChessboard: TileType[][]
) => {
  dispatch(setClickedTile(null));
  dispatch(setPreviouslyClickedTile(null));
  dispatch(setValidMoves([]));
  clearHighlights(dispatch, updatedChessboard);
};
