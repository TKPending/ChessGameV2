import { PayloadAction } from "@reduxjs/toolkit";
import { GameSetupStateType } from "@/app/types/StateTypes";

export const validPlayerNamesReducer = (
  state: GameSetupStateType,
  action: PayloadAction<boolean>
) => {
  state.isPlayerNameValid = action.payload;
};
