import { RootState } from "@/app/redux/store";

export const selectCurrentPage = (state: RootState) =>
  state.pageState.currentPage;
export const selectPrevPage = (state: RootState) => state.pageState.prevPage;
