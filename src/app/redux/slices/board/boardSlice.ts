import { createSlice } from "@reduxjs/toolkit";
import { BoardType } from "@/app/types/BoardType";
import { Team } from "@/app/types/PlayerType";
import { addPlayerNameReducer, chessGamePlayingReducer } from "./boardReducer";

const initialState: BoardType = {
  tiles: [],
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
  currentTurn: "white",
  moveHistory: []
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setPlayersName: addPlayerNameReducer,
    setIsChessGamePlaying: chessGamePlayingReducer,
  },
});

export const {
  setPlayersName,
  setIsChessGamePlaying,
} = boardSlice.actions;

export default boardSlice.reducer;
