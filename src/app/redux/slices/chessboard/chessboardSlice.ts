import { createSlice } from "@reduxjs/toolkit";
import { generateTiles } from "@/app/utils/chessboard/generateTiles";
import { BoardType } from "@/app/types/ChessTypes";
import {
  castlingOptionGoneReducer,
  chessboardReducer,
  currentlyClickedTileReducer,
  kingInCheckmateReducer,
  kingInCheckReducer,
  kingMovedReducer,
  previouslyClickedTileReducer,
  resetGameReducer,
  rookMovedReducer,
  updateCurrentTurnReducer,
  updateSpecificTileReducer,
  updateTileWithPromotedPieceReducer,
} from "./chessboardReducer";

const initialState: BoardType = {
  board: generateTiles(),
  currentTurn: "White",
  clickedTile: null,
  previouslyClickedTile: null,
  isKingInCheck: false,
  isKingInCheckmate: false,
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
    setCurrentTurn: updateCurrentTurnReducer,
    updateTile: updateSpecificTileReducer,
    setCurrentTile: currentlyClickedTileReducer,
    setPreviouslyClickedTile: previouslyClickedTileReducer,
    setKingHasMoved: kingMovedReducer,
    setCastlingOption: castlingOptionGoneReducer,
    setRookhasMoved: rookMovedReducer,
    setKingInCheck: kingInCheckReducer,
    setKingInCheckmate: kingInCheckmateReducer,
    setPromotedPawn: updateTileWithPromotedPieceReducer,
    resetChessboard: resetGameReducer,
  },
});

export const {
  setChessboard,
  setCurrentTurn,
  updateTile,
  setCurrentTile,
  setPreviouslyClickedTile,
  setKingHasMoved,
  setCastlingOption,
  setRookhasMoved,
  setKingInCheck,
  setKingInCheckmate,
  setPromotedPawn,
  resetChessboard,
} = chessboardSlice.actions;

export default chessboardSlice.reducer;
