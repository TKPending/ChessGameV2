import { PageStateType } from "@/app/types/StateTypes";
import { PayloadAction } from "@reduxjs/toolkit";

export const pageTransitionReducer = (
  state: PageStateType,
  action: PayloadAction<{ current: string; previous: string }>
) => {
  state.currentPage = action.payload.current;
  state.prevPage = action.payload.previous;
};
