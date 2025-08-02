import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import chessboardReducer from "./slices/chessboard/chessboardSlice";
import chessMovesReducer from "./slices/chessMoves/chessMovesSlice";
import playerSetupReducer from "./slices/playerSetup/playerSetupSlice";
import activeMovesReducer from "./slices/activeMoves/activeMovesSlice";
import gameStateReducer from "./slices/gameState/gameStateSlice";
import pageReducer from "./slices/page/pageSlice";

import {
  ActiveMovesType,
  BoardType,
  ChessMoveType,
  PlayerSetupType,
  GameStateType,
} from "@/app/types/ChessTypes";
import { PageState } from "@/app/types/PageTypes";

interface State {
  chessboard: BoardType;
  gameState: GameStateType;
  chessMoves: ChessMoveType;
  activeMoves: ActiveMovesType;
  playerSetup: PlayerSetupType;
  page: PageState;
}

const rootReducer: Reducer<State> = combineReducers({
  chessboard: chessboardReducer,
  chessMoves: chessMovesReducer,
  gameState: gameStateReducer,
  activeMoves: activeMovesReducer,
  playerSetup: playerSetupReducer,
  page: pageReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
