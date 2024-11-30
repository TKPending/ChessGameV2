import { PayloadAction } from "@reduxjs/toolkit";
import { PreviousMovesContainerType } from "@/app/types/PreviousMovesContainerType";


export const displayPreviousMovesReducer = (
  state: PreviousMovesContainerType,
  action: PayloadAction<boolean>
) => {
  state.previousMovesHidden = action.payload;
}

