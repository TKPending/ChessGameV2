import { createSlice } from "@reduxjs/toolkit";
import { uiChessboardType } from "@/app/types/StateTypes";
import {
  emptyUiAttackTilesReducer,
  emptyUiHighlightedTilesReducer,
  updateUiAttackTilesReducer,
  updateUiHighlightedTilesReducer,
  updateUiPreviousMoveTileReducer,
  updateUiSelectedTileReducer,
} from "./uiChessboardReducer";

const initialState: uiChessboardType = {
  uiSelectedTile: null,
  uiHighlightedTiles: [],
  uiAttackTiles: [],
  uiPreviousMoveTile: null,
};

const uiChessboardSlice = createSlice({
  name: "uiChessboard",
  initialState,
  reducers: {
    setUiSelectedTile: updateUiSelectedTileReducer,
    setUiHighlightedTiles: updateUiHighlightedTilesReducer,
    clearUiHighlightedTiles: emptyUiHighlightedTilesReducer,
    setUiAttackTiles: updateUiAttackTilesReducer,
    clearUiAttackTiles: emptyUiAttackTilesReducer,
    setUiPreviousMoveTile: updateUiPreviousMoveTileReducer,
  },
});

export const {
  setUiSelectedTile,
  setUiHighlightedTiles,
  clearUiHighlightedTiles,
  setUiAttackTiles,
  clearUiAttackTiles,
  setUiPreviousMoveTile,
} = uiChessboardSlice.actions;

export default uiChessboardSlice.reducer;
