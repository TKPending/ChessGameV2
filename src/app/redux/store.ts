import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { BoardType } from "@/app/types/BoardType";
import { ErrorType } from "@/app/types/ErrorType";
import boardReducer from "./slices/board/boardSlice";
import errorReducer from "./slices/error/errorSlice";
import gameHistoryReducer from "./slices/gameHistory/gameHistorySlice";
import { GameHistoryType } from "../types/GameHistoryType";

interface State {
  board: BoardType;
  gameHistory: GameHistoryType;
  error: ErrorType;
}

const rootReducer: Reducer<State> = combineReducers({
  board: boardReducer,
  gameHistory: gameHistoryReducer,
  error: errorReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
