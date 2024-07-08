import { createSlice } from "@reduxjs/toolkit";
import { BoardType } from "@/app/types/BoardType";

const initialState: BoardType = {
  tiles: [],
  currentState: [],
  previousStates: [],
  stateIndex: 0,
  players: [],
  winner: undefined,
  isPlaying: false,
  currentTurn: "white",
  moveHistory: []
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
  },
});

export const {
} = boardSlice.actions;

export default boardSlice.reducer;
