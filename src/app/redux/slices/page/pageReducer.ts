import { PageStateType } from "@/app/types/StateTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { pages } from "@/app/types/PageTypes";

/**
 * Move to the next page
 * @param state Current Redux State
 */
export const nextPageReducer = (state: PageStateType) => {
  state.prevIndex = state.index;
  state.index = Math.min(state.index + 1, pages.length - 1);
};
/**
 * Move to the previous page
 * @param state Current Redux State
 */
export const previousPageReducer = (state: PageStateType) => {
  state.prevIndex = state.index;
  state.index = Math.max(state.index - 1, 0);
};
/**
 * Go to a specific page
 * @param state Current Redux State
 * @param action PayloadAction with the page index to go to
 */
export const goToReducer = (
  state: PageStateType,
  action: PayloadAction<number>
) => {
  state.prevIndex = state.index;
  state.index = action.payload;
};
