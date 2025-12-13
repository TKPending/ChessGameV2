import { createSlice } from "@reduxjs/toolkit";
import { generateTiles } from "@/app/utils/chessboard/generateTiles";
import { ChessboardStateType } from "@/app/types/StateTypes";
import {
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
    setKingHasMoved: kingMovedReducer,
    setPawnPromotion: pawnPromotionStateReducer,
    setPreviousTile: setPreviousTileReducer,
    setRookHasMoved: rookMovedReducer,
    updateTile: updateSpecificTileReducer,
    updateTileWithPromotedPiece: updateTileWithPromotedPieceReducer,
    resetChessboard: resetGameReducer,
  },
});

export const {
  setChessboard,
  setKingHasMoved,
  setPawnPromotion,
  setPreviousTile,
  setRookHasMoved,
  updateTile,
  updateTileWithPromotedPiece,
  resetChessboard,
} = chessboardSlice.actions;

export default chessboardSlice.reducer;
