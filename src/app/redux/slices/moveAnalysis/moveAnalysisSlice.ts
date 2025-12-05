import { MoveAnalysisStateType } from "@/app/types/StateTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  isKingInCheckReducer,
  updateCurrentTeamMovesReducer,
  updateEnemyTeamMovesReducer,
  resetActiveMovesReducer,
  updateSelectedPieceMovesReducer,
} from "./moveAnalysisReducer";

const initialState: MoveAnalysisStateType = {
  isKingInCheck: false,
  currentTeamMoves: [],
  enemyTeamMoves: [],
  selectedPieceMoves: [],
};

const moveAnalysisSlice = createSlice({
  name: "moveAnalysisMoves",
  initialState,
  reducers: {
    setIsKingInCheck: isKingInCheckReducer,
    setCurrentTeamMoves: updateCurrentTeamMovesReducer,
    setEnemyTeamMoves: updateEnemyTeamMovesReducer,
    setSelectedPieceMoves: updateSelectedPieceMovesReducer,
    resetActiveMoves: resetActiveMovesReducer,
  },
});

export const {
  setIsKingInCheck,
  setCurrentTeamMoves,
  setEnemyTeamMoves,
  setSelectedPieceMoves,
  resetActiveMoves,
} = moveAnalysisSlice.actions;

export default moveAnalysisSlice.reducer;
