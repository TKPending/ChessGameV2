import { PayloadAction } from "@reduxjs/toolkit";
import { MoveAnalysisStateType } from "@/app/types/StateTypes";
import { EnemyAttackType } from "@/app/types/MoveTypes";

// Track all valid moves for current piece
export const currentPieceValidMovesReducer = (
  state: MoveAnalysisStateType,
  action: PayloadAction<number[][]>
) => {
  state.currentPieceMoves = action.payload;
};

// Track all potential enemy moves
export const enemyMovesReducer = (
  state: MoveAnalysisStateType,
  action: PayloadAction<EnemyAttackType[]>
) => {
  state.allEnemyMoves = action.payload;
};

// Track all valid moves when in check
export const validMovesWhenInCheckReducer = (
  state: MoveAnalysisStateType,
  action: PayloadAction<number[][]>
) => {
  state.validMovesWhenInCheck = action.payload;
};

// Track all invalid moves when in check
export const invalidMovesWhenInCheckReducer = (
  state: MoveAnalysisStateType,
  action: PayloadAction<number[][]>
) => {
  state.invalidMovesWhenInCheck = action.payload;
};

// Track pieces attacking the king
export const piecesAttackingKingReducer = (
  state: MoveAnalysisStateType,
  action: PayloadAction<EnemyAttackType | null>
) => {
  if (action.payload) {
    state.piecesAttackingKing.push(action.payload);
    state.isKingInCheck = true;
    return;
  }

  state.piecesAttackingKing = [];
};

// Track if King is in check
export const isKingInCheckReducer = (
  state: MoveAnalysisStateType,
  action: PayloadAction<boolean>
) => {
  state.isKingInCheck = action.payload;
};

// Reset State
export const resetActiveMovesReducer = (state: MoveAnalysisStateType) => {
  state.currentPieceMoves = [];
  state.allEnemyMoves = [];
  state.piecesAttackingKing = [];
  state.validMovesWhenInCheck = [];
  state.invalidMovesWhenInCheck = [];
  state.isKingInCheck = false;
};
