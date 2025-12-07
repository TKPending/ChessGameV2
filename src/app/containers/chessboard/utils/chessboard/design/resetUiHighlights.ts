import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  resetUiPreviousMoveTiles,
  setUiAttackTiles,
  setUiHighlightedTiles,
  setUiSelectedTile,
} from "@/app/redux/slices/uiChessboard/uiChessboardSlice";

export const resetUiHighlights = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(setUiSelectedTile(null));
  dispatch(setUiHighlightedTiles([]));
  dispatch(setUiAttackTiles([]));
};
