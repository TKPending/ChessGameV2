import { GameSetupStateType } from "@/app/types/StateTypes";
import { createSlice } from "@reduxjs/toolkit";
import { validPlayerNamesReducer } from "./gameSetupReducer";

const initialState: GameSetupStateType = {
  isPlayerNameValid: false,
};

const gameSetupSlice = createSlice({
  name: "gameSetup",
  initialState,
  reducers: {
    setValidPlayerNames: validPlayerNamesReducer,
  },
});

export const { setValidPlayerNames } = gameSetupSlice.actions;

export default gameSetupSlice.reducer;
