import { RootState } from "@/app/redux/store";

export const selectCurrentMoveCount = (state: RootState) =>
  state.chessboardHistoryState.currentMoveCount;
export const selectChessboardHistory = (state: RootState) =>
  state.chessboardHistoryState.chessboardHistory;
export const selectMovesHistory = (state: RootState) =>
  state.chessboardHistoryState.movesHistory;
export const selectIsMovesHidden = (state: RootState) =>
  state.chessboardHistoryState.isMovesHidden;
