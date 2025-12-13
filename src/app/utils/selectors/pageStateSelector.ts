import { RootState } from "@/app/redux/store";

// export const selectCurrentPage = (state: RootState) =>
//   state.pageState.currentPage;
// export const selectPrevPage = (state: RootState) => state.pageState.prevPage;
// export const selectPage = (state: RootState) => state.pageState.cp;
export const selectPageIndex = (state: RootState) => state.pageState.index;
export const selectPrevPageIndex = (state: RootState) =>
  state.pageState.prevIndex;
