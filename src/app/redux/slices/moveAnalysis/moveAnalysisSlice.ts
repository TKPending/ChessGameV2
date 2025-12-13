import { MoveAnalysisStateType } from "@/app/types/StateTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  updateCurrentTeamMovesReducer,
  clearMoveStateReducer,
  updateSelectedPieceMovesReducer,
} from "./moveAnalysisReducer";

const initialState: MoveAnalysisStateType = {
  currentTeamMoves: [],
  selectedPieceMoves: [],
};

const moveAnalysisSlice = createSlice({
  name: "moveAnalysisMoves",
  initialState,
  reducers: {
    setCurrentTeamMoves: updateCurrentTeamMovesReducer,
    setSelectedPieceMoves: updateSelectedPieceMovesReducer,
    clearMoveState: clearMoveStateReducer,
  },
});

export const { setCurrentTeamMoves, setSelectedPieceMoves, clearMoveState } =
  moveAnalysisSlice.actions;

export default moveAnalysisSlice.reducer;
