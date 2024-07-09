import { createSlice } from "@reduxjs/toolkit";
import { BoardType } from "@/app/types/BoardType";
import { Team } from "@/app/types/PlayerType";
import { addPlayerNameReducer } from "./boardReducer";

const initialState: BoardType = {
  tiles: [],
  currentState: [],
  previousStates: [],
  stateIndex: 0,
  players: [
    {
      no: 0,
      playerName: "",
      team: Team.white,
      remainingTime: "",
    },
    {
      no: 1,
      playerName: "",
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
  },
});

export const {
  setPlayersName,
} = boardSlice.actions;

export default boardSlice.reducer;
