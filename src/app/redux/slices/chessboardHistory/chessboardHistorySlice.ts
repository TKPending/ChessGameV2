import { ChessboardHistoryStateType } from "@/app/types/StateTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  isMovesHiddenReducer,
  pawnPromotionUpdateMoveReducer,
  removeRecentChessboardHistoryReducer,
  resetChessMovesReducer,
  updateChessboardHistoryReducer,
  updatePreviousGameStateReducer,
  updateMoveCounterReducer,
  updateMoveHistoryReducer,
  removePreviousGameStateReducer,
  updateSelectedMoveReducer,
} from "./chessboardHistoryReducer";

const initialState: ChessboardHistoryStateType = {
  currentMoveCount: 0,
  chessboardHistory: [],
  movesHistory: [],
  previousGameState: null,
  isMovesHidden: false,
};

const chessboardHistorySlice = createSlice({
  name: "chessMoves",
  initialState,
  reducers: {
    incrementMoveCounter: updateMoveCounterReducer,
    updateChessboardHistory: updateChessboardHistoryReducer,
    removeRecentChessboardHistory: removeRecentChessboardHistoryReducer,
    updateMoveHistory: updateMoveHistoryReducer,
    updatePreviousGameState: updatePreviousGameStateReducer,
    removePreviousGameState: removePreviousGameStateReducer,
    updateMovePawnPromotion: pawnPromotionUpdateMoveReducer,
    setIsMovesHidden: isMovesHiddenReducer,
    setSelectedMoveHistory: updateSelectedMoveReducer,
    resetChessMoves: resetChessMovesReducer,
  },
});

export const {
  incrementMoveCounter,
  updateChessboardHistory,
  removeRecentChessboardHistory,
  updatePreviousGameState,
  removePreviousGameState,
  updateMoveHistory,
  updateMovePawnPromotion,
  setIsMovesHidden,
  setSelectedMoveHistory,
  resetChessMoves,
} = chessboardHistorySlice.actions;

export default chessboardHistorySlice.reducer;
