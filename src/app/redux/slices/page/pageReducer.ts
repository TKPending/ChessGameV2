import { PageState } from "@/app/types/PageTypes";
import { PayloadAction } from "@reduxjs/toolkit";

export const pageTransitionReducer = (
  state: PageState,
  action: PayloadAction<{ current: string; previous: string }>
) => {
  state.currentPage = action.payload.current;
  state.prevPage = action.payload.previous;
};
