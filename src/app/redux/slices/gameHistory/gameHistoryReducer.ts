import { PayloadAction } from "@reduxjs/toolkit";
import { GameHistoryType, MoveHistoryType } from "@/app/types/GameHistoryType";
import { TileType } from "@/app/types/TileType";
import { PieceName } from "@/app/types/PieceType";

export const updateMoveCounterReducer = (state: GameHistoryType) => {
  state.count = state.count + 1;
};

export const updateChessboardHistoryReducer = (
  state: GameHistoryType,
  action: PayloadAction<TileType[][]>
) => {
  state.chessboardHistory.push(action.payload);
};

export const updateMoveHistoryReducer = (
  state: GameHistoryType,
  action: PayloadAction<MoveHistoryType>
) => {
  state.moveHistory.push(action.payload);
};

export const pawnPromotionUpdateMoveReducer = (
  state: GameHistoryType,
  action: PayloadAction<{ pawnPromotion: boolean; updatedPiece: PieceName }>
) => {
  const { pawnPromotion, updatedPiece } = action.payload;
  const recentMove: MoveHistoryType =
    state.moveHistory[state.moveHistory.length - 1];
  const updatedMove: MoveHistoryType = {
    ...recentMove,
    pawnPromotion,
    updatedPiece,
  };

  state.moveHistory[state.moveHistory.length - 1] = updatedMove;
};

export const displayPreviousMovesReducer = (state: GameHistoryType) => {
  state.isPreviousMovesHidden = !state.isPreviousMovesHidden;
};

export const resetGameHistoryReducer = (state: GameHistoryType) => {
  state.count = 1;
  state.chessboardHistory = [];
  state.moveHistory = [];
  state.isPreviousMovesHidden = true;
};
