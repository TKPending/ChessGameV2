import { PayloadAction } from "@reduxjs/toolkit";
import { convertCoordsToTile } from "@/app/utils/convertCoordsToTile";
import { uiChessboardType } from "@/app/types/StateTypes";
import { TileType, uiPreviousMoveType } from "@/app/types/ChessTypes";

export const updateUiSelectedTileReducer = (
  state: uiChessboardType,
  action: PayloadAction<TileType>
) => {
  state.uiSelectedTile = action.payload;
};

export const clearUiSelectedTileReducer = (state: uiChessboardType) => {
  state.uiSelectedTile = null;
};

export const updateUiHighlightedTilesReducer = (
  state: uiChessboardType,
  action: PayloadAction<number[][]>
) => {
  state.uiHighlightedTiles = convertCoordsToTile(action.payload);
};

export const emptyUiHighlightedTilesReducer = (state: uiChessboardType) => {
  state.uiHighlightedTiles = [];
};

export const updateUiAttackTilesReducer = (
  state: uiChessboardType,
  action: PayloadAction<string[]>
) => {
  state.uiAttackTiles = action.payload;
};

export const emptyUiAttackTilesReducer = (state: uiChessboardType) => {
  state.uiHighlightedTiles = [];
};

export const updateUiPreviousMoveTileReducer = (
  state: uiChessboardType,
  action: PayloadAction<uiPreviousMoveType>
) => {
  state.uiPreviousMoveTile = action.payload;
};

export const removeUiPreviousMoveTileReducer = (state: uiChessboardType) => {
  state.uiPreviousMoveTile = { from: "", to: "" };
};
