import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  clearUiSelectedTile,
  setUiAttackTiles,
  setUiHighlightedTiles,
} from "@/app/redux/slices/uiChessboard/uiChessboardSlice";

/**
 * Resets the UI highlights on the chessboard.
 * @param dispatch Update redux state
 */
export const resetUiHighlights = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(clearUiSelectedTile());
  dispatch(setUiHighlightedTiles([]));
  dispatch(setUiAttackTiles([]));
};
