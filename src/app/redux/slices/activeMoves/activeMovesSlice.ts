import { ActiveMovesType } from "@/app/types/ChessTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  currentPieceValidMovesReducer,
  enemyMovesReducer,
  inCheckPositionsReducer,
  piecesAttackingKingReeducer,
  resetActiveMovesReducer,
  validCheckMovesReducer,
} from "./activeMovesReducer";

const initialState: ActiveMovesType = {
  currentPiecePotentialMoves: [],
  enemyMoves: [],
  pieceAttackingKing: [],
  validCheckMoves: [],
  inCheckPositions: [],
};

const activeMovesSlice = createSlice({
  name: "activeMoves",
  initialState,
  reducers: {
    setCurrentPiecePotentialMoves: currentPieceValidMovesReducer,
    setEnemyMoves: enemyMovesReducer,
    setValidCheckMoves: validCheckMovesReducer,
    setInCheckPositions: inCheckPositionsReducer,
    setPiecesAttackingKing: piecesAttackingKingReeducer,
    resetActiveMoves: resetActiveMovesReducer,
  },
});

export const {
  setCurrentPiecePotentialMoves,
  setEnemyMoves,
  setValidCheckMoves,
  setInCheckPositions,
  setPiecesAttackingKing,
  resetActiveMoves,
} = activeMovesSlice.actions;

export default activeMovesSlice.reducer;
