import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  setUiAttackTiles,
  setUiHighlightedTiles,
  setUiPreviousMoveTile,
  setUiSelectedTile,
} from "@/app/redux/slices/uiChessboard/uiChessboardSlice";

export const resetUiHighlights = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(setUiSelectedTile(null));
  dispatch(setUiHighlightedTiles([]));
  dispatch(setUiAttackTiles([]));
  dispatch(setUiPreviousMoveTile(null));
};
