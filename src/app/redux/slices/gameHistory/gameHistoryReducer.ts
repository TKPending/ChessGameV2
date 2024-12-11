import { PayloadAction } from "@reduxjs/toolkit";
import { GameHistoryType, MoveHistoryType } from "@/app/types/GameHistoryType";
import { TileType } from "@/app/types/TileType";

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

export const displayPreviousMovesReducer = (state: GameHistoryType) => {
  state.isPreviousMovesHidden = !state.isPreviousMovesHidden;
};
