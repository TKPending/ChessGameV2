import { RootState } from "@/app/redux/store";

export const selectCurrentPieceMoves = (state: RootState) =>
  state.moveAnalysisState.currentPieceMoves;
export const selectAllEnemyMoves = (state: RootState) =>
  state.moveAnalysisState.allEnemyMoves;
export const selectPiecesAttackingKing = (state: RootState) =>
  state.moveAnalysisState.piecesAttackingKing;
export const selectValidMovesWhenInCheck = (state: RootState) =>
  state.moveAnalysisState.validMovesWhenInCheck;
export const selectInvalidMovesWhenInCheck = (state: RootState) =>
  state.moveAnalysisState.invalidMovesWhenInCheck;
export const selectIsKingInCheck = (state: RootState) =>
  state.moveAnalysisState.isKingInCheck;
