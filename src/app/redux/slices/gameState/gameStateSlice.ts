import { ChessColors, TimeCatergories } from "@/app/types/ChessTypes";
import { GameStateType } from "@/app/types/StateTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  addPlayerNameReducer,
  capturedPiecesReducer,
  chessGamePlayingReducer,
  errorMessageReducer,
  errorTriggerReducer,
  kingInCheckmateReducer,
  resetGameReducer,
  resetGameStateReducer,
} from "./gameStateReducer";

const initialState: GameStateType = {
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
  isPlaying: false,
  currentTurn: ChessColors.white,
  isGameReset: false,
  isKingInCheckmate: false,
  isRedoAvailable: true,
  isRedoVisible: false,
  timeSettings: {
    timeCategory: TimeCatergories.infinite,
    minutes: 0,
  },
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
    setWinner: kingInCheckmateReducer,
    setResetTrigger: resetGameReducer,
    resetGameState: resetGameStateReducer,
  },
});

export const {
  setError,
  setErrorMessage,
  setPlayerName,
  setCapturedPiece,
  setIsGamePlaying,
  setWinner,
  setResetTrigger,
  resetGameState,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
