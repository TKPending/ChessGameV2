import { HistoryStateType } from "@/app/types/StateTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  incrementMoveCountReducer,
  pawnPromotionMoveReducer,
  removeRecentBoardHistoryReducer,
  resetHistoryReducer,
  removePreviousGameStateReducer,
  setSelectedMoveReducer,
  updateBoardStateHistoryReducer,
  updatePreviousGameStateReducer,
  updateMoveHistoryReducer,
} from "./historyReducer";

const initialState: HistoryStateType = {
  count: 0,
  chessboardHistory: [],
  movesHistory: [],
  previousGameState: null,
};

const chessboardHistorySlice = createSlice({
  name: "chessMoves",
  initialState,
  reducers: {
    applyPawnPromotion: pawnPromotionMoveReducer,
    clearStoredState: removePreviousGameStateReducer,
    movePlayed: incrementMoveCountReducer,
    recordBoardState: updateBoardStateHistoryReducer,
    recordMove: updateMoveHistoryReducer,
    selectMove: setSelectedMoveReducer,
    storePreviousState: updatePreviousGameStateReducer,
    undoLastBoardState: removeRecentBoardHistoryReducer,
    resetHistory: resetHistoryReducer,
  },
});

export const {
  applyPawnPromotion,
  clearStoredState,
  movePlayed,
  recordBoardState,
  recordMove,
  selectMove,
  storePreviousState,
  undoLastBoardState,
  resetHistory,
} = chessboardHistorySlice.actions;

export default chessboardHistorySlice.reducer;
