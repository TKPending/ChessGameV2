import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import chessboardReducer from "./slices/chessboardState/chessboardStateSlice";
import chessboardHistoryReducer from "./slices/history/historySlice";
import moveAnalysisReducer from "./slices/moveAnalysis/moveAnalysisSlice";
import gameStateReducer from "./slices/gameState/gameStateSlice";
import pageReducer from "./slices/page/pageSlice";
import uiChessboardReducer from "./slices/uiChessboard/uiChessboardSlice";
import {
  HistoryStateType,
  ChessboardStateType,
  GameStateType,
  MoveAnalysisStateType,
  PageStateType,
  uiChessboardType,
} from "@/app/types/StateTypes";

interface State {
  chessboardState: ChessboardStateType;
  gameState: GameStateType;
  historyState: HistoryStateType;
  moveAnalysisState: MoveAnalysisStateType;
  pageState: PageStateType;
  uiChessboardState: uiChessboardType;
}

const rootReducer: Reducer<State> = combineReducers({
  chessboardState: chessboardReducer,
  gameState: gameStateReducer,
  historyState: chessboardHistoryReducer,
  moveAnalysisState: moveAnalysisReducer,
  pageState: pageReducer,
  uiChessboardState: uiChessboardReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
