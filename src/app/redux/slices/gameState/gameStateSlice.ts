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
  updateCurrentTurnReducer,
  updateRedoAvailabilityReducer,
  updateRedoVisibilityReducer,
  setGameSettingsReducer,
  setPlayerTimeReducer,
  incrementPlayerTimeReducer,
  setGameStateToPreviousReducer,
  setStalemateReducer,
  closeModalReducer,
  cancelViewModeReducer,
  setWinnerByTimeReducer,
} from "./gameStateReducer";

const initialState: GameStateType = {
  currentTurn: ChessColors.white,
  winner: null,
  stalemate: false,
  isKingInCheckmate: false,
  winByTime: false,
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
  isRedoAvailable: true,
  isRedoVisible: false,
  timeSettings: {
    timeCategory: TimeCatergories.infinite,
    minutes: 0,
    increment: "",
  },
  isViewMode: false,
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
    setKingInCheckmate: kingInCheckmateReducer,
    setStalemate: setStalemateReducer,
    setWinnerByTime: setWinnerByTimeReducer,
    setError: errorTriggerReducer,
    setErrorMessage: errorMessageReducer,
    setPlayerName: addPlayerNameReducer,
    setCapturedPiece: capturedPiecesReducer,
    setIsGamePlaying: chessGamePlayingReducer,
    setRedoAvailiability: updateRedoAvailabilityReducer,
    setRedoVisibility: updateRedoVisibilityReducer,
    setGameSettings: setGameSettingsReducer,
    setPlayerTime: setPlayerTimeReducer,
    incrementPlayerTime: incrementPlayerTimeReducer,
    setGameStateToPrevious: setGameStateToPreviousReducer,
    setResetTrigger: resetGameReducer,
    closeModal: closeModalReducer,
    endViewingMode: cancelViewModeReducer,
    resetGameState: resetGameStateReducer,
  },
});

export const {
  setCurrentTurn,
  setKingInCheckmate,
  setStalemate,
  setWinnerByTime,
  setError,
  setErrorMessage,
  setPlayerName,
  setCapturedPiece,
  setIsGamePlaying,
  setRedoAvailiability,
  setRedoVisibility,
  setGameSettings,
  setPlayerTime,
  incrementPlayerTime,
  setGameStateToPrevious,
  setResetTrigger,
  closeModal,
  endViewingMode,
  resetGameState,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
