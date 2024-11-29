import { createSlice } from "@reduxjs/toolkit";
import { PreviousMovesContainerType } from "@/app/types/PreviousMovesContainerType";
import { completelyHidePreviousMoveReducer } from "./previousMovesReducer";

const initialState: PreviousMovesContainerType = {
  previousMovesHidden: false,
};

const previousMovesContainerSlice = createSlice({
  name: "previousMovesContainer",
  initialState,
  reducers: {
    setFullscreen: completelyHidePreviousMoveReducer,
  },
});

export const {
  setFullscreen,
} = previousMovesContainerSlice.actions;

export default previousMovesContainerSlice.reducer;
