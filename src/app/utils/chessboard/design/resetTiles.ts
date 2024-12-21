import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  setClickedTile,
  setPreviouslyClickedTile,
  setValidMoves,
} from "@/app/redux/slices/board/boardSlice";
import { clearTileHighlights } from "@/app/utils/chessboard/design/clearTileHighlights";
import { TileType } from "@/app/types/TileType";

export const resetTiles = (
  dispatch: Dispatch<UnknownAction>,
  updatedChessboard: TileType[][]
) => {
  dispatch(setClickedTile(null));
  dispatch(setPreviouslyClickedTile(null));
  dispatch(setValidMoves([]));
  clearTileHighlights(dispatch, updatedChessboard);
};
