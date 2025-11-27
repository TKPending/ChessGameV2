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
export const errorTriggerReducer = (
  state: GameStateType,
  action: PayloadAction<boolean>
) => {
  state.error.isError = action.payload;
};

export const errorMessageReducer = (
  state: GameStateType,
  action: PayloadAction<string>
) => {
  state.error.message = action.payload;
};

// Player Management Reducers
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
export const capturedPiecesReducer = (
  state: GameStateType,
  action: PayloadAction<{ piece: PieceType; currentTurn: string }>
) => {
  const AP = action.payload;

  const turnIndex: number = AP.currentTurn == "White" ? 0 : 1;

  state.players[turnIndex].capturedPieces.push(AP.piece);
};

// Game State Reducer
export const chessGamePlayingReducer = (
  state: GameStateType,
  action: PayloadAction<boolean>
) => {
  state.isPlaying = action.payload;
};

export const setWinnerReducer = (
  state: GameStateType,
  action: PayloadAction<PlayerType>
) => {
  state.winner = action.payload;
  state.isPlaying = false;
};

export const setStalemateReducer = (state: GameStateType) => {
  state.stalemate = true;
};

export const updateCurrentTurnReducer = (state: GameStateType) => {
  const turn: string = state.currentTurn;
  const { white, black } = ChessColors;
  state.currentTurn = turn === white ? black : white;
};

// Redo Availability
export const updateRedoAvailabilityReducer = (
  state: GameStateType,
  action: PayloadAction<boolean>
) => {
  state.isRedoAvailable = action.payload;
  if (!action.payload) {
    state.isRedoVisible = false;
  }
};

export const updateRedoVisibilityReducer = (
  state: GameStateType,
  action: PayloadAction<boolean>
) => {
  state.isRedoVisible = action.payload;
};

// Time Settings
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

  // Player Time
  state.players[0].remainingTime = state.timeSettings.minutes;
  state.players[1].remainingTime = state.timeSettings.minutes;
};

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
export const setGameStateToPreviousReducer = (
  state: GameStateType,
  action: PayloadAction<GameStateType>
) => {
  state = action.payload;
};

// Reset Game
export const resetGameReducer = (state: GameStateType) => {
  state.isGameReset = !state.isGameReset;
};

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
  state.isPlaying = true;
  state.error = { isError: false, message: "" };
  state.isKingInCheckmate = false;
  state.isGameReset = false;
};

// Checkmate Reducers (End Game)
export const kingInCheckmateReducer = (
  state: GameStateType,
  action: PayloadAction<boolean>
) => {
  state.isKingInCheckmate = action.payload;
};
