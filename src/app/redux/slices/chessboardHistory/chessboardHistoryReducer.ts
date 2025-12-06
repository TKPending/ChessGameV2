import { PayloadAction } from "@reduxjs/toolkit";
import {
  ChessboardHistoryStateType,
  GameStateType,
} from "@/app/types/StateTypes";
import { TileType, MoveHistoryType, PieceName } from "@/app/types/ChessTypes";

// Increment move counter
export const updateMoveCounterReducer = (state: ChessboardHistoryStateType) => {
  state.currentMoveCount = state.currentMoveCount + 1;
};

// Update Chessboard and Move History
export const updateChessboardHistoryReducer = (
  state: ChessboardHistoryStateType,
  action: PayloadAction<TileType[][]>
) => {
  state.chessboardHistory.push(action.payload);
};

export const removeRecentChessboardHistoryReducer = (
  state: ChessboardHistoryStateType
) => {
  state.chessboardHistory.pop();
  state.currentMoveCount -= 1;
};

export const updateMoveHistoryReducer = (
  state: ChessboardHistoryStateType,
  action: PayloadAction<MoveHistoryType>
) => {
  state.movesHistory.push(action.payload);
};

export const updatePreviousGameStateReducer = (
  state: ChessboardHistoryStateType,
  action: PayloadAction<GameStateType>
) => {
  state.previousGameState = action.payload;
};

export const removePreviousGameStateReducer = (
  state: ChessboardHistoryStateType
) => {
  state.previousGameState = null;
};

// Update last move with Pawn Promotion Info
export const pawnPromotionUpdateMoveReducer = (
  state: ChessboardHistoryStateType,
  action: PayloadAction<{ pawnPromotion: boolean; updatedPiece: PieceName }>
) => {
  const { pawnPromotion, updatedPiece } = action.payload;
  const recentMove: MoveHistoryType =
    state.movesHistory[state.movesHistory.length - 1];
  const updatedMove: MoveHistoryType = {
    ...recentMove,
    pawnPromotion,
    updatedPiece,
  };

  state.movesHistory[state.movesHistory.length - 1] = updatedMove;
};

// Display Move History
export const isMovesHiddenReducer = (state: ChessboardHistoryStateType) => {
  state.isMovesHidden = !state.isMovesHidden;
};

// Reset Chess Move History
export const resetChessMovesReducer = (state: ChessboardHistoryStateType) => {
  state.currentMoveCount = 0;
  state.chessboardHistory = [];
  state.movesHistory = [];
  state.isMovesHidden = false;
};
