import { ActiveMovesType } from "@/app/types/ChessTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  currentPieceValidMovesReducer,
  enemyMovesReducer,
  inCheckPositionsReducer,
  piecesAttackingKingReeducer,
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
  },
});

export const {
  setCurrentPiecePotentialMoves,
  setEnemyMoves,
  setValidCheckMoves,
  setInCheckPositions,
  setPiecesAttackingKing,
} = activeMovesSlice.actions;

export default activeMovesSlice.reducer;
