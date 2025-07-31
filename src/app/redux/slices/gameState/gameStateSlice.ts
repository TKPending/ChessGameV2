import { ChessColors, GameStateType } from "@/app/types/ChessTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  addPlayerNameReducer,
  capturedPiecesReducer,
  chessGamePlayingReducer,
  errorMessageReducer,
  errorTriggerReducer,
} from "./gameStateReducer";

const initialState: GameStateType = {
  stateIndex: 0,
  players: [
    {
      no: 0,
      playerName: "",
      capturedPieces: [],
      team: ChessColors.white,
      remainingTime: "",
    },
    {
      no: 1,
      playerName: "",
      capturedPieces: [],
      team: ChessColors.black,
      remainingTime: "",
    },
  ],
  winner: undefined,
  isPlaying: false,
  error: {
    isError: false,
    message: "",
  },
};

const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setError: errorTriggerReducer,
    setErrorMessage: errorMessageReducer,
    setPlayerName: addPlayerNameReducer,
    setCapturedPiece: capturedPiecesReducer,
    setIsGamePlaying: chessGamePlayingReducer,
  },
});

export const {
  setError,
  setErrorMessage,
  setPlayerName,
  setCapturedPiece,
  setIsGamePlaying,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
