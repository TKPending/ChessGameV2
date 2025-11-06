import { PayloadAction } from "@reduxjs/toolkit";
import { generateTiles } from "@/app/utils/chessboard/generateTiles";
import { TileType, PieceType, ChessColors } from "@/app/types/ChessTypes";
import { ChessboardStateType } from "@/app/types/StateTypes";

export const chessboardReducer = (
  state: ChessboardStateType,
  action: PayloadAction<TileType[][]>
) => {
  state.chessboard = action.payload;
};

export const updateSpecificTileReducer = (
  state: ChessboardStateType,
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
  state: ChessboardStateType,
  action: PayloadAction<TileType | null>
) => {
  state.clickedTile = action.payload;
};

export const prevClickedTileReducer = (
  state: ChessboardStateType,
  action: PayloadAction<TileType | null>
) => {
  state.prevClickedTile = action.payload;
};

export const pawnPromotionStateReducer = (
  state: ChessboardStateType,
  action: PayloadAction<{ isPromotion: boolean; targetTile: TileType | null }>
) => {
  const { isPromotion, targetTile } = action.payload;

  state.pawnPromotion.isPawnPromotion = isPromotion;
  state.pawnPromotion.tileToUpdate = targetTile;
};

export const updateTileWithPromotedPieceReducer = (
  state: ChessboardStateType,
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

export const resetGameReducer = (state: ChessboardStateType) => {
  state.chessboard = generateTiles();
  state.clickedTile = null;
  state.prevClickedTile = null;
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

// Castling Logic Reducers
const currentTurn = (currentTurn: ChessColors.white | ChessColors.black) => {
  return currentTurn === ChessColors.white ? "white" : "black";
};

export const rookMovedReducer = (
  state: ChessboardStateType,
  action: PayloadAction<{
    direction: "left" | "right";
    currentTurnColor: ChessColors.white | ChessColors.black;
  }>
) => {
  const team = currentTurn(action.payload.currentTurnColor);
  const side: "left" | "right" = action.payload.direction;

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

export const castlingOptionGoneReducer = (
  state: ChessboardStateType,
  action: PayloadAction<ChessColors.black | ChessColors.white>
) => {
  const team = currentTurn(action.payload);

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

export const kingMovedReducer = (
  state: ChessboardStateType,
  action: PayloadAction<ChessColors.black | ChessColors.white>
) => {
  const team = currentTurn(action.payload);
  state.castling[`${team}King`].kingMoved = true;
  state.castling[team].canCastleOption = false;
  state.castling[team].leftCastleOption = false;
  state.castling[team].rightCastleOption = false;
};
