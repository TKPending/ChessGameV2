import { createSlice } from "@reduxjs/toolkit";
import { generateTiles } from "@/app/utils/chessboard/generateTiles";
import { ChessboardStateType } from "@/app/types/StateTypes";
import {
  castlingOptionGoneReducer,
  chessboardReducer,
  currentlyClickedTileReducer,
  kingMovedReducer,
  pawnPromotionStateReducer,
  prevClickedTileReducer,
  resetGameReducer,
  rookMovedReducer,
  updateSpecificTileReducer,
  updateTileWithPromotedPieceReducer,
} from "./chessboardStateReducer";

const initialState: ChessboardStateType = {
  chessboard: generateTiles(),
  clickedTile: null,
  prevClickedTile: null,
  castling: {
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
    setCurrentTile: currentlyClickedTileReducer,
    setPreviousTile: prevClickedTileReducer,
    setCastlingOption: castlingOptionGoneReducer,
    setRookHasMoved: rookMovedReducer,
    setKingHasMoved: kingMovedReducer,
    setPawnPromotion: pawnPromotionStateReducer,
    setTileWithPromotedPawn: updateTileWithPromotedPieceReducer,
    resetChessboard: resetGameReducer,
  },
});

export const {
  setChessboard,
  updateTile,
  setCurrentTile,
  setPreviousTile,
  setCastlingOption,
  setRookHasMoved,
  setKingHasMoved,
  setPawnPromotion,
  setTileWithPromotedPawn,
  resetChessboard,
} = chessboardSlice.actions;

export default chessboardSlice.reducer;
