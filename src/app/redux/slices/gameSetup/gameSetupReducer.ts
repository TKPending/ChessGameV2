import { PayloadAction } from "@reduxjs/toolkit";
import { GameSetupType } from "@/app/types/GameSetupType";

export const playerNamesAvailableReducer = (
  state: GameSetupType,
  action: PayloadAction<boolean>
) => {
  state.validPlayerNames = action.payload;
};

export const gameTimesAvailableReducer = (
  state: GameSetupType,
  action: PayloadAction<boolean>
) => {
  state.validPlayerNames = action.payload;
};

export const startButtonAvailableReducer = (
  state: GameSetupType,
  action: PayloadAction<boolean>
) => {
  state.validPlayerNames = action.payload;
};
