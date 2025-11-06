import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  setCurrentTile,
  setPreviouslyClickedTile,
} from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { setCurrentPiecePotentialMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { clearTileHighlights } from "@/app/utils/chessboard/design/clearTileHighlights";
import { TileType } from "@/app/types/ChessTypes";

/**
 * Function to reset tiles and get them ready for the next turn
 * @param dispatch Update redux state
 * @param updatedChessboard The updated version of the Chessboard. Could be updated or original version if an error.
 */
export const resetTiles = (
  dispatch: Dispatch<UnknownAction>,
  updatedChessboard: TileType[][]
) => {
  dispatch(setCurrentTile(null));
  dispatch(setPreviouslyClickedTile(null));
  dispatch(setCurrentPiecePotentialMoves([]));
  clearTileHighlights(dispatch, updatedChessboard);
};
