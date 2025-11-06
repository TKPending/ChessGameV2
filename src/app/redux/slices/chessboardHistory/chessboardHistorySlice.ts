import { ChessboardHistoryStateType } from "@/app/types/StateTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  isMovesHiddenReducer,
  pawnPromotionUpdateMoveReducer,
  resetChessMovesReducer,
  updateChessboardHistoryReducer,
  updateMoveCounterReducer,
  updateMoveHistoryReducer,
} from "./chessboardHistoryReducer";

const initialState: ChessboardHistoryStateType = {
  currentMoveCount: 0,
  chessboardHistory: [],
  movesHistory: [],
  isMovesHidden: false,
};

const chessboardHistorySlice = createSlice({
  name: "chessMoves",
  initialState,
  reducers: {
    incrementMoveCounter: updateMoveCounterReducer,
    updateChessboardHistory: updateChessboardHistoryReducer,
    updateMoveHistory: updateMoveHistoryReducer,
    updateMovePawnPromotion: pawnPromotionUpdateMoveReducer,
    setIsMovesHidden: isMovesHiddenReducer,
    resetChessMoves: resetChessMovesReducer,
  },
});

export const {
  incrementMoveCounter,
  updateChessboardHistory,
  updateMoveHistory,
  updateMovePawnPromotion,
  setIsMovesHidden,
  resetChessMoves,
} = chessboardHistorySlice.actions;

export default chessboardHistorySlice.reducer;
