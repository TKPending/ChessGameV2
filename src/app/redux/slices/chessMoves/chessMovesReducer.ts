import { PayloadAction } from "@reduxjs/toolkit";
import {
  ChessMoveType,
  TileType,
  MoveHistoryType,
  PieceName,
} from "@/app/types/ChessTypes";

export const updateMoveCounterReducer = (state: ChessMoveType) => {
  state.count = state.count + 1;
};

export const updateChessboardHistoryReducer = (
  state: ChessMoveType,
  action: PayloadAction<TileType[][]>
) => {
  state.chessboardHistory.push(action.payload);
};

export const updateMoveHistoryReducer = (
  state: ChessMoveType,
  action: PayloadAction<MoveHistoryType>
) => {
  state.moveHistory.push(action.payload);
};

export const pawnPromotionUpdateMoveReducer = (
  state: ChessMoveType,
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

export const isMovesHiddenReducer = (state: ChessMoveType) => {
  state.isMovesHidden = !state.isMovesHidden;
};

export const resetChessMovesReducer = (state: ChessMoveType) => {
  state.count = 0;
  state.chessboardHistory = [];
  state.moveHistory = [];
  state.isMovesHidden = false;
};
