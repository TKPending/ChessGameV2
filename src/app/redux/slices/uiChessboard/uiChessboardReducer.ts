import { PayloadAction } from "@reduxjs/toolkit";
import { convertCoordsToTile } from "@/app/utils/convertCoordsToTile";
import { uiChessboardType } from "@/app/types/StateTypes";
import { TileType } from "@/app/types/ChessTypes";

export const updateUiSelectedTileReducer = (
  state: uiChessboardType,
  action: PayloadAction<TileType | null>
) => {
  state.uiSelectedTile = action.payload;
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
  action: PayloadAction<TileType | null>
) => {
  state.uiSelectedTile = action.payload;
};
