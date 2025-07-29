import { PayloadAction } from "@reduxjs/toolkit";
import { generateTiles } from "@/app/utils/chessboard/generateTiles";
import { BoardType, TileType, PieceType } from "@/app/types/ChessTypes";

export const chessboardReducer = (
  state: BoardType,
  action: PayloadAction<TileType[][]>
) => {
  state.board = action.payload;
};

export const updateCurrentTurnReducer = (state: BoardType) => {
  const turn: string = state.currentTurn;
  state.currentTurn = turn === "White" ? "Black" : "White";
};

export const updateSpecificTileReducer = (
  state: BoardType,
  action: PayloadAction<TileType>
) => {
  const updatedTile = action.payload;
  const rowIndex = state.board.findIndex((row) =>
    row.some((tile) => tile.tilePosition === updatedTile.tilePosition)
  );
  if (rowIndex !== -1) {
    const colIndex = state.board[rowIndex].findIndex(
      (tile) => tile.tilePosition === updatedTile.tilePosition
    );
    if (colIndex !== -1) {
      state.board[rowIndex][colIndex] = updatedTile;
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
  state.previouslyClickedTile = action.payload;
};

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

  state.board = state.board.map((row) =>
    row.map((tile) =>
      tile.tilePosition === tileToUpdate.tilePosition
        ? { ...tile, pieceOnTile: promotedPiece }
        : tile
    )
  );

  state.pawnPromotion.isPawnPromotion = false;
  state.pawnPromotion.tileToUpdate = null;
};

export const resetGameReducer = (state: BoardType) => {
  // Swap player names
  // const tempPlayerName = state.players[0].playerName;

  state.board = generateTiles();
  state.currentTurn = "White";
  state.clickedTile = null;
  state.previouslyClickedTile = null;
  state.isKingInCheck = false;
  state.isKingInCheckmate = false;
  state.castling = {
    blackKing: {
      kingMoved: false,
      kingPosition: [7, 4],
    },
    whiteKing: {
      kingMoved: false,
      kingPosition: [0, 4],
    },
    black: {
      canCastleOption: true,
      rightCastleOption: true,
      leftCastleOption: true,
    },
    white: {
      canCastleOption: true,
      rightCastleOption: true,
      leftCastleOption: true,
    },
  };
  state.pawnPromotion = {
    isPawnPromotion: false,
    tileToUpdate: null,
  };
};
