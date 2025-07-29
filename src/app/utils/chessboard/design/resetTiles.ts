import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  setClickedTile,
  setPreviouslyClickedTile,
  setValidMoves,
} from "@/app/redux/slices/old/board/boardSlice";
import { clearTileHighlights } from "@/app/utils/chessboard/design/clearTileHighlights";
import { TileType } from "@/app/types/TileType";

/**
 * Function to reset tiles and get them ready for the next turn
 * @param dispatch Update redux state
 * @param updatedChessboard The updated version of the Chessboard. Could be updated or original version if an error.
 */
export const resetTiles = (
  dispatch: Dispatch<UnknownAction>,
  updatedChessboard: TileType[][]
) => {
  dispatch(setClickedTile(null));
  dispatch(setPreviouslyClickedTile(null));
  dispatch(setValidMoves([]));
  clearTileHighlights(dispatch, updatedChessboard);
};
