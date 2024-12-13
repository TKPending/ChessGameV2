import { createSlice } from "@reduxjs/toolkit";
import { BoardType } from "@/app/types/BoardType";
import { Team } from "@/app/types/PlayerType";
import {
  addPlayerNameReducer,
  capturedPiecesReducer,
  chessboardReducer,
  chessGamePlayingReducer,
  currentlyClickedTileReducer,
  enemyMovesReducer,
  inCheckPositionsReducer,
  kingInCheckmateReducer,
  kingInCheckReducer,
  pieceValidMovesReducer,
  previouslyClickedTileReducer,
  updateCurrentTurnReducer,
  updateSpecificTileReducer,
  validCheckMovesReducer,
} from "./boardReducer";
import { generateTiles } from "@/app/utils/generateTiles";

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
} = boardSlice.actions;

export default boardSlice.reducer;
