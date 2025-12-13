import { PayloadAction } from "@reduxjs/toolkit";
import { HistoryStateType, GameStateType } from "@/app/types/StateTypes";
import { TileType, MoveHistoryType, PieceName } from "@/app/types/ChessTypes";

// Increment move counter
/**
 * Increments the global move counter by one.
 * Used to track the total number of moves made in the game history.
 *
 * @param state Current Redux history state
 */
export const incrementMoveCountReducer = (state: HistoryStateType) => {
  state.count = state.count + 1;
};

// Selected Move
/**
 * Marks a specific move in the move history as selected.
 * All other moves are unselected.
 *
 * @param state Current Redux history state
 * @param action Payload containing the moveCount to select, or null to clear selection
 */
export const setSelectedMoveReducer = (
  state: HistoryStateType,
  action: PayloadAction<number | null>
) => {
  const selectedMoveCount = action.payload;

  state.movesHistory = state.movesHistory.map((move) => ({
    ...move,
    selected: move.moveCount === selectedMoveCount,
  }));
};

// Update Chessboard and Move History
/**
 * Appends a new chessboard snapshot to the board history.
 * Typically called after a successful move.
 *
 * @param state Current Redux history state
 * @param action Payload containing the updated chessboard state
 */
export const updateBoardStateHistoryReducer = (
  state: HistoryStateType,
  action: PayloadAction<TileType[][]>
) => {
  state.chessboardHistory.push(action.payload);
};

/**
 * Removes the most recent board and move history entry.
 * Decrements the move counter accordingly.
 *
 * @param state Current Redux history state
 */
export const removeRecentBoardHistoryReducer = (state: HistoryStateType) => {
  state.chessboardHistory.pop();
  state.movesHistory.pop();
  state.count -= 1;
};

/**
 * Appends a new move entry to the move history.
 *
 * @param state Current Redux history state
 * @param action Payload containing the move history object
 */
export const updateMoveHistoryReducer = (
  state: HistoryStateType,
  action: PayloadAction<MoveHistoryType>
) => {
  state.movesHistory.push(action.payload);
};

/**
 * Stores a snapshot of the previous game state.
 * Used for undo, redo, or view-mode operations.
 *
 * @param state Current Redux history state
 * @param action Payload containing the previous game state
 */
export const updatePreviousGameStateReducer = (
  state: HistoryStateType,
  action: PayloadAction<GameStateType>
) => {
  state.previousGameState = action.payload;
};

/**
 * Clears the stored previous game state.
 *
 * @param state Current Redux history state
 */
export const removePreviousGameStateReducer = (state: HistoryStateType) => {
  state.previousGameState = null;
};

// Update last move with Pawn Promotion Info
/**
 * Updates the most recent move with pawn promotion details.
 * Used when a pawn reaches the final rank and is promoted.
 *
 * @param state Current Redux history state
 * @param action Payload containing promotion status and promoted piece
 */
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
/**
 * Resets all stored move and board history.
 * Clears move count and previous game state.
 *
 * @param state Current Redux history state
 */
export const resetHistoryReducer = (state: HistoryStateType) => {
  state.count = 0;
  state.chessboardHistory = [];
  state.movesHistory = [];
  state.previousGameState = null;
};
