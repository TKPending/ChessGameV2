import {
  ChessColors,
  GameStateType,
  PieceType,
  PlayerType,
} from "@/app/types/ChessTypes";
import { PayloadAction } from "@reduxjs/toolkit";

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

export const winnerReducer = (
  state: GameStateType,
  action: PayloadAction<PlayerType>
) => {
  state.winner = action.payload;
};

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

export const capturedPiecesReducer = (
  state: GameStateType,
  action: PayloadAction<{ piece: PieceType; currentTurn: string }>
) => {
  const AP = action.payload;

  const turnIndex: number = AP.currentTurn == "White" ? 0 : 1;

  state.players[turnIndex].capturedPieces.push(AP.piece);
};

export const chessGamePlayingReducer = (
  state: GameStateType,
  action: PayloadAction<boolean>
) => {
  state.isPlaying = action.payload;
};

export const resetGameReducer = (state: GameStateType) => {
  state.isReset = !state.isReset;
};

export const resetGameStateReducer = (state: GameStateType) => {
  state.stateIndex = 0;
  state.players = [
    {
      no: 0,
      playerName: state.players[1].playerName,
      capturedPieces: [],
      team: ChessColors.white,
      remainingTime: "",
    },
    {
      no: 1,
      playerName: state.players[0].playerName,
      capturedPieces: [],
      team: ChessColors.black,
      remainingTime: "",
    },
  ];
  state.winner = undefined;
  state.isPlaying = true;
  state.error = {
    isError: false,
    message: "",
  };
  state.isReset = false;
};
