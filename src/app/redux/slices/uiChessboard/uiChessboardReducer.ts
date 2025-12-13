import { PayloadAction } from "@reduxjs/toolkit";
import { convertCoordsToTile } from "@/app/utils/convertCoordsToTile";
import { uiChessboardType } from "@/app/types/StateTypes";
import { TileType, uiPreviousMoveType } from "@/app/types/ChessTypes";

/**
 * Highlight selected tile
 * @param state Current Redux State
 * @param action PayloadAction with TileType
 */
export const updateUiSelectedTileReducer = (
  state: uiChessboardType,
  action: PayloadAction<TileType>
) => {
  state.uiSelectedTile = action.payload;
};

/**
 * Clear selected tile
 * @param state Current Redux State
 */
export const clearUiSelectedTileReducer = (state: uiChessboardType) => {
  state.uiSelectedTile = null;
};

/**
 * Highlight tiles on the chessboard
 * @param state Current Redux State
 * @param action PayloadAction with number[][]
 */
export const updateUiHighlightedTilesReducer = (
  state: uiChessboardType,
  action: PayloadAction<number[][]>
) => {
  state.uiHighlightedTiles = convertCoordsToTile(action.payload);
};

/**
 * Clear highlighted tiles
 * @param state Current Redux State
 */
export const emptyUiHighlightedTilesReducer = (state: uiChessboardType) => {
  state.uiHighlightedTiles = [];
};

/**
 * Highlight tiles that are under attack
 * @param state Current Redux State
 * @param action PayloadAction with string[]
 */
export const updateUiAttackTilesReducer = (
  state: uiChessboardType,
  action: PayloadAction<string[]>
) => {
  state.uiAttackTiles = action.payload;
};

/**
 * Clear attack highlighted tiles
 * @param state Current Redux State
 */
export const emptyUiAttackTilesReducer = (state: uiChessboardType) => {
  state.uiHighlightedTiles = [];
};

/**
 * Highlight previous move tiles
 * @param state Current Redux State
 * @param action PayloadAction with uiPreviousMoveType
 */
export const updateUiPreviousMoveTileReducer = (
  state: uiChessboardType,
  action: PayloadAction<uiPreviousMoveType>
) => {
  state.uiPreviousMoveTile = action.payload;
};

/**
 * Clear Previous Move Highlighted Tiles
 * @param state Current Redux State
 */
export const removeUiPreviousMoveTileReducer = (state: uiChessboardType) => {
  state.uiPreviousMoveTile = { from: "", to: "" };
};
