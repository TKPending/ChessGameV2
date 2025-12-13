import { createSlice } from "@reduxjs/toolkit";
import { uiChessboardType } from "@/app/types/StateTypes";
import {
  clearUiSelectedTileReducer,
  emptyUiAttackTilesReducer,
  emptyUiHighlightedTilesReducer,
  removeUiPreviousMoveTileReducer,
  updateUiAttackTilesReducer,
  updateUiHighlightedTilesReducer,
  updateUiPreviousMoveTileReducer,
  updateUiSelectedTileReducer,
} from "./uiChessboardReducer";

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
    clearUiSelectedTile: clearUiSelectedTileReducer,
    setUiSelectedTile: updateUiSelectedTileReducer,
    setUiHighlightedTiles: updateUiHighlightedTilesReducer,
    clearUiHighlightedTiles: emptyUiHighlightedTilesReducer,
    setUiAttackTiles: updateUiAttackTilesReducer,
    clearUiAttackTiles: emptyUiAttackTilesReducer,
    setUiPreviousMoveTile: updateUiPreviousMoveTileReducer,
    clearUiPreviousMove: removeUiPreviousMoveTileReducer,
  },
});

export const {
  clearUiSelectedTile,
  setUiSelectedTile,
  setUiHighlightedTiles,
  clearUiHighlightedTiles,
  setUiAttackTiles,
  clearUiAttackTiles,
  setUiPreviousMoveTile,
  clearUiPreviousMove,
} = uiChessboardSlice.actions;

export default uiChessboardSlice.reducer;
