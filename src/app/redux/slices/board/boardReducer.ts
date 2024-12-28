import { PayloadAction } from "@reduxjs/toolkit";
import { BoardType } from "@/app/types/BoardType";
import { TileType } from "@/app/types/TileType";
import { PieceType } from "@/app/types/PieceType";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";

// Chessboard State Reducer
export const chessboardReducer = (
  state: BoardType,
  action: PayloadAction<TileType[][]>
) => {
  state.chessboard = action.payload;
};

// Player Related Reducers
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

// Game Related Reducers
export const updateCurrentTurnReducer = (state: BoardType) => {
  const turn: string = state.currentTurn;
  state.currentTurn = turn === "White" ? "Black" : "White";
};

export const capturedPiecesReducer = (
  state: BoardType,
  action: PayloadAction<PieceType>
) => {
  const turnIndex: number = state.currentTurn == "White" ? 0 : 1;

  state.players[turnIndex].capturedPieces.push(action.payload);
};

export const chessGamePlayingReducer = (
  state: BoardType,
  action: PayloadAction<boolean>
) => {
  state.isPlaying = action.payload;
};

// Tile Related Reducers
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
      state.chessboard[rowIndex][colIndex] = updatedTile;
    }
  }
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

// Piece Move Related Reducers
export const pieceValidMovesReducer = (
  state: BoardType,
  action: PayloadAction<number[][]>
) => {
  state.piecePotentialMoves = action.payload;
};

export const enemyMovesReducer = (
  state: BoardType,
  action: PayloadAction<EnemyAttackType[]>
) => {
  state.enemyMoves = action.payload;
};

// Castling Related Reducers
export const kingMovedReducer = (state: BoardType) => {
  const team = state.currentTurn === "White" ? "white" : "black";
  state.castling[`${team}King`].kingMoved = true;
  state.castling[team].canCastleOption = false;
  state.castling[team].leftCastleOption = false;
  state.castling[team].rightCastleOption = false;
};

export const castlingOptionGoneReducer = (state: BoardType) => {
  const team = state.currentTurn === "White" ? "white" : "black";

  if (state.castling[`${team}King`].kingMoved) {
    state.castling[team].canCastleOption = false;
    state.castling[team].rightCastleOption = false;
    state.castling[team].leftCastleOption = false;
    return;
  }

  state.castling[team].canCastleOption =
    state.castling[team].leftCastleOption ||
    state.castling[team].rightCastleOption;
};

export const rookMovedReducer = (
  state: BoardType,
  action: PayloadAction<"left" | "right">
) => {
  const team = state.currentTurn === "White" ? "white" : "black";
  const side: "left" | "right" = action.payload;

  if (side === "left") {
    state.castling[team].leftCastleOption = false;
  } else if (side === "right") {
    state.castling[team].rightCastleOption = false;
  }

  // Update the general castling option
  state.castling[team].canCastleOption =
    state.castling[team].leftCastleOption ||
    state.castling[team].rightCastleOption;
};

// Check and Checkmate Related Reducers
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

export const validCheckMovesReducer = (
  state: BoardType,
  action: PayloadAction<number[][]>
) => {
  state.validCheckMoves = action.payload;
};

export const inCheckPositionsReducer = (
  state: BoardType,
  action: PayloadAction<number[][]>
) => {
  state.inCheckPositions = action.payload;
};

export const piecesAttackingKingReeducer = (
  state: BoardType,
  action: PayloadAction<EnemyAttackType | null>
) => {
  if (action.payload) {
    state.pieceAttackingKing.push(action.payload);
    return;
  }

  state.pieceAttackingKing = [];
};

// Pawn Promotion Related Reducers
export const pawnPromotionStateReducer = (
  state: BoardType,
  action: PayloadAction<{ isPromotion: boolean; targetTile: TileType | null }>
) => {
  const { isPromotion, targetTile } = action.payload;

  state.pawnPromotion.isPawnPromotion = isPromotion;
  state.pawnPromotion.tileToUpdate = targetTile;
};

export const updateTileWithPromotedPieceReducer = (
  state: BoardType,
  action: PayloadAction<PieceType>
) => {
  const promotedPiece: PieceType = action.payload;
  const tileToUpdate: TileType | null = state.pawnPromotion.tileToUpdate;

  if (!tileToUpdate) {
    console.log("Tile didn't update");
    return;
  }

  state.chessboard = state.chessboard.map((row) =>
    row.map((tile) =>
      tile.tilePosition === tileToUpdate.tilePosition
        ? { ...tile, pieceOnTile: promotedPiece }
        : tile
    )
  );

  state.pawnPromotion.isPawnPromotion = false;
  state.pawnPromotion.tileToUpdate = null;
};
