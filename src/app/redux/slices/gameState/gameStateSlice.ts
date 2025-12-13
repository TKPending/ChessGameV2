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
    closeModal: closeModalReducer,
    endGameByTime: setWinnerByTimeReducer,
    endGameCheckmate: kingInCheckmateReducer,
    endGameStalemate: setStalemateReducer,
    endViewingMode: cancelViewModeReducer,
    incrementPlayerTime: incrementPlayerTimeReducer,
    setCurrentTurn: updateCurrentTurnReducer,
    setGameSettings: setGameSettingsReducer,
    setPlayerName: addPlayerNameReducer,
    setRedoAvailiability: updateRedoAvailabilityReducer,
    setRedoVisibility: updateRedoVisibilityReducer,
    startGame: chessGamePlayingReducer,
    updateCapturedPieces: capturedPiecesReducer,
    updatePlayerTime: setPlayerTimeReducer,
    undoGameState: setGameStateToPreviousReducer,

    setResetTrigger: resetGameReducer,
    clearGameState: resetGameStateReducer,
    setError: errorTriggerReducer,
    setErrorMessage: errorMessageReducer,
  },
});

export const {
  closeModal,
  endGameByTime,
  endGameCheckmate,
  endGameStalemate,
  endViewingMode,
  incrementPlayerTime,
  setCurrentTurn,
  setGameSettings,
  setPlayerName,
  setRedoAvailiability,
  setRedoVisibility,
  startGame,
  updateCapturedPieces,
  updatePlayerTime,
  undoGameState,
  setResetTrigger,
  clearGameState,
  setError,
  setErrorMessage,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
