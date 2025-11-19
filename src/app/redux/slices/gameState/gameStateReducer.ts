import { GameStateType } from "@/app/types/StateTypes";
import {
  ChessColors,
  PieceType,
  PlayerType,
  TimeCatergories,
} from "@/app/types/ChessTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  convertTimeCategory,
  convertTimeToInt,
  showReadableTime,
} from "@/app/utils/convertTimeSettings";

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

export const updateRedoVisibilityReducer = (state: GameStateType) => {
  state.isRedoVisible = !state.isRedoVisible;
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
  // Time Settings
  state.timeSettings = {
    timeCategory: convertTimeCategory(action.payload.category),
    minutes: convertTimeToInt(action.payload.duration),
  };

  // Player Time
  state.players[0].remainingTime = state.timeSettings.minutes;
  state.players[1].remainingTime = state.timeSettings.minutes;
};

export const updatePlayerTimeReducer = (
  state: GameStateType,
  action: PayloadAction<number>
) => {
  state.players.map((player: PlayerType) => {
    if (player.team === state.currentTurn) {
      player.remainingTime = action.payload;
    }
  });
};

// Reset Game
export const resetGameReducer = (state: GameStateType) => {
  state.isGameReset = !state.isGameReset;
};

export const resetGameStateReducer = (state: GameStateType) => {
  state.players = [
    {
      no: 0,
      playerName: state.players[1].playerName,
      capturedPieces: [],
      team: ChessColors.white,
      remainingTime: 0,
    },
    {
      no: 1,
      playerName: state.players[0].playerName,
      capturedPieces: [],
      team: ChessColors.black,
      remainingTime: 0,
    },
  ];
  state.isPlaying = true;
  state.error = {
    isError: false,
    message: "",
  };
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
