import { PayloadAction } from "@reduxjs/toolkit";
import { BoardType } from "@/app/types/BoardType";
import { TileType } from "@/app/types/TileType";
import { PieceType } from "@/app/types/PieceType";
import { MoveType } from "@/app/types/MoveType";

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

export const chessboardReducer = (
  state: BoardType,
  action: PayloadAction<TileType[][]>
) => {
  state.currentBoardState = action.payload;
};

export const chessboardHistoryReducer = (
  state: BoardType,
  action: PayloadAction<TileType[][]>
) => {
  state.previousBoardStates.push(action.payload);
};

export const updateTileReducer = (
  state: BoardType,
  action: PayloadAction<{ tile: TileType }>
) => {
  const updatedTile = action.payload.tile;
  const rowIndex = state.currentBoardState.findIndex(row =>
    row.some(tile => tile.tilePosition === updatedTile.tilePosition)
  );
  if (rowIndex !== -1) {
    const colIndex = state.currentBoardState[rowIndex].findIndex(
      tile => tile.tilePosition === updatedTile.tilePosition
    );
    if (colIndex !== -1) {
      state.currentBoardState[rowIndex][colIndex] = updatedTile; // Update specific tile
    }
  }
};

export const updateCurrentTurnReducer = (
  state: BoardType,
) => {
  const turn: string = state.currentTurn;
  state.currentTurn = turn === "White" ? "Black" : "White";
};

export const addMoveToHistoryReducer = (
  state: BoardType,
  action: PayloadAction<MoveType>
) => {
  state.moveHistory.push(action.payload);
};

export const capturedPieceReducer = (
  state: BoardType,
  action: PayloadAction<PieceType>
) => {
  const turnIndex: number = state.currentTurn == "White" ? 0 : 1;

  state.players[turnIndex].capturedPieces.push(action.payload);
};

