import { PlayerSetupType } from "@/app/types/ChessTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  isStartVisibleReducer,
  validPlayerNamesReducer,
  validTimesReducer,
} from "./playerSetupReducer";

const initialState: PlayerSetupType = {
  validPlayerNames: false,
  validTimes: false,
  isStartVisible: false,
};

const playerSetupSlice = createSlice({
  name: "playerSetup",
  initialState,
  reducers: {
    setValidPlayerNames: validPlayerNamesReducer,
    setValidTimes: validTimesReducer,
    setIsStartVisible: isStartVisibleReducer,
  },
});

export const { setValidPlayerNames, setValidTimes, setIsStartVisible } =
  playerSetupSlice.actions;

export default playerSetupSlice.reducer;
