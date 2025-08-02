import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import chessboardReducer from "./slices/chessboard/chessboardSlice";
import chessMovesReducer from "./slices/chessMoves/chessMovesSlice";
import playerSetupReducer from "./slices/playerSetup/playerSetupSlice";
import activeMovesReducer from "./slices/activeMoves/activeMovesSlice";
import gameStateReducer from "./slices/gameState/gameStateSlice";
import pageTransitionReducer from "./slices/pageTransition/pageTransitionSlice";

import {
  ActiveMovesType,
  BoardType,
  ChessMoveType,
  PlayerSetupType,
  GameStateType,
  PageTransitionType,
} from "@/app/types/ChessTypes";

interface State {
  chessboard: BoardType;
  gameState: GameStateType;
  chessMoves: ChessMoveType;
  activeMoves: ActiveMovesType;
  playerSetup: PlayerSetupType;
  pageTransition: PageTransitionType;
}

const rootReducer: Reducer<State> = combineReducers({
  chessboard: chessboardReducer,
  chessMoves: chessMovesReducer,
  gameState: gameStateReducer,
  activeMoves: activeMovesReducer,
  playerSetup: playerSetupReducer,
  pageTransition: pageTransitionReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
