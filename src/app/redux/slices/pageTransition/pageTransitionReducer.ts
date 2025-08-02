import { PayloadAction } from "@reduxjs/toolkit";
import { ActiveMovesType } from "@/app/types/ChessTypes";
import { PageTransitionType } from "@/app/types/ChessTypes";

export const transitionToReadMoreReducer = (state: PageTransitionType) => {
  state.landingStatus = false;
  state.readMoreStatus = true;
};

export const transitionToLandingReducer = (state: PageTransitionType) => {
  state.landingStatus = true;
  state.readMoreStatus = false;
};

export const transitionToPlayersReducer = (state: PageTransitionType) => {
  state.landingStatus = false;
  state.playerStatus = true;
};

export const resetTransitionReducer = (state: PageTransitionType) => {
  state.landingStatus = false;
  state.playerStatus = false;
  state.readMoreStatus = false;
};
