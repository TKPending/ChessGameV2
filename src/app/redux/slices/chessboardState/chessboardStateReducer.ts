import { PayloadAction } from "@reduxjs/toolkit";
import { generateTiles } from "@/app/utils/chessboard/generateTiles";
import { TileType, PieceType, ChessColors } from "@/app/types/ChessTypes";
import { CastleType } from "@/app/types/MoveTypes";
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

export const setPreviousTileReducer = (
  state: ChessboardStateType,
  action: PayloadAction<TileType | null>
) => {
  state.previousTile = action.payload;
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

// Castling Logic Reducers
export const rookMovedReducer = (
  state: ChessboardStateType,
  action: PayloadAction<{
    direction: "queenside" | "kingside";
    currentTurnColor: ChessColors.white | ChessColors.black;
  }>
) => {
  const { currentTurnColor, direction } = action.payload;

  const team =
    currentTurnColor === ChessColors.white
      ? state.whiteCastling
      : state.blackCastling;
  const side: "queenside" | "kingside" = direction;

  if (side === "queenside") {
    team.queenSideCastling = false;
  } else if (side === "kingside") {
    team.kingSideCastling = false;
  }

  // Update the general castling option
  team.canCastle = team.queenSideCastling || team.kingSideCastling;

  if (currentTurnColor === ChessColors.white) {
    state.whiteCastling = team;
  } else {
    state.blackCastling = team;
  }
};

export const kingMovedReducer = (
  state: ChessboardStateType,
  action: PayloadAction<ChessColors.black | ChessColors.white>
) => {
  const kingHasMovedCastling: CastleType = {
    canCastle: false,
    kingSideCastling: false,
    queenSideCastling: false,
  };

  if (action.payload === ChessColors.white) {
    state.whiteCastling = kingHasMovedCastling;
  } else {
    state.blackCastling = kingHasMovedCastling;
  }
};

export const resetGameReducer = (state: ChessboardStateType) => {
  state.chessboard = generateTiles();
  state.previousTile = null;
  // state.castling = {
  //   blackKing: {
  //     kingMoved: false,
  //     kingPosition: [7, 4],
  //   },
  //   whiteKing: {
  //     kingMoved: false,
  //     kingPosition: [0, 4],
  //   },
  //   black: {
  //     canCastleOption: true,
  //     rightCastleOption: true,
  //     leftCastleOption: true,
  //   },
  //   white: {
  //     canCastleOption: true,
  //     rightCastleOption: true,
  //     leftCastleOption: true,
  //   },
  // };
  state.whiteCastling = {
    canCastle: true,
    queenSideCastling: true,
    kingSideCastling: true,
  };
  state.blackCastling = {
    canCastle: true,
    queenSideCastling: true,
    kingSideCastling: true,
  };
  state.pawnPromotion = {
    isPawnPromotion: false,
    tileToUpdate: null,
  };
};
