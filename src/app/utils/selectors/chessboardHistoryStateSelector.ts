import { RootState } from "@/app/redux/store";

export const selectCurrentMoveCount = (state: RootState) =>
  state.historyState.count;
export const selectChessboardHistory = (state: RootState) =>
  state.historyState.chessboardHistory;
export const selectMovesHistory = (state: RootState) =>
  state.historyState.movesHistory;
export const selectPreviousGameState = (state: RootState) =>
  state.historyState.previousGameState;
