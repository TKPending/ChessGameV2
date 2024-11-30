import { createSlice } from "@reduxjs/toolkit";
import { PreviousMovesContainerType } from "@/app/types/PreviousMovesContainerType";
import { displayPreviousMovesReducer } from "./previousMovesReducer";

const initialState: PreviousMovesContainerType = {
  previousMovesHidden: false,
};

const previousMovesSlice = createSlice({
  name: "previousMoves",
  initialState,
  reducers: {
    setDisplayMovesHidden: displayPreviousMovesReducer,
  },
});

export const {
  setDisplayMovesHidden,
} = previousMovesSlice.actions;

export default previousMovesSlice.reducer;
