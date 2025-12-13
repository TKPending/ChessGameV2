import { RootState } from "@/app/redux/store";

export const selectChessboard = (state: RootState) =>
  state.chessboardState.chessboard;
export const selectPrevClickedTile = (state: RootState) =>
  state.chessboardState.previousTile;
export const selectBlackCastleRights = (state: RootState) =>
  state.chessboardState.blackCastling;
export const selectWhiteCastleRights = (state: RootState) =>
  state.chessboardState.whiteCastling;
export const selectPawnPromotion = (state: RootState) =>
  state.chessboardState.pawnPromotion;
