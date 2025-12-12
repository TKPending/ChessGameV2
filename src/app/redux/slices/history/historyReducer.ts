import { PayloadAction } from "@reduxjs/toolkit";
import { HistoryStateType, GameStateType } from "@/app/types/StateTypes";
import { TileType, MoveHistoryType, PieceName } from "@/app/types/ChessTypes";

// Increment move counter
export const incrementMoveCountReducer = (state: HistoryStateType) => {
  state.count = state.count + 1;
};

// Selected Move
export const setSelectedMoveReducer = (
  state: HistoryStateType,
  action: PayloadAction<number | null> // moveCount
) => {
  const selectedMoveCount = action.payload;

  state.movesHistory = state.movesHistory.map((move) => ({
    ...move,
    selected: move.moveCount === selectedMoveCount,
  }));
};

// Update Chessboard and Move History
export const updateBoardStateHistoryReducer = (
  state: HistoryStateType,
  action: PayloadAction<TileType[][]>
) => {
  state.chessboardHistory.push(action.payload);
};

export const removeRecentBoardHistoryReducer = (state: HistoryStateType) => {
  state.chessboardHistory.pop();
  state.movesHistory.pop();
  state.count -= 1;
};

export const updateMoveHistoryReducer = (
  state: HistoryStateType,
  action: PayloadAction<MoveHistoryType>
) => {
  state.movesHistory.push(action.payload);
};

export const updatePreviousGameStateReducer = (
  state: HistoryStateType,
  action: PayloadAction<GameStateType>
) => {
  state.previousGameState = action.payload;
};

export const removePreviousGameStateReducer = (state: HistoryStateType) => {
  state.previousGameState = null;
};

// Update last move with Pawn Promotion Info
export const pawnPromotionMoveReducer = (
  state: HistoryStateType,
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

// Reset Chess Move History
export const resetHistoryReducer = (state: HistoryStateType) => {
  state.count = 0;
  state.chessboardHistory = [];
  state.movesHistory = [];
  state.previousGameState = null;
};
