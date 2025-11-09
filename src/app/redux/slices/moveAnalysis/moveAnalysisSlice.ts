import { MoveAnalysisStateType } from "@/app/types/StateTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  currentPieceValidMovesReducer,
  enemyMovesReducer,
  invalidMovesWhenInCheckReducer,
  piecesAttackingKingReducer,
  resetActiveMovesReducer,
  isKingInCheckReducer,
  validMovesWhenInCheckReducer,
} from "./moveAnalysisReducer";

const initialState: MoveAnalysisStateType = {
  currentPieceMoves: [],
  allEnemyMoves: [],
  piecesAttackingKing: [],
  validMovesWhenInCheck: [],
  invalidMovesWhenInCheck: [],
  isKingInCheck: false,
};

const moveAnalysisSlice = createSlice({
  name: "moveAnalysisMoves",
  initialState,
  reducers: {
    setCurrentPiecePotentialMoves: currentPieceValidMovesReducer,
    setEnemyMoves: enemyMovesReducer,
    setValidMovesWhenInCheck: validMovesWhenInCheckReducer,
    setInvalidMovesWhenInCheck: invalidMovesWhenInCheckReducer,
    setPiecesAttackingKing: piecesAttackingKingReducer,
    setIsKingInCheck: isKingInCheckReducer,
    resetActiveMoves: resetActiveMovesReducer,
  },
});

export const {
  setCurrentPiecePotentialMoves,
  setEnemyMoves,
  setValidMovesWhenInCheck,
  setInvalidMovesWhenInCheck,
  setPiecesAttackingKing,
  setIsKingInCheck,
  resetActiveMoves,
} = moveAnalysisSlice.actions;

export default moveAnalysisSlice.reducer;
