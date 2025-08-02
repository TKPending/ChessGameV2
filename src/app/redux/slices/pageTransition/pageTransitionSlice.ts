import { PageTransitionType } from "@/app/types/ChessTypes";
import { createSlice } from "@reduxjs/toolkit";
import {
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
  },
});

export const { setPageToReadMore, setPageToLanding, setPageToPlayers } =
  pageTransitionSlice.actions;

export default pageTransitionSlice.reducer;
