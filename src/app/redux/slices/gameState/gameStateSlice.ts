import { ChessColors, TimeCatergories } from "@/app/types/ChessTypes";
import { GameStateType } from "@/app/types/StateTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  addPlayerNameReducer,
  setWinnerReducer,
  capturedPiecesReducer,
  chessGamePlayingReducer,
  errorMessageReducer,
  errorTriggerReducer,
  kingInCheckmateReducer,
  resetGameReducer,
  resetGameStateReducer,
  updateCurrentTurnReducer,
  updateRedoAvailabilityReducer,
  updateRedoVisibilityReducer,
  setGameSettingsReducer,
  updatePlayerTimeReducer,
} from "./gameStateReducer";

const initialState: GameStateType = {
  currentTurn: ChessColors.white,
  winner: null,
  players: [
    {
      no: 0,
      playerName: "",
      capturedPieces: [],
      team: ChessColors.white,
      remainingTime: 0,
    },
    {
      no: 1,
      playerName: "",
      capturedPieces: [],
      team: ChessColors.black,
      remainingTime: 0,
    },
  ],
  isPlaying: false,
  isGameReset: false,
  isKingInCheckmate: false,
  isRedoAvailable: true,
  isRedoVisible: false,
  timeSettings: {
    timeCategory: TimeCatergories.infinite,
    minutes: 0,
    increment: "",
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
    setCurrentTurn: updateCurrentTurnReducer,
    setWinner: setWinnerReducer,
    setError: errorTriggerReducer,
    setErrorMessage: errorMessageReducer,
    setPlayerName: addPlayerNameReducer,
    setCapturedPiece: capturedPiecesReducer,
    setIsGamePlaying: chessGamePlayingReducer,
    setKingInCheckmate: kingInCheckmateReducer,
    setRedoAvailiability: updateRedoAvailabilityReducer,
    setRedoVisibility: updateRedoVisibilityReducer,
    setGameSettings: setGameSettingsReducer,
    setPlayerTime: updatePlayerTimeReducer,
    setResetTrigger: resetGameReducer,
    resetGameState: resetGameStateReducer,
  },
});

export const {
  setCurrentTurn,
  setWinner,
  setError,
  setErrorMessage,
  setPlayerName,
  setCapturedPiece,
  setIsGamePlaying,
  setKingInCheckmate,
  setRedoAvailiability,
  setRedoVisibility,
  setGameSettings,
  setPlayerTime,
  setResetTrigger,
  resetGameState,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
