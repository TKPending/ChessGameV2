import { ChessMoveType } from "@/app/types/ChessTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  isMovesHiddenReducer,
  pawnPromotionUpdateMoveReducer,
  resetChessMovesReducer,
  updateChessboardHistoryReducer,
  updateMoveCounterReducer,
  updateMoveHistoryReducer,
} from "./chessMovesReducer";

const initialState: ChessMoveType = {
  count: 0,
  chessboardHistory: [],
  moveHistory: [],
  isMovesHidden: false,
};

const chessMovesSlice = createSlice({
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
} = chessMovesSlice.actions;

export default chessMovesSlice.reducer;
