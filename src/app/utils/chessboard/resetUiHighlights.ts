import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  setUiAttackTiles,
  setUiHighlightedTiles,
  setUiSelectedTile,
} from "@/app/redux/slices/uiChessboard/uiChessboardSlice";

/**
 * Resets the UI highlights on the chessboard.
 * @param dispatch Update redux state
 */
export const resetUiHighlights = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(setUiSelectedTile(null));
  dispatch(setUiHighlightedTiles([]));
  dispatch(setUiAttackTiles([]));
};
