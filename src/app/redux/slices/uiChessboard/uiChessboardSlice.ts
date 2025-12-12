import { createSlice } from "@reduxjs/toolkit";
import { uiChessboardType } from "@/app/types/StateTypes";
import {
  emptyUiAttackTilesReducer,
  emptyUiHighlightedTilesReducer,
  removeUiPreviousMoveTileReducer,
  updateUiAttackTilesReducer,
  updateUiHighlightedTilesReducer,
  updateUiPreviousMoveTileReducer,
  updateUiSelectedTileReducer,
} from "./uiChessboardReducer";

// TODO: Need to refactor
const initialState: uiChessboardType = {
  uiSelectedTile: null,
  uiHighlightedTiles: [],
  uiAttackTiles: [],
  uiPreviousMoveTile: {
    from: "",
    to: "",
  },
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
    resetUiPreviousMoveTiles: removeUiPreviousMoveTileReducer,
  },
});

export const {
  setUiSelectedTile,
  setUiHighlightedTiles,
  clearUiHighlightedTiles,
  setUiAttackTiles,
  clearUiAttackTiles,
  setUiPreviousMoveTile,
  resetUiPreviousMoveTiles,
} = uiChessboardSlice.actions;

export default uiChessboardSlice.reducer;
