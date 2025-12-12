import { createSlice } from "@reduxjs/toolkit";
import { generateTiles } from "@/app/utils/chessboard/generateTiles";
import { ChessboardStateType } from "@/app/types/StateTypes";
import {
  // castlingOptionGoneReducer,
  chessboardReducer,
  kingMovedReducer,
  pawnPromotionStateReducer,
  setPreviousTileReducer,
  resetGameReducer,
  rookMovedReducer,
  updateSpecificTileReducer,
  updateTileWithPromotedPieceReducer,
} from "./chessboardStateReducer";

const initialState: ChessboardStateType = {
  chessboard: generateTiles(),
  previousTile: null,
  whiteCastling: {
    canCastle: true,
    queenSideCastling: true,
    kingSideCastling: true,
  },
  blackCastling: {
    canCastle: true,
    queenSideCastling: true,
    kingSideCastling: true,
  },
  pawnPromotion: {
    isPawnPromotion: false,
    tileToUpdate: null,
  },
};

const chessboardSlice = createSlice({
  name: "chessboard",
  initialState,
  reducers: {
    setChessboard: chessboardReducer,
    updateTile: updateSpecificTileReducer,
    setPreviousTile: setPreviousTileReducer,
    setRookHasMoved: rookMovedReducer,
    setKingHasMoved: kingMovedReducer,
    setPawnPromotion: pawnPromotionStateReducer,
    updateTileWithPromotedPiece: updateTileWithPromotedPieceReducer,
    resetChessboard: resetGameReducer,
  },
});

export const {
  setChessboard,
  updateTile,
  setPreviousTile,
  setRookHasMoved,
  setKingHasMoved,
  setPawnPromotion,
  updateTileWithPromotedPiece,
  resetChessboard,
} = chessboardSlice.actions;

export default chessboardSlice.reducer;
