import { PayloadAction } from "@reduxjs/toolkit";
import { TileColor, TileType } from "@/app/types/TileType";
import { PlayingTileType } from "@/app/types/PlayingTilesType";

export const currentTileReducer = (
  state: PlayingTileType,
  action: PayloadAction<TileType | null>
) => {
  state.currentTile = action.payload;
}

export const previousTileReducer = (
    state: PlayingTileType,
  action: PayloadAction<TileType | null>
  ) => {
    state.previousTile = state.currentTile;
}

export const changeInitialClickBackgroundReducer = (
  state: PlayingTileType
) => {
  if (state.currentTile?.pieceOnTile) {
    state.currentTile.isHighlighted = true;
  }
}

