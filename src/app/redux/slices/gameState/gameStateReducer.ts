import { PayloadAction } from "@reduxjs/toolkit";
import {
  convertTimeCategory,
  convertTimeToInt,
  incrementTime,
} from "@/app/utils/convertTimeSettings";
import { GameStateType } from "@/app/types/StateTypes";
import {
  ChessColors,
  PieceType,
  PlayerType,
  TimeCatergories,
} from "@/app/types/ChessTypes";

// Error Handling Reducers
/**
 * Sets the global error flag.
 *
 * @param state Current Redux game state
 * @param action Payload indicating whether an error is active
 */
export const errorTriggerReducer = (
  state: GameStateType,
  action: PayloadAction<boolean>
) => {
  state.error.isError = action.payload;
};

/**
 * Updates the global error message.
 *
 * @param state Current Redux game state
 * @param action Payload containing the error message
 */
export const errorMessageReducer = (
  state: GameStateType,
  action: PayloadAction<string>
) => {
  state.error.message = action.payload;
};

// Player Management Reducers
/**
 * Updates a player's name based on player index.
 *
 * @param state Current Redux game state
 * @param action Payload containing the player name and player index
 */
export const addPlayerNameReducer = (
  state: GameStateType,
  action: PayloadAction<{ playerName: string; playerNo: number }>
) => {
  const player = action.payload;

  state.players[action.payload.playerNo] = {
    ...state.players[player.playerNo],
    playerName: player.playerName,
  };
};

// Capture Piece Reducer
/**
 * Adds a captured piece to the opposing player's captured pieces list.
 *
 * @param state Current Redux game state
 * @param action Payload containing the captured piece and current turn
 */
export const capturedPiecesReducer = (
  state: GameStateType,
  action: PayloadAction<{ piece: PieceType; currentTurn: string }>
) => {
  const AP = action.payload;

  const turnIndex: number = AP.currentTurn == "White" ? 0 : 1;

  state.players[turnIndex].capturedPieces.push(AP.piece);
};

// Game State Reducer
/**
 * Updates whether the chess game is currently active.
 *
 * @param state Current Redux game state
 * @param action Payload indicating play state
 */
export const chessGamePlayingReducer = (
  state: GameStateType,
  action: PayloadAction<boolean>
) => {
  state.isPlaying = action.payload;
};

// End Game Options
/**
 * Sets the game to a checkmate state and determines the winner.
 *
 * @param state Current Redux game state
 * @param action Payload indicating checkmate status
 */
export const kingInCheckmateReducer = (
  state: GameStateType,
  action: PayloadAction<boolean>
) => {
  state.isKingInCheckmate = action.payload;
  state.winner =
    state.currentTurn === ChessColors.white
      ? state.players[1]
      : state.players[0];
};

/**
 * Marks the game as a stalemate.
 *
 * @param state Current Redux game state
 */
export const setStalemateReducer = (state: GameStateType) => {
  state.stalemate = true;
};

/**
 * Ends the game due to time expiration and determines the winner.
 *
 * @param state Current Redux game state
 */
export const setWinnerByTimeReducer = (state: GameStateType) => {
  state.winByTime = true;
  state.winner =
    state.currentTurn === ChessColors.white
      ? state.players[1]
      : state.players[0];
};

// Update Current Turn
/**
 * Toggles the current turn between white and black.
 *
 * @param state Current Redux game state
 */
export const updateCurrentTurnReducer = (state: GameStateType) => {
  const turn: string = state.currentTurn;
  const { white, black } = ChessColors;
  state.currentTurn = turn === white ? black : white;
};

// Redo Availability
/**
 * Sets whether redo functionality is available.
 * Automatically hides redo controls if disabled.
 *
 * @param state Current Redux game state
 * @param action Payload indicating redo availability
 */
export const updateRedoAvailabilityReducer = (
  state: GameStateType,
  action: PayloadAction<boolean>
) => {
  state.isRedoAvailable = action.payload;
  if (!action.payload) {
    state.isRedoVisible = false;
  }
};

/**
 * Controls the visibility of redo UI elements.
 *
 * @param state Current Redux game state
 * @param action Payload indicating redo visibility
 */
export const updateRedoVisibilityReducer = (
  state: GameStateType,
  action: PayloadAction<boolean>
) => {
  state.isRedoVisible = action.payload;
};

// Time Settings
/**
 * Updates the game time settings and initializes player clocks.
 *
 * @param state Current Redux game state
 * @param action Payload containing time category, duration, and increment
 */
export const setGameSettingsReducer = (
  state: GameStateType,
  action: PayloadAction<{
    category: string;
    duration: string;
    increment: string;
  }>
) => {
  state.timeSettings = {
    timeCategory: convertTimeCategory(action.payload.category),
    minutes: convertTimeToInt(action.payload.duration),
    increment: action.payload.increment,
  };

  state.players[0].remainingTime = state.timeSettings.minutes;
  state.players[1].remainingTime = state.timeSettings.minutes;
};

/**
 * Updates the remaining time for a specific player.
 *
 * @param state Current Redux game state
 * @param action Payload containing the target player and new time value
 */
export const setPlayerTimeReducer = (
  state: GameStateType,
  action: PayloadAction<{ currentPlayer: PlayerType; newTime: number }>
) => {
  const { currentPlayer, newTime } = action.payload;

  const target = state.players.find(
    (p) => p.playerName === currentPlayer.playerName
  );

  if (!target) return;

  target.remainingTime = newTime;
};

/**
 * Increments the current player's remaining time based on increment settings.
 *
 * @param state Current Redux game state
 */
export const incrementPlayerTimeReducer = (state: GameStateType) => {
  const increment = state.timeSettings.increment;
  if (increment === TimeCatergories.infinite) {
    return;
  }

  const currentPlayer: PlayerType =
    state.players[state.currentTurn === ChessColors.white ? 0 : 1];
  currentPlayer.remainingTime = incrementTime(
    currentPlayer.remainingTime,
    increment
  );
};

// Previous Game State
/**
 * Replaces the current game state with a previously saved state.
 *
 * @param state Current Redux game state
 * @param action Payload containing the previous game state
 */
export const setGameStateToPreviousReducer = (
  state: GameStateType,
  action: PayloadAction<GameStateType>
) => {
  state = action.payload;
};

// View Mode
/**
 * Exits view-only mode and returns to interactive play.
 *
 * @param state Current Redux game state
 */
export const cancelViewModeReducer = (state: GameStateType) => {
  state.isViewMode = false;
};

/**
 * Closes endgame modals and transitions the game into view mode.
 *
 * @param state Current Redux game state
 */
export const closeModalReducer = (state: GameStateType) => {
  state.stalemate = false;
  state.isKingInCheckmate = false;
  state.winByTime = false;
  state.isPlaying = false;
  state.isViewMode = true;
};

// Reset Game
/**
 * Toggles the game reset flag to trigger a full reset cycle.
 *
 * @param state Current Redux game state
 */
export const resetGameReducer = (state: GameStateType) => {
  state.isGameReset = !state.isGameReset;
};

/**
 * Fully resets the game state and optionally swaps player colors.
 *
 * @param state Current Redux game state
 * @param action Payload indicating whether player colors should be swapped
 */
export const resetGameStateReducer = (
  state: GameStateType,
  action: PayloadAction<{ swapColors: boolean }>
) => {
  const time = state.timeSettings.minutes;
  const swapColors = action.payload;

  if (swapColors) {
    state.players = [
      {
        no: 0,
        playerName: state.players[1].playerName,
        capturedPieces: [],
        team: ChessColors.white,
        remainingTime: time,
      },
      {
        no: 1,
        playerName: state.players[0].playerName,
        capturedPieces: [],
        team: ChessColors.black,
        remainingTime: time,
      },
    ];
    state.currentTurn = ChessColors.white;
  } else {
    state.players = state.players.map((p, idx) => ({
      ...p,
      capturedPieces: [],
      remainingTime: time,
      team: idx === 0 ? ChessColors.white : ChessColors.black,
    }));
    state.currentTurn = ChessColors.white;
  }

  state.winner = null;
  state.stalemate = false;
  state.isKingInCheckmate = false;
  state.winByTime = false;
  state.isPlaying = true;
  state.error = { isError: false, message: "" };
  state.isGameReset = false;
  state.isViewMode = false;
};
