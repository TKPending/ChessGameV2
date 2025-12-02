import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  setCurrentTile,
  setPreviousTile,
} from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { clearTileHighlights } from "@/app/containers/chessboard/utils/chessboard/design/clearTileHighlights";
import { TileType } from "@/app/types/ChessTypes";
import { setCurrentTeamMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";

/**
 * Function to reset tiles and get them ready for the next turn
 * @param dispatch Update redux state
 * @param updatedChessboard The updated version of the Chessboard. Could be updated or original version if an error.
 * @param highlightPreviousMove Prevent the previous move highlight from being removed
 */
export const resetTiles = (
  dispatch: Dispatch<UnknownAction>,
  updatedChessboard: TileType[][],
  highlightPreviousMove?: boolean
) => {
  dispatch(setCurrentTile(null));
  dispatch(setPreviousTile(null));
  dispatch(setCurrentTeamMoves([]));
  clearTileHighlights(dispatch, updatedChessboard, highlightPreviousMove);
};
