import { RootState } from "@/app/redux/store";

export const selectCurrentTeamMoves = (state: RootState) =>
  state.moveAnalysisState.currentTeamMoves;
export const selectSelectedPieceMoves = (state: RootState) =>
  state.moveAnalysisState.selectedPieceMoves;
