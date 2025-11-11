import { RootState } from "@/app/redux/store";

export const selectChessboard = (state: RootState) =>
  state.chessboardState.chessboard;
export const selectClickedTile = (state: RootState) =>
  state.chessboardState.clickedTile;
export const selectPrevClickedTile = (state: RootState) =>
  state.chessboardState.prevClickedTile;
export const selectCastling = (state: RootState) =>
  state.chessboardState.castling;
export const selectPawnPromotion = (state: RootState) =>
  state.chessboardState.pawnPromotion;
