import { createSlice } from "@reduxjs/toolkit";
import {
  displayPreviousMovesReducer,
  pawnPromotionUpdateMoveReducer,
  updateChessboardHistoryReducer,
  updateMoveCounterReducer,
  updateMoveHistoryReducer,
} from "./gameHistoryReducer";
import { GameHistoryType } from "@/app/types/GameHistoryType";

const initialState: GameHistoryType = {
  count: 1,
  chessboardHistory: [],
  moveHistory: [],
  isPreviousMovesHidden: true,
};

const gameHistorySlice = createSlice({
  name: "gameHistory",
  initialState,
  reducers: {
    setMoveCounter: updateMoveCounterReducer,
    setChessboardHistory: updateChessboardHistoryReducer,
    setMoveHistory: updateMoveHistoryReducer,
    setPawnPromotionMoveHistory: pawnPromotionUpdateMoveReducer,
    setMoveHistoryVisibility: displayPreviousMovesReducer,
  },
});

export const {
  setMoveCounter,
  setChessboardHistory,
  setMoveHistory,
  setMoveHistoryVisibility,
  setPawnPromotionMoveHistory,
} = gameHistorySlice.actions;

export default gameHistorySlice.reducer;
