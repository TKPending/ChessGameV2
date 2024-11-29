import { PayloadAction } from "@reduxjs/toolkit";
import { PreviousMovesContainerType } from "@/app/types/PreviousMovesContainerType";


export const completelyHidePreviousMoveReducer = (
  state: PreviousMovesContainerType,
  action: PayloadAction<boolean>
) => {
  state.previousMovesHidden = action.payload;
}

