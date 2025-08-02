import { PageTransitionType } from "@/app/types/ChessTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
  resetTransitionReducer,
  transitionToLandingReducer,
  transitionToPlayersReducer,
  transitionToReadMoreReducer,
} from "./pageTransitionReducer";

const initialState: PageTransitionType = {
  landingStatus: true,
  readMoreStatus: false,
  playerStatus: false,
};

const pageTransitionSlice = createSlice({
  name: "pageTransition",
  initialState,
  reducers: {
    setPageToReadMore: transitionToReadMoreReducer,
    setPageToLanding: transitionToLandingReducer,
    setPageToPlayers: transitionToPlayersReducer,
    resetTransition: resetTransitionReducer,
  },
});

export const {
  setPageToReadMore,
  setPageToLanding,
  setPageToPlayers,
  resetTransition,
} = pageTransitionSlice.actions;

export default pageTransitionSlice.reducer;
