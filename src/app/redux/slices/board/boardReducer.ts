import { PayloadAction } from "@reduxjs/toolkit";
import { BoardType } from "@/app/types/BoardType";

export const addPlayerNameReducer = (
  state: BoardType,
  action: PayloadAction<{playerName: string, playerNo: number}>
) => {
  const player = action.payload;

  state.players[action.payload.playerNo] = {
    ...state.players[player.playerNo],
    playerName: player.playerName
  }
};

export const chessGamePlayingReducer = (
  state: BoardType,
  action: PayloadAction<boolean>
) => {
  state.isPlaying = action.payload;
}

