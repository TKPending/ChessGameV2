import { createSlice } from "@reduxjs/toolkit";
import { GameSetupType } from "@/app/types/GameSetupType";
import { gameTimesAvailableReducer, playerNamesAvailableReducer, startButtonAvailableReducer } from "./gameSetupReducer";

const initialState: GameSetupType = {
    validPlayerNames: false,
    validTimes: false,
    isStartVisible: false,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setPlayerNamesAvailable: playerNamesAvailableReducer,
    setGameTimeAvailable: gameTimesAvailableReducer,
    setStartButtonVisible: startButtonAvailableReducer
  },
});

export const {
    setPlayerNamesAvailable,
    setGameTimeAvailable,
    setStartButtonVisible,
} = boardSlice.actions;

export default boardSlice.reducer;
