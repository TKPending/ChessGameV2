import { createSlice } from "@reduxjs/toolkit";
import { PageStateType } from "@/app/types/StateTypes";
import {
  goToReducer,
  nextPageReducer,
  previousPageReducer,
} from "./pageReducer";

const initialState: PageStateType = {
  index: 0,
  prevIndex: null,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    nextPage: nextPageReducer,
    previousPage: previousPageReducer,
    goToPage: goToReducer,
  },
});

export const { nextPage, previousPage, goToPage } = pageSlice.actions;

export default pageSlice.reducer;
