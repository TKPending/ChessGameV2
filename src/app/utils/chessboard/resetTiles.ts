import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setPreviousTile } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import {
  clearMoveState,
  setCurrentTeamMoves,
  setSelectedPieceMoves,
} from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { resetUiHighlights } from "./resetUiHighlights";

/**
 * Function to reset tiles and get them ready for the next turn
 * @param dispatch Update redux state
 */
export const resetTiles = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(setPreviousTile(null));
  dispatch(setCurrentTeamMoves([]));
  dispatch(clearMoveState());
  dispatch(setSelectedPieceMoves([]));
  resetUiHighlights(dispatch);
};
