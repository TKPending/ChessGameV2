import { PayloadAction } from "@reduxjs/toolkit";
import { BoardType } from "@/app/types/BoardType";
import { TileType } from "@/app/types/TileType";
import { PieceType } from "@/app/types/PieceType";

export const addPlayerNameReducer = (
  state: BoardType,
  action: PayloadAction<{ playerName: string; playerNo: number }>
) => {
  const player = action.payload;

  state.players[action.payload.playerNo] = {
    ...state.players[player.playerNo],
    playerName: player.playerName,
  };
};

export const chessGamePlayingReducer = (
  state: BoardType,
  action: PayloadAction<boolean>
) => {
  state.isPlaying = action.payload;
};

export const chessboardReducer = (
  state: BoardType,
  action: PayloadAction<TileType[][]>
) => {
  state.chessboard = action.payload;
};

export const updateSpecificTileReducer = (
  state: BoardType,
  action: PayloadAction<TileType>
) => {
  const updatedTile = action.payload;
  const rowIndex = state.chessboard.findIndex((row) =>
    row.some((tile) => tile.tilePosition === updatedTile.tilePosition)
  );
  if (rowIndex !== -1) {
    const colIndex = state.chessboard[rowIndex].findIndex(
      (tile) => tile.tilePosition === updatedTile.tilePosition
    );
    if (colIndex !== -1) {
      state.chessboard[rowIndex][colIndex] = updatedTile; // Update specific tile
    }
  }
};

export const updateCurrentTurnReducer = (state: BoardType) => {
  const turn: string = state.currentTurn;
  state.currentTurn = turn === "White" ? "Black" : "White";
};

export const currentlyClickedTileReducer = (
  state: BoardType,
  action: PayloadAction<TileType | null>
) => {
  state.clickedTile = action.payload;
};

export const previouslyClickedTileReducer = (
  state: BoardType,
  action: PayloadAction<TileType | null>
) => {
  state.previousClickedTile = action.payload;
};

export const capturedPiecesReducer = (
  state: BoardType,
  action: PayloadAction<PieceType>
) => {
  const turnIndex: number = state.currentTurn == "White" ? 0 : 1;

  state.players[turnIndex].capturedPieces.push(action.payload);
};

export const pieceValidMovesReducer = (
  state: BoardType,
  action: PayloadAction<[number, number][]>
) => {
  state.piecePotentialMoves = action.payload;
};

export const enemyMovesReducer = (
  state: BoardType,
  action: PayloadAction<number[][]>
) => {
  state.enemyMoves = action.payload;
};

export const kingInCheckReducer = (
  state: BoardType,
  action: PayloadAction<boolean>
) => {
  state.isKingInCheck = action.payload;
};

export const kingInCheckmateReducer = (
  state: BoardType,
  action: PayloadAction<boolean>
) => {
  state.isKingInCheckmate = action.payload;
};
