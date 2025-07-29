import { PayloadAction } from "@reduxjs/toolkit";
import { ActiveMovesType } from "@/app/types/ChessTypes";
import { EnemyAttackType } from "@/app/types/MoveTypes";

export const currentPieceValidMovesReducer = (
  state: ActiveMovesType,
  action: PayloadAction<number[][]>
) => {
  state.currentPiecePotentialMoves = action.payload;
};

export const enemyMovesReducer = (
  state: ActiveMovesType,
  action: PayloadAction<EnemyAttackType[]>
) => {
  state.enemyMoves = action.payload;
};

export const validCheckMovesReducer = (
  state: ActiveMovesType,
  action: PayloadAction<number[][]>
) => {
  state.validCheckMoves = action.payload;
};

export const inCheckPositionsReducer = (
  state: ActiveMovesType,
  action: PayloadAction<number[][]>
) => {
  state.inCheckPositions = action.payload;
};

export const piecesAttackingKingReeducer = (
  state: ActiveMovesType,
  action: PayloadAction<EnemyAttackType | null>
) => {
  if (action.payload) {
    state.pieceAttackingKing.push(action.payload);
    return;
  }

  state.pieceAttackingKing = [];
};
