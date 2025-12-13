import { PayloadAction } from "@reduxjs/toolkit";
import { MoveAnalysisStateType } from "@/app/types/StateTypes";
import { EnemyAttackType } from "@/app/types/MoveTypes";

/**
 * Store current team moves in redux state
 * @param state Current redux state
 * @param action PayloadAction with current team moves
 */
export const updateCurrentTeamMovesReducer = (
  state: MoveAnalysisStateType,
  action: PayloadAction<EnemyAttackType[]>
) => {
  state.currentTeamMoves = action.payload;
};

/**
 * Store selected piece moves in redux state
 * @param state Current Redux State
 * @param action PayloadAction with selected piece moves
 */
export const updateSelectedPieceMovesReducer = (
  state: MoveAnalysisStateType,
  action: PayloadAction<number[][]>
) => {
  state.selectedPieceMoves = action.payload;
};

/**
 * Clear Move Analysis State
 * @param state Current Redux State
 */
export const clearMoveStateReducer = (state: MoveAnalysisStateType) => {
  state.currentTeamMoves = [];
  state.selectedPieceMoves = [];
};
