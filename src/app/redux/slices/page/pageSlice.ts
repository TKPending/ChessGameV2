import { createSlice } from "@reduxjs/toolkit";
import { PageStateType } from "@/app/types/StateTypes";
import { pageTransitionReducer } from "./pageReducer";

const initialState: PageStateType = {
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
