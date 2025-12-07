import { RootState } from "@/app/redux/store";

export const selectUiSelectedTile = (state: RootState) =>
  state.uiChessboardState.uiSelectedTile;
export const selectUiHighlightedTiles = (state: RootState) =>
  state.uiChessboardState.uiHighlightedTiles;
export const selectUiAttackTiles = (state: RootState) =>
  state.uiChessboardState.uiAttackTiles;
export const selectUiPreviousMoveTile = (state: RootState) =>
  state.uiChessboardState.uiPreviousMoveTile;
