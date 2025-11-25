import { RootState } from "@/app/redux/store";

export const selectGameState = (state: RootState) => state.gameState;
export const selectPlayers = (state: RootState) => state.gameState.players;
export const selectIsPlaying = (state: RootState) => state.gameState.isPlaying;
export const selectCurrentTurn = (state: RootState) =>
  state.gameState.currentTurn;
export const selectIsGameReset = (state: RootState) =>
  state.gameState.isGameReset;
export const selectIsKingInCheckmate = (state: RootState) =>
  state.gameState.isKingInCheckmate;
export const selectWinner = (state: RootState) => state.gameState.winner;
export const selectIsRedoAvaialble = (state: RootState) =>
  state.gameState.isRedoAvailable;
export const selectIsRedoVisible = (state: RootState) =>
  state.gameState.isRedoVisible;
export const selectTimeSettings = (state: RootState) =>
  state.gameState.timeSettings;
export const selectError = (state: RootState) => state.gameState.error;
