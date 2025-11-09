import { GameStateType } from "@/app/types/StateTypes";
import { ChessColors, PieceType, PlayerType } from "@/app/types/ChessTypes";
import { PayloadAction } from "@reduxjs/toolkit";

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
