import { PageComponents, PageState } from "@/app/types/PageTypes";
import { createSlice } from "@reduxjs/toolkit";
import { pageTransitionReducer } from "./pageReducer";

const initialState: PageState = {
  currentPage: "landing",
  prevPage: "",
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPages: pageTransitionReducer,
  },
});

export const { setPages } = pageSlice.actions;

export default pageSlice.reducer;
