import { PayloadAction } from "@reduxjs/toolkit";
import { PlayerSetupType } from "@/app/types/ChessTypes";

export const validPlayerNamesReducer = (
  state: PlayerSetupType,
  action: PayloadAction<boolean>
) => {
  state.validPlayerNames = action.payload;
};

export const validTimesReducer = (
  state: PlayerSetupType,
  action: PayloadAction<boolean>
) => {
  state.validPlayerNames = action.payload;
};

export const isStartVisibleReducer = (
  state: PlayerSetupType,
  action: PayloadAction<boolean>
) => {
  state.validPlayerNames = action.payload;
};
