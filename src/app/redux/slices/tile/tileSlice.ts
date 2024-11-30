import { createSlice } from "@reduxjs/toolkit";
import { PlayingTileType } from "@/app/types/PlayingTilesType";
import { changeInitialClickBackgroundReducer, currentTileReducer, previousTileReducer } from "./tileReducer";

const initialState: PlayingTileType = {
    currentTile: null,
    previousTile: null,
    potentialCapture: [],
  };

const playingTileSlice = createSlice({
  name: "playingTile",
  initialState,
  reducers: {
    setCurrentTile: currentTileReducer,
    setPreviousTile: previousTileReducer,
    setInitialTileBackgroundColor: changeInitialClickBackgroundReducer,
    
  },
});

export const {
  setCurrentTile,
  setPreviousTile,
  setInitialTileBackgroundColor,
} = playingTileSlice.actions;

export default playingTileSlice.reducer;
