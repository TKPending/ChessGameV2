import { PayloadAction } from "@reduxjs/toolkit";
import { MoveAnalysisStateType } from "@/app/types/StateTypes";
import { EnemyAttackType } from "@/app/types/MoveTypes";

export const updateCurrentTeamMovesReducer = (
  state: MoveAnalysisStateType,
  action: PayloadAction<EnemyAttackType[]>
) => {
  state.currentTeamMoves = action.payload;
};

export const updateEnemyTeamMovesReducer = (
  state: MoveAnalysisStateType,
  action: PayloadAction<EnemyAttackType[]>
) => {
  state.enemyTeamMoves = action.payload;
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
  state.isKingInCheck = false;
  state.currentTeamMoves = [];
  state.enemyTeamMoves = [];
};
