import { RootState } from "@/app/redux/store";

export const selectIsKingInCheck = (state: RootState) =>
  state.moveAnalysisState.isKingInCheck;
export const selectCurrentTeamMoves = (state: RootState) =>
  state.moveAnalysisState.currentTeamMoves;
export const selectSelectedPieceMoves = (state: RootState) =>
  state.moveAnalysisState.selectedPieceMoves;
export const selectEnemyTeamMoves = (state: RootState) =>
  state.moveAnalysisState.currentTeamMoves;
