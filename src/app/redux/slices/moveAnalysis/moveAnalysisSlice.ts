import { MoveAnalysisStateType } from "@/app/types/StateTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  isKingInCheckReducer,
  updateCurrentTeamMovesReducer,
  updateEnemyTeamMovesReducer,
  resetActiveMovesReducer,
} from "./moveAnalysisReducer";

const initialState: MoveAnalysisStateType = {
  isKingInCheck: false,
  currentTeamMoves: [],
  enemyTeamMoves: [],
};

const moveAnalysisSlice = createSlice({
  name: "moveAnalysisMoves",
  initialState,
  reducers: {
    setIsKingInCheck: isKingInCheckReducer,
    setCurrentTeamMoves: updateCurrentTeamMovesReducer,
    setEnemyTeamMoves: updateEnemyTeamMovesReducer,
    resetActiveMoves: resetActiveMovesReducer,
  },
});

export const {
  setIsKingInCheck,
  setCurrentTeamMoves,
  setEnemyTeamMoves,
  resetActiveMoves,
} = moveAnalysisSlice.actions;

export default moveAnalysisSlice.reducer;
