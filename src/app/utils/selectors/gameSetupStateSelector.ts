import { RootState } from "@/app/redux/store";

export const selectIsPlayerNameValid = (state: RootState) =>
  state.gameSetupState.isPlayerNameValid;
