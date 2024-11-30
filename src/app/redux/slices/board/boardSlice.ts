import { createSlice } from "@reduxjs/toolkit";
import { BoardType } from "@/app/types/BoardType";
import { Team } from "@/app/types/PlayerType";
import { addPlayerNameReducer, chessboardHistoryReducer, chessboardReducer, chessGamePlayingReducer, updateCurrentTurnReducer, updateTileReducer } from "./boardReducer";
import { generateTiles } from "@/app/utils/generateTiles";

const initialState: BoardType = {
  tiles: generateTiles(), // Initialize tiles as a 2D array
  currentState: [],
  previousStates: [],
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
  moveHistory: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setPlayersName: addPlayerNameReducer,
    setIsChessGamePlaying: chessGamePlayingReducer,
    setChessboard: chessboardReducer,
    setTile: updateTileReducer,
    setCurrentTurn: updateCurrentTurnReducer,
    setBoardHistory: chessboardHistoryReducer,
  },
});

export const {
  setPlayersName,
  setIsChessGamePlaying,
  setChessboard,
  setTile,
  setCurrentTurn,
  setBoardHistory,
} = boardSlice.actions;

export default boardSlice.reducer;
