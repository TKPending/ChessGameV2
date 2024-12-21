import { createSlice } from "@reduxjs/toolkit";
import { BoardType } from "@/app/types/BoardType";
import { Team } from "@/app/types/PlayerType";
import {
  addPlayerNameReducer,
  capturedPiecesReducer,
  castlingOptionGoneReducer,
  chessboardReducer,
  chessGamePlayingReducer,
  currentlyClickedTileReducer,
  enemyMovesReducer,
  inCheckPositionsReducer,
  kingInCheckmateReducer,
  kingInCheckReducer,
  kingMovedReducer,
  pawnPromotionStateReducer,
  pieceValidMovesReducer,
  previouslyClickedTileReducer,
  rookMovedReducer,
  updateCurrentTurnReducer,
  updateSpecificTileReducer,
  updateTileWithPromotedPieceReducer,
  validCheckMovesReducer,
} from "./boardReducer";
import { generateTiles } from "@/app/utils/chessboard/generateTiles";

const initialState: BoardType = {
  chessboard: generateTiles(),
  stateIndex: 0,
  players: [
    {
      no: 0,
      playerName: "",
      capturedPieces: [],
      team: Team.white,
      remainingTime: "",
    },
    {
      no: 1,
      playerName: "",
      capturedPieces: [],
      team: Team.black,
      remainingTime: "",
    },
  ],
  winner: undefined,
  isPlaying: false,
  currentTurn: "White",
  clickedTile: null,
  previousClickedTile: null,
  piecePotentialMoves: [],
  enemyMoves: [],
  isKingInCheck: false,
  isKingInCheckmate: false,
  validCheckMoves: [],
  inCheckPositions: [],
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

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setPlayersName: addPlayerNameReducer,
    setIsChessGamePlaying: chessGamePlayingReducer,
    setChessboard: chessboardReducer,
    setSpecificTile: updateSpecificTileReducer,
    setCurrentTurn: updateCurrentTurnReducer,
    setClickedTile: currentlyClickedTileReducer,
    setPreviouslyClickedTile: previouslyClickedTileReducer,
    setPlayerCapturedPiece: capturedPiecesReducer,
    setValidMoves: pieceValidMovesReducer,
    setEnemyMoves: enemyMovesReducer,
    setIsKingInCheck: kingInCheckReducer,
    setIsKingInCheckmate: kingInCheckmateReducer,
    setValidCheckMoves: validCheckMovesReducer,
    setInCheckPositons: inCheckPositionsReducer,
    setKingHasMoved: kingMovedReducer,
    setRookHasMoved: rookMovedReducer,
    setRemoveCastlingOption: castlingOptionGoneReducer,
    setPawnPromotion: pawnPromotionStateReducer,
    setTileWithPromotedPiece: updateTileWithPromotedPieceReducer,
  },
});

export const {
  setPlayersName,
  setIsChessGamePlaying,
  setChessboard,
  setSpecificTile,
  setCurrentTurn,
  setClickedTile,
  setPreviouslyClickedTile,
  setPlayerCapturedPiece,
  setValidMoves,
  setEnemyMoves,
  setIsKingInCheck,
  setIsKingInCheckmate,
  setValidCheckMoves,
  setInCheckPositons,
  setKingHasMoved,
  setRookHasMoved,
  setRemoveCastlingOption,
  setPawnPromotion,
  setTileWithPromotedPiece,
} = boardSlice.actions;

export default boardSlice.reducer;
