import { RootState } from "@/app/redux/store";

export const selectPageIndex = (state: RootState) => state.pageState.index;
export const selectPrevPageIndex = (state: RootState) =>
  state.pageState.prevIndex;
